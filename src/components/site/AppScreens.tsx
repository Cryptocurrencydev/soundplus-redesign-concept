import Link from "next/link";
import { EqualizerScreen } from "@/components/phone/Equalizer";
import { NowPlayingScreen } from "@/components/phone/NowPlaying";
import { Phone } from "@/components/phone/Phone";
import { HomeScreen, LibraryScreen, QueueScreen, SearchScreen } from "@/components/phone/screens";

const support = [
  { name: "Home", note: "Playing track marked in the list and the mini player.", el: <HomeScreen /> },
  { name: "Queue", note: "Paused track on top, two rows selected for a bulk action.", el: <QueueScreen /> },
  { name: "Library", note: "Downloads filter on, playback paused, import one tap away.", el: <LibraryScreen /> },
  { name: "Search", note: "Focused field, a top result, and saved tracks flagged.", el: <SearchScreen /> },
];

export function AppScreens() {
  return (
    <section id="app" className="bg-ink-raised/50 py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="display max-w-[16ch] text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.96]">The app, redrawn from the same system.</h2>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.5] text-text-muted">Six concept screens built in HTML and CSS, with fictional tracks. Same colours, type, spacing and components on all of them.</p>
          </div>
          <Link href="/system" className="inline-flex h-12 items-center rounded-full border border-line px-6 text-[15px] font-semibold transition-colors hover:border-text-muted hover:bg-ink-raised">
            Open the design system
          </Link>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-6">
          <figure className="flex flex-col items-center gap-6 xl:flex-row xl:items-center xl:justify-center xl:gap-8">
            <Phone className="[--s:.82] sm:[--s:.92]" label="Now playing screen, interactive">
              <NowPlayingScreen />
            </Phone>
            <figcaption className="max-w-[20ch] text-center xl:text-left">
              <h3 className="display text-[34px] leading-none">Now playing</h3>
              <p className="mt-3 text-[15px] leading-[1.5] text-text-muted">Try it: press pause, drag the waveform to seek.</p>
            </figcaption>
          </figure>
          <figure className="flex flex-col items-center gap-6 xl:flex-row-reverse xl:items-center xl:justify-center xl:gap-8">
            <Phone className="[--s:.82] sm:[--s:.92]" label="Equalizer screen, interactive">
              <EqualizerScreen />
            </Phone>
            <figcaption className="max-w-[20ch] text-center xl:text-right">
              <h3 className="display text-[34px] leading-none">Equalizer</h3>
              <p className="mt-3 text-[15px] leading-[1.5] text-text-muted">Try it: drag a band or pick a preset. The curve follows.</p>
            </figcaption>
          </figure>
        </div>
      </div>

      <div tabIndex={0} role="region" aria-label="Four more app screens, scrollable" className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:px-10 xl:justify-center">
        {support.map((s) => (
          <figure key={s.name} className="flex-none snap-center">
            <Phone className="[--s:.72] xl:[--s:.73]">
              <div inert className="h-full">{s.el}</div>
            </Phone>
            <figcaption className="mt-4 max-w-[276px]">
              <h3 className="text-[17px] leading-6 font-semibold">{s.name}</h3>
              <p className="mt-0.5 text-[14px] leading-5 text-text-muted">{s.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
