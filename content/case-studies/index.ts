import type { CaseStudy } from "../types";
import { subaru } from "./subaru";
import { buGiving } from "./bu-giving";

/**
 * Order matters — this is the reading order on the homepage.
 *  01 proves product design in a complex system
 *  02 proves consumer product thinking and AI trust design (Product Design Initiative)
 *
 * Earlier versions (incl. the Fidelity information-behavior case) are in /_archive/case-studies.
 */
export const caseStudies: CaseStudy[] = [subaru, buGiving];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAdjacent(slug: string) {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? caseStudies[i - 1] : caseStudies[caseStudies.length - 1],
    next: i < caseStudies.length - 1 ? caseStudies[i + 1] : caseStudies[0],
  };
}

export { subaru, buGiving };
