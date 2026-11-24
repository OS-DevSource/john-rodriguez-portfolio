import Image from "next/image";

const allowancePreview = {
  src: "/projects/allowance-product.png",
  alt: "Allowance expanded and compact macOS windows showing 97% weekly Codex capacity remaining, clearer usage details, reset times, and window controls.",
  width: 1448,
  height: 1086,
};

export function AllowanceVisual({ priority = false }) {
  return (
    <figure className="relative aspect-[4/3] w-full overflow-hidden product-frame">
      <Image
        src={allowancePreview.src}
        alt={allowancePreview.alt}
        width={allowancePreview.width}
        height={allowancePreview.height}
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="h-full w-full object-cover"
      />
    </figure>
  );
}
