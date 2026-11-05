import { CONCEPT_LABEL, LINKS } from "@/lib/site";

export function ConceptBanner() {
  return (
    <div className="bg-amber text-on-amber">
      <p className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-center gap-x-3 px-4 py-2 text-center text-[13px] leading-[18px] font-semibold">
        {CONCEPT_LABEL}
        <a href={LINKS.currentSite} target="_blank" rel="noopener" className="underline underline-offset-2 hover:no-underline focus-visible:outline-on-amber">
          See the current site
        </a>
      </p>
    </div>
  );
}
