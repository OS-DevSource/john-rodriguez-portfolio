import { heroContent, portfolioSite } from "@/lib/portfolio";
import {
  renderSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const size = socialImageSize;
export const contentType = socialImageContentType;
export const alt = `${portfolioSite.name} portfolio preview`;

export default function OpenGraphImage() {
  return renderSocialImage({
    eyebrow: "Portfolio",
    title: heroContent.headline,
    body: heroContent.summary,
    footer: "AI evaluation, software, and operations",
  });
}
