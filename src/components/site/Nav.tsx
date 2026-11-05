import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { LINKS } from "@/lib/site";
import { Logo } from "./Logo";

const items = [
  ["Features", "/#features"],
  ["App screens", "/#app"],
  ["Install", "/#install"],
  ["FAQ", "/#faq"],
  ["Design system", "/system"],
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-5 md:px-10">
        <Link href="/" aria-label="SoundPlus concept home" className="rounded-sm">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] font-medium text-text-muted lg:flex">
          {items.map(([label, href]) => (
            <Link key={href} href={href} className="transition-colors hover:text-text">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/system" className="text-[15px] font-medium text-text-muted hover:text-text lg:hidden">
            Design system
          </Link>
          <a href={LINKS.apk} className="hidden h-10 items-center gap-2 rounded-full bg-amber px-4 text-[15px] font-semibold text-on-amber transition-colors hover:bg-amber-press sm:inline-flex">
            <Icon name="download" size={18} />
            Download
          </a>
        </div>
      </div>
    </header>
  );
}
