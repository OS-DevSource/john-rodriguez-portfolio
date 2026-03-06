import { getProjectBySlug, portfolioSite } from "@/lib/portfolio";
import {
  renderSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const size = socialImageSize;
export const contentType = socialImageContentType;

export default async function ProjectOpenGraphImage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return renderSocialImage({
    eyebrow: "Case study",
    title: project?.title || portfolioSite.name,
    body: project?.tagline || portfolioSite.description,
    accent: "#7dd3fc",
    footer: project?.status || "Proof-driven portfolio",
  });
}
