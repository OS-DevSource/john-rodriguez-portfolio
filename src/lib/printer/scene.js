// Orthographic camera and key position from the original Blender scene.
const REST_AZIMUTH = 0.5144513;
const REST_ELEVATION = 0.6644223;
const TARGET = [-0.42, -0.03, 0.58];
const KEY = [1.47, -0.4, 1.407];
const STRIDE = 14;
const LIGHTING_ANGLE = Math.PI / 5;
const DEPTH_WIDTH = 640;
const DEPTH_HEIGHT = Math.round((DEPTH_WIDTH * 5) / 7);

function camera(yaw, pitch) {
  const a = REST_AZIMUTH + yaw;
  const e = REST_ELEVATION + pitch;
  const right = [Math.cos(a), Math.sin(a), 0];
  const up = [
    -Math.sin(a) * Math.sin(e),
    Math.cos(a) * Math.sin(e),
    Math.cos(e),
  ];
  const back = [
    Math.sin(a) * Math.cos(e),
    -Math.cos(a) * Math.cos(e),
    Math.sin(e),
  ];
  const axes = [right, up, back];
  const scale = [2 / 7.08, 2 / ((7.08 * 5) / 7), -1 / 8];
  const m = new Float32Array(16);
  axes.forEach((axis, row) => {
    for (let col = 0; col < 3; col++) {
      m[col * 4 + row] = axis[col] * scale[row];
      m[12 + row] -= axis[col] * scale[row] * TARGET[col];
    }
  });
  m[15] = 1;
  return m;
}

const vertexSource = `#version 300 es
layout(location=0) in vec3 position;
layout(location=1) in vec3 normal;
layout(location=2) in vec3 material;
layout(location=3) in float key;
uniform mat4 camera, rest, leftCamera, rightCamera;
uniform float travel;
out vec3 reference, leftRef, rightRef, surface, paint;
void main() {
  vec3 p = position / 4096.0;
  reference = (rest * vec4(p, 1)).xyz * 0.5 + 0.5;
  leftRef = (leftCamera * vec4(p, 1)).xyz * 0.5 + 0.5;
  rightRef = (rightCamera * vec4(p, 1)).xyz * 0.5 + 0.5;
  p.z -= key * travel;
  gl_Position = camera * vec4(p, 1);
  surface = normal;
  paint = material;
}`;

const fragmentSource = `#version 300 es
precision highp float;
uniform sampler2D artwork, depthMap, turnArtwork;
uniform bool hasTurnArtwork;
uniform mat4 rest, leftCamera, rightCamera;
in vec3 reference, leftRef, rightRef, surface, paint;
out vec4 color;

float confidence(vec3 ref, float view, mat4 projection, vec3 n, float alpha) {
  vec2 uv = clamp(ref.xy, vec2(0.0009), vec2(0.9991));
  float stored = texture(depthMap, vec2((view + uv.x) / 3.0, uv.y)).r;
  vec3 eye = -normalize(vec3(projection[0].z, projection[1].z, projection[2].z));
  float facing = smoothstep(0.045, 0.24, abs(dot(eye, n)));
  return facing * (1.0 - smoothstep(0.0012, 0.0035, ref.z - stored)) * smoothstep(0.64, 0.97, alpha);
}

void main() {
  vec3 n = normalize(surface);
  float diffuse = max(dot(n, normalize(vec3(-0.4,-0.45,0.82))), 0.0);
  vec3 exposed = paint * (0.48 + 0.40 * diffuse);
  vec4 ink = texture(artwork, reference.xy);
  float front = confidence(reference, 0.0, rest, n, ink.a);
  if (hasTurnArtwork && front < 0.999) {
    vec4 l = texture(turnArtwork, vec2(leftRef.x * 0.5, leftRef.y));
    vec4 r = texture(turnArtwork, vec2(0.5 + rightRef.x * 0.5, rightRef.y));
    float wl = confidence(leftRef, 1.0, leftCamera, n, l.a);
    float wr = confidence(rightRef, 2.0, rightCamera, n, r.a);
    vec3 lit = (l.rgb * wl + r.rgb * wr) / max(wl + wr, 0.001);
    exposed = mix(exposed, lit, max(wl, wr));
  }
  color = vec4(mix(exposed, ink.rgb, front), 1.0);
}`;

function makeProgram(gl, fragment) {
  const program = gl.createProgram();
  try {
    for (const [type, source] of [
      [gl.VERTEX_SHADER, vertexSource],
      [gl.FRAGMENT_SHADER, fragment],
    ]) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      gl.attachShader(program, shader);
      gl.deleteShader(shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error(gl.getProgramInfoLog(program));
    return program;
  } catch (error) {
    gl.deleteProgram(program);
    throw error;
  }
}

function loadImage(url) {
  const image = new Image();
  image.src = url;
  return image.decode().then(() => image);
}

export async function createPrinter(canvas, poster, signal) {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  if (!gl) throw new Error("WebGL unavailable");
  const dispose = [];
  const cleanup = () => {
    while (dispose.length) dispose.pop()();
  };
  signal.addEventListener("abort", cleanup, { once: true });

  try {
    const response = await fetch("/projects/printer.mesh.gz", { signal });
    if (!response.ok) throw new Error("Printer geometry unavailable");
    const [bytes] = await Promise.all([
      new Response(
        response.body.pipeThrough(new DecompressionStream("gzip")),
      ).arrayBuffer(),
      poster.decode(),
    ]);
    signal.throwIfAborted();
    const header = new DataView(bytes);
    const vertexBytes = header.getUint32(4, true) * STRIDE;
    const count = header.getUint32(8, true);
    if (
      header.getUint32(0) !== 0x4a525031 ||
      bytes.byteLength !== 12 + vertexBytes + 2 * count
    ) {
      throw new Error("Invalid printer geometry");
    }
    const mesh = (target, data) => {
      const buffer = gl.createBuffer();
      gl.bindBuffer(target, buffer);
      gl.bufferData(target, data, gl.STATIC_DRAW);
      dispose.push(() => gl.deleteBuffer(buffer));
    };
    mesh(gl.ARRAY_BUFFER, new Uint8Array(bytes, 12, vertexBytes));
    mesh(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(bytes, 12 + vertexBytes, count),
    );
    [
      [3, gl.SHORT, false, 0],
      [3, gl.BYTE, true, 6],
      [3, gl.UNSIGNED_BYTE, true, 9],
      [1, gl.UNSIGNED_BYTE, false, 12],
    ].forEach(([size, type, normalized, offset], i) => {
      gl.enableVertexAttribArray(i);
      gl.vertexAttribPointer(i, size, type, normalized, STRIDE, offset);
    });

    const program = makeProgram(gl, fragmentSource);
    dispose.push(() => gl.deleteProgram(program));
    const rest = camera(0, 0);
    const left = camera(-LIGHTING_ANGLE, 0);
    const right = camera(LIGHTING_ANGLE, 0);
    const uniforms = Object.fromEntries(
      [
        "camera",
        "rest",
        "leftCamera",
        "rightCamera",
        "travel",
        "artwork",
        "depthMap",
        "turnArtwork",
        "hasTurnArtwork",
      ].map((key) => [key, gl.getUniformLocation(program, key)]),
    );
    const texture = (filter) => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      for (const p of [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER])
        gl.texParameteri(gl.TEXTURE_2D, p, filter);
      for (const p of [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T])
        gl.texParameteri(gl.TEXTURE_2D, p, gl.CLAMP_TO_EDGE);
      dispose.push(() => gl.deleteTexture(tex));
      return tex;
    };
    const paint = (image, unit = gl.TEXTURE0) => {
      gl.activeTexture(unit);
      const tex = texture(gl.LINEAR);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image,
      );
      return tex;
    };
    const job = paint(poster);
    // Preserve the photographed enamel and print only on surfaces visible to the
    // original camera. Newly revealed edges use the mesh's own material colors.
    gl.activeTexture(gl.TEXTURE1);
    texture(gl.NEAREST);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.DEPTH_COMPONENT16,
      DEPTH_WIDTH * 3,
      DEPTH_HEIGHT,
      0,
      gl.DEPTH_COMPONENT,
      gl.UNSIGNED_SHORT,
      null,
    );
    const depth = gl.getParameter(gl.TEXTURE_BINDING_2D);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.DEPTH_ATTACHMENT,
      gl.TEXTURE_2D,
      depth,
      0,
    );
    gl.drawBuffers([gl.NONE]);
    gl.readBuffer(gl.NONE);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE)
      throw new Error("Depth target unavailable");
    const depthProgram = makeProgram(
      gl,
      "#version 300 es\nprecision mediump float; void main() {}",
    );
    gl.useProgram(depthProgram);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    const depthCamera = gl.getUniformLocation(depthProgram, "camera");
    [rest, left, right].forEach((view, index) => {
      gl.viewport(index * DEPTH_WIDTH, 0, DEPTH_WIDTH, DEPTH_HEIGHT);
      gl.uniformMatrix4fv(depthCamera, false, view);
      gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
    });
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteFramebuffer(fbo);
    gl.deleteProgram(depthProgram);

    gl.useProgram(program);
    gl.uniformMatrix4fv(uniforms.rest, false, rest);
    gl.uniformMatrix4fv(uniforms.leftCamera, false, left);
    gl.uniformMatrix4fv(uniforms.rightCamera, false, right);
    gl.uniform1i(uniforms.artwork, 0);
    gl.uniform1i(uniforms.turnArtwork, 2);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, job);
    gl.uniform1i(uniforms.depthMap, 1);
    let invoice, invoicePromise, lightingPromise;
    return {
      prepareLighting() {
        lightingPromise ??= loadImage("/projects/printer-sides.webp").then(
          (image) => {
            signal.throwIfAborted();
            paint(image, gl.TEXTURE2);
            gl.uniform1i(uniforms.hasTurnArtwork, 1);
          },
        );
        return lightingPromise;
      },
      prepareInvoice() {
        invoicePromise ??= loadImage("/projects/reviewed-invoice.webp").then(
          (image) => {
            signal.throwIfAborted();
            invoice = paint(image);
          },
        );
        return invoicePromise;
      },
      draw(yaw, pitch, reviewed, travel) {
        const rect = canvas.getBoundingClientRect();
        const ratio = Math.min(
          devicePixelRatio || 1,
          1.5,
          1008 / Math.max(1, rect.width),
        );
        const width = Math.max(1, Math.round(rect.width * ratio));
        const height = Math.max(1, Math.round(rect.height * ratio));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
        gl.viewport(0, 0, width, height);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, reviewed && invoice ? invoice : job);
        const m = camera(yaw, pitch);
        gl.uniformMatrix4fv(uniforms.camera, false, m);
        gl.uniform1f(uniforms.travel, travel);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
        const project = (row) =>
          m[row] * KEY[0] +
          m[row + 4] * KEY[1] +
          m[row + 8] * (KEY[2] - travel) +
          m[row + 12];
        return [(1 + project(0)) * 50, (1 - project(1)) * 50];
      },
    };
  } catch (error) {
    cleanup();
    throw error;
  }
}
