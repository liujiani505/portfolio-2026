import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getAdjacent, getCaseStudy } from "@/content/case-studies";
import { site } from "@/content/site";
import { CaseStudyArticle } from "@/components/case-study/case-study-article";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — ${cs.subtitle}`,
    description: cs.summary,
    openGraph: {
      title: `${cs.title} — ${cs.subtitle}`,
      description: cs.thesis,
      type: "article",
      url: `${site.url}/case-studies/${cs.slug}`,
    },
    alternates: { canonical: `${site.url}/case-studies/${cs.slug}` },
  };
}

export default function CaseStudyPage({ params }: Props) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();
  const { next } = getAdjacent(cs.slug);

  const position = caseStudies.findIndex((c) => c.slug === cs.slug) + 1;
  return <CaseStudyArticle cs={cs} next={next} position={position} />;
}
