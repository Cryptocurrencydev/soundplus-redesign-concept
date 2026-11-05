import type { Metadata } from "next";
import { Cover } from "@/components/ui/Cover";
import { Icon } from "@/components/ui/Icon";
import { Chip, MiniPlayer, SliderTrack, Switch, TabBar, TrackRow, type RowState } from "@/components/ui/kit";
import { appType, colors, contrast, contrastPairs, radii, spacing } from "@/lib/tokens";
import { tracks } from "@/lib/tracks";

export const metadata: Metadata = { title: "Design system" };

const hex = (n: string) => colors.find((c) => c.name === n)!.hex;
const toc = ["Colour", "Type", "Spacing", "Radii", "Buttons", "Chips", "Track row", "Mini player", "Sliders", "Switch", "Tab bar"];
const slug = (s: string) => s.toLowerCase().replace(/ /g, "-");

function Sec({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section id={slug(title)} className="scroll-mt-20 border-t border-line/60 py-12">
      <h2 className="display text-[40px] leading-none">{title}</h2>
      {note && <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.5] text-text-muted">{note}</p>}
      <div className="mt-7">{children}</div>
    </section>
  );
}

function Frame({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <div className="mb-1.5 text-[13px] font-medium text-text-faint">{label}</div>
      <div className="canvas flex min-h-20 items-center justify-center rounded-md border border-line/70 p-4">{children}</div>
    </div>
  );
}

const btn = "inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold";
const rows: [string, RowState, boolean?][] = [
  ["Default", "default"],
  ["Default, saved offline", "default", true],
  ["Playing", "playing"],
  ["Paused", "paused"],
  ["Selected", "selected"],
];

export default function SystemPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-5 md:px-10">
      <header className="pt-14 pb-12">
        <h1 className="display max-w-[15ch] text-[clamp(3rem,8vw,6rem)] leading-[0.94]">SoundPlus design system</h1>
        <p className="mt-5 max-w-[60ch] text-[18px] leading-[1.5] text-text-muted">The foundations and core components behind the concept. Every phone screen on the landing page is built from what is on this page, so it can move into a Figma library as it stands.</p>
      </header>
      <div className="grid gap-10 lg:grid-cols-[180px_1fr]">
        <nav aria-label="Sections" className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 text-[14px] font-medium text-text-muted lg:sticky lg:top-24 lg:mx-0 lg:flex-col lg:gap-2.5 lg:self-start lg:px-0">
          {toc.map((t) => (
            <a key={t} href={`#${slug(t)}`} className="whitespace-nowrap hover:text-text">{t}</a>
          ))}
        </nav>
        <div className="min-w-0 pb-16">
          <Sec title="Colour" note="Indigo surfaces step up in lightness to show depth. Amber is the only accent: it means playing, active or selected, and nothing else. Album art is the only other colour on screen.">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              {colors.map((c) => (
                <div key={c.name}>
                  <div className="h-24 rounded-md ring-1 ring-line/70 ring-inset" style={{ background: `var(--color-${c.name})` }} />
                  <div className="mt-2 text-[15px] font-semibold">{c.name}</div>
                  <div className="text-[13px] text-text-muted tabular-nums">{c.hex}</div>
                  <div className="mt-0.5 text-[13px] leading-[18px] text-text-faint">{c.role}</div>
                </div>
              ))}
            </div>
            <h3 className="mt-10 text-[17px] font-semibold">Contrast, WCAG 2.2</h3>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
              {contrastPairs.map(([fg, bg]) => {
                const r = contrast(hex(fg), hex(bg));
                return (
                  <div key={fg + bg} className="flex items-center justify-between rounded-sm px-3.5 py-3" style={{ background: `var(--color-${bg})`, color: `var(--color-${fg})`, boxShadow: "inset 0 0 0 1px var(--color-line)" }}>
                    <span className="text-[13px] font-semibold">{fg} on {bg}</span>
                    <span className="text-[14px] font-bold tabular-nums">{r.toFixed(1)}</span>
                  </div>
                );
              })}
            </div>
          </Sec>

          <Sec title="Type" note="Anybody, condensed and heavy, carries titles: tall letters that stand like faders. Instrument Sans handles everything you read or tap. The app scale is below. The landing page uses Anybody at larger fluid sizes.">
            <div>
              {appType.map((t) => (
                <div key={t.name} className="grid items-baseline gap-x-6 gap-y-1 border-b border-line/60 py-4 sm:grid-cols-[110px_1fr_auto]">
                  <span className="text-[14px] font-semibold text-text-muted">{t.name}</span>
                  <span className={t.cls}>{t.sample}</span>
                  <span className="text-[13px] text-text-faint tabular-nums">{t.size}/{t.line}, {t.weight}, {t.font}</span>
                </div>
              ))}
            </div>
          </Sec>

          <Sec title="Spacing" note="A 4px base. Rows and controls snap to it, and sections open up to 96 on the web.">
            <div className="flex flex-wrap items-end gap-5">
              {spacing.map((s) => (
                <div key={s} className="text-center">
                  <div className="rounded-xs bg-amber" style={{ width: s, height: s }} />
                  <div className="mt-2 text-[13px] font-semibold text-text-muted tabular-nums">{s}</div>
                </div>
              ))}
            </div>
          </Sec>

          <Sec title="Radii" note="Radius follows size: small things stay tight, and anything you press or drag is fully round.">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
              {radii.map((r) => (
                <div key={r.name}>
                  <div className="h-24 border-2 border-amber bg-ink-raised" style={{ borderRadius: r.px }} />
                  <div className="mt-2 text-[15px] font-semibold">{r.name}, {r.px === 999 ? "full" : `${r.px}px`}</div>
                  <div className="text-[13px] leading-[18px] text-text-faint">{r.use}</div>
                </div>
              ))}
            </div>
          </Sec>

          <Sec title="Buttons" note="One primary per view. Play is always a circle, and it turns from amber to white when paused so state reads at a glance.">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Frame label="Primary, default"><span className={`${btn} bg-amber text-on-amber`}>Download</span></Frame>
              <Frame label="Primary, pressed"><span className={`${btn} bg-amber-press text-on-amber`}>Download</span></Frame>
              <Frame label="Primary, focus"><span className={`${btn} bg-amber text-on-amber outline-2 outline-offset-2 outline-amber`}>Download</span></Frame>
              <Frame label="Primary, disabled"><span className={`${btn} bg-amber text-on-amber opacity-40`}>Download</span></Frame>
              <Frame label="Secondary, default"><span className={`${btn} border border-line`}>Open web player</span></Frame>
              <Frame label="Secondary, hover"><span className={`${btn} border border-text-muted bg-ink-raised`}>Open web player</span></Frame>
              <Frame label="Play, while playing"><span className="grid size-[76px] place-items-center rounded-full bg-amber text-on-amber"><Icon name="pause" size={34} /></span></Frame>
              <Frame label="Play, while paused"><span className="grid size-[76px] place-items-center rounded-full bg-text text-ink"><Icon name="play" size={34} /></span></Frame>
            </div>
          </Sec>

          <Sec title="Chips" note="Filters and presets. Selected adds a tick, so it never relies on colour alone.">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Frame label="Default"><Chip>Lo-fi</Chip></Frame>
              <Frame label="Selected"><Chip selected>Lo-fi</Chip></Frame>
              <Frame label="With icon"><Chip icon="lyrics">Lyrics</Chip></Frame>
              <Frame label="Disabled"><Chip disabled>Lo-fi</Chip></Frame>
            </div>
          </Sec>

          <Sec title="Track row" note="64px tall. Playing swaps the art for live bars. Paused freezes to a pause glyph. Selected adds the check control used in the queue.">
            <div className="grid gap-3 lg:grid-cols-2">
              {rows.map(([l, s, saved]) => (
                <Frame key={l} label={l}><div className="w-full max-w-[344px]"><TrackRow track={tracks[1]} state={s} saved={saved} /></div></Frame>
              ))}
              <Frame label="Selectable, in queue"><div className="w-full max-w-[344px]"><TrackRow track={tracks[2]} state="selected" lead="check" trailing="drag" /></div></Frame>
            </div>
          </Sec>

          <Sec title="Mini player" note="Sits above the tab bar on every browsing screen.">
            <div className="grid gap-3 lg:grid-cols-2">
              <Frame label="Playing"><div className="w-full max-w-[344px]"><MiniPlayer track={tracks[0]} /></div></Frame>
              <Frame label="Paused"><div className="w-full max-w-[344px]"><MiniPlayer track={tracks[5]} playing={false} progress={62} /></div></Frame>
            </div>
          </Sec>

          <Sec title="Sliders" note="Horizontal for single values, vertical for the five equalizer bands. All of them work with touch and arrow keys.">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Frame label="Default"><div className="w-full max-w-[220px]"><SliderTrack value={30} /></div></Frame>
              <Frame label="Focus"><div className="w-full max-w-[220px]"><SliderTrack value={55} focus /></div></Frame>
              <Frame label="Disabled"><div className="w-full max-w-[220px]"><SliderTrack value={30} disabled /></div></Frame>
              <Frame label="Band, boost and cut">
                <div className="flex h-24 gap-7">
                  {[70, 28].map((v) => (
                    <span key={v} className="relative block w-9">
                      <span className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-ink-high" />
                      <span className="absolute left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-amber" style={v > 50 ? { bottom: "50%", height: `${v - 50}%` } : { top: "50%", height: `${50 - v}%` }} />
                      <span className="absolute left-1/2 h-[22px] w-9 -translate-x-1/2 translate-y-1/2 rounded-[8px] bg-text" style={{ bottom: `${v}%` }} />
                    </span>
                  ))}
                </div>
              </Frame>
            </div>
          </Sec>

          <Sec title="Switch">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Frame label="On"><Switch on /></Frame>
              <Frame label="Off"><Switch /></Frame>
              <Frame label="On, disabled"><Switch on disabled /></Frame>
              <Frame label="Off, disabled"><Switch disabled /></Frame>
            </div>
          </Sec>

          <Sec title="Tab bar" note="Three destinations. The active tab gets amber and a pill behind the icon.">
            <div className="grid gap-3 lg:grid-cols-3">
              {(["Home", "Search", "Library"] as const).map((t) => (
                <Frame key={t} label={`${t} active`}><div className="w-full max-w-[344px] rounded-md bg-ink"><TabBar active={t} /></div></Frame>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {(["sun", "rings", "tide", "stripes", "grid", "arc"] as const).map((k) => (
                <Cover key={k} kind={k} size={72} radius={10} />
              ))}
            </div>
            <p className="mt-3 text-[14px] text-text-muted">Placeholder album art, generated in SVG.</p>
          </Sec>
        </div>
      </div>
    </div>
  );
}
