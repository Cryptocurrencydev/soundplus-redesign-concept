import { Icon } from "@/components/ui/Icon";
import { LINKS, SPEC } from "@/lib/site";
import { HeroPhone } from "./HeroPhone";

const bands = [
  { h: 58, t: "3.1s", dip: 0.9, d: "0ms" },
  { h: 92, t: "2.3s", dip: 0.86, d: "70ms" },
  { h: 44, t: "2.7s", dip: 0.9, d: "140ms" },
  { h: 78, t: "3.4s", dip: 0.88, d: "210ms" },
  { h: 52, t: "2.5s", dip: 0.92, d: "280ms" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1320px] gap-8 px-5 pt-12 md:px-10 lg:min-h-[calc(100svh-100px)] lg:grid-cols-[1.12fr_1fr] lg:gap-4 lg:pt-0">
        <div className="relative z-10 flex flex-col justify-center lg:py-16">
          <h1 className="display text-[clamp(3.6rem,min(15.5vw,12.2vh),7.75rem)] leading-[0.92]">Turn the screen off. The music keeps playing.</h1>
          <p className="mt-6 max-w-[34rem] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.5] text-text-muted">SoundPlus is a free music player for Android with no audio ads and no account to create.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a href={LINKS.apk} className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-amber px-7 text-[17px] whitespace-nowrap font-semibold text-on-amber transition-colors hover:bg-amber-press">
              <Icon name="android" size={22} />
              Download for Android
            </a>
            <a href={LINKS.webPlayer} className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-line px-7 text-[17px] whitespace-nowrap font-semibold transition-colors hover:border-text-muted hover:bg-ink-raised">
              <Icon name="globe" size={20} />
              Open web player
            </a>
          </div>
          <p className="mt-5 text-[14px] font-medium text-text-faint">
            Version {SPEC.version}, Android {SPEC.minAndroid}, {SPEC.size} APK
          </p>
        </div>

        <div className="relative flex min-h-[640px] items-end justify-center sm:min-h-[720px] lg:min-h-0 lg:items-center lg:pt-6">
          <div aria-hidden className="absolute inset-x-[-20px] bottom-0 flex h-full items-end gap-2.5 md:gap-3.5 lg:inset-x-0">
            {bands.map((b) => (
              <span key={b.d} className="band flex-1 rounded-t-[22px] bg-amber" style={{ height: `${b.h}%`, "--t": b.t, "--dip": b.dip, "--d": b.d } as React.CSSProperties} />
            ))}
          </div>
          <div className="relative pb-5 lg:pb-0">
            <HeroPhone />
          </div>
        </div>
      </div>
    </section>
  );
}
