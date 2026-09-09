import { getProjectBySlug, portfolioSite } from "@/lib/portfolio";
import {
  renderSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const size = socialImageSize;
export const contentType = socialImageContentType;

export default async function ProjectTwitterImage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return renderSocialImage({
    eyebrow: "Project proof",
    title: project?.title || portfolioSite.name,
    body: project?.summary || portfolioSite.description,
    accent: "#fdba74",
    footer: "AI evaluation, software, and operations",
  });
}
