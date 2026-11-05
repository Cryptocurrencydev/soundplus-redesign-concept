import Link from "next/link";
import { CONCEPT_LABEL, DISCLAIMER, LINKS } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line/60">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 md:grid-cols-[1fr_1.4fr] md:px-10">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-[17px] leading-6 font-semibold text-amber">{CONCEPT_LABEL}</p>
          <nav aria-label="Footer" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium text-text-muted">
            <a href={LINKS.apk} className="hover:text-text">Android APK</a>
            <a href={LINKS.webPlayer} className="hover:text-text">Web player</a>
            <a href={LINKS.currentSite} target="_blank" rel="noopener" className="hover:text-text">Current site</a>
            <Link href="/system" className="hover:text-text">Design system</Link>
          </nav>
        </div>
        <div className="max-w-[68ch] text-[14px] leading-[22px] text-text-muted">
          <p>
            <strong className="font-semibold text-text">Disclaimer:</strong> {DISCLAIMER}
          </p>
          <p className="mt-4">The SoundPlus name belongs to GraphiKrafts. App screens here are design concepts with fictional tracks and artists.</p>
          <p className="mt-4 text-text">
            Demo by{" "}
            <a href={LINKS.dcTech} target="_blank" rel="noopener" className="font-semibold text-amber underline underline-offset-2 hover:no-underline">
              DC Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
