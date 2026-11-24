"""Blender background export of the approved scene, without rendering any frames.
Usage: Blender -b -t 1 --python export-mesh.py -- printer.py public/projects/printer.mesh
"""
import math
from pathlib import Path
import struct
import sys
import bpy

source_name, output_name = sys.argv[sys.argv.index("--") + 1:]
source = Path(source_name).read_text().split("def light(")[0]
exec(compile(source, source_name, "exec"), {})
bpy.context.view_layer.update()
depsgraph = bpy.context.evaluated_depsgraph_get()
vertices, indices, lookup = bytearray(), [], {}
for obj in bpy.context.scene.objects:
    # The camera projection carries the fine printed lettering, vent slots,
    # barcode and knurling. Retain the bevels and curved paper in the geometry.
    if obj.type not in {"CURVE", "MESH"} or obj.name.split(".")[0] in {"Bench", "Knurl", "Ink rule", "Vent"}:
        continue
    evaluated = obj.evaluated_get(depsgraph)
    mesh = evaluated.to_mesh()
    mesh.calc_loop_triangles()
    normal_matrix = evaluated.matrix_world.to_3x3().inverted().transposed()
    for tri in mesh.loop_triangles:
        mat = mesh.materials[tri.material_index]
        rgb = [round(255 * max(0, min(1, c)) ** (1 / 2.2)) for c in mat.diffuse_color[:3]]
        is_key = obj.name in {"Check", "Review key"}
        for corner in tri.loops:
            pos = evaluated.matrix_world @ mesh.vertices[mesh.loops[corner].vertex_index].co
            norm = (normal_matrix @ mesh.corner_normals[corner].vector).normalized()
            packed = struct.pack("<3h3b3BBx", *(round(x*4096) for x in pos),
                                 *(round(x*127) for x in norm), *rgb, int(is_key))
            if packed not in lookup:
                lookup[packed] = len(lookup)
                vertices.extend(packed)
            indices.append(lookup[packed])
    evaluated.to_mesh_clear()
assert len(lookup) < 65536
header = struct.pack("<4sII", b"JRP1", len(lookup), len(indices))
Path(output_name).write_bytes(header + vertices + struct.pack(f"<{len(indices)}H", *indices))
print(f"Exported {len(lookup)} vertices and {len(indices)//3} triangles to {output_name}")
