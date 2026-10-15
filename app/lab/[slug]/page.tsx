import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { experiments, getExperiment } from "@/content/lab";
import { site } from "@/content/site";
import { LabArticle } from "@/components/case-study/case-study-article";

type Props = { params: { slug: string } };

/** Only live experiments with a write-up get a page. */
export function generateStaticParams() {
  return experiments.filter((e) => e.status === "live" && e.caseStudy).map((e) => ({ slug: e.slug }));
}
export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
  const e = getExperiment(params.slug);
  if (!e) return {};
  return {
    title: `${e.title} — AI Lab`,
    description: e.question,
    alternates: { canonical: `${site.url}/lab/${e.slug}` },
  };
}

export default function ExperimentPage({ params }: Props) {
  const e = getExperiment(params.slug);
  if (!e || e.status !== "live" || !e.caseStudy) notFound();
  const live = experiments.filter((x) => x.status === "live" && x.caseStudy);
  const i = live.findIndex((x) => x.slug === e.slug);
  const n = live.length > 1 ? live[(i + 1) % live.length] : undefined;
  return (
    <LabArticle
      cs={e.caseStudy}
      label={`AI Lab · Side experiment ${e.index}`}
      tile={e.thumb?.stage}
      next={n ? { href: `/lab/${n.slug}`, title: n.title } : undefined}
    />
  );
}
