import { notFound } from "next/navigation";

import { ProjectCaseStudyPage } from "@/components/project-case-study-page";
import { getProjectBySlug, getSiteUrl, portfolioProjects, portfolioSite } from "@/lib/portfolio";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const title = `${project.title} Case Study`;
  const description = project.seoDescription || project.summary;
  const canonicalUrl = getSiteUrl(project.primaryCta.href);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: `${project.title} | ${portfolioSite.name}`,
      description,
      images: [
        {
          url: getSiteUrl(`/projects/${project.slug}/opengraph-image`),
          width: 1200,
          height: 630,
          alt: `${project.title} case study preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${portfolioSite.name}`,
      description,
      images: [getSiteUrl(`/projects/${project.slug}/twitter-image`)],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudyPage project={project} />;
}
