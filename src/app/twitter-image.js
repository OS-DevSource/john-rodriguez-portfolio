import { heroContent, portfolioSite } from "@/lib/portfolio";
import {
  renderSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const size = socialImageSize;
export const contentType = socialImageContentType;
export const alt = `${portfolioSite.name} portfolio social preview`;

export default function TwitterImage() {
  return renderSocialImage({
    eyebrow: "Operator-builder",
    title: heroContent.headline,
    body: heroContent.signal,
    accent: "#fdba74",
    footer: "Proof-driven portfolio",
  });
}
