import { Bars, TrackRow } from "@/components/ui/kit";
import { Icon } from "@/components/ui/Icon";
import { tracks, waveform } from "@/lib/tracks";

function Tile({ title, body, children, className = "", accent }: { title: string; body: string; children?: React.ReactNode; className?: string; accent?: boolean }) {
  return (
    <article className={`flex flex-col justify-between gap-8 overflow-hidden rounded-lg p-6 md:p-8 ${accent ? "bg-amber text-on-amber" : "bg-ink-raised"} ${className}`}>
      <div className="min-h-0 flex-1">{children}</div>
      <div>
        <h3 className="display text-[clamp(1.75rem,3vw,2.375rem)] leading-[1.02]">{title}</h3>
        <p className={`mt-2.5 max-w-[46ch] text-[16px] leading-[1.5] ${accent ? "text-on-amber" : "text-text-muted"}`}>{body}</p>
      </div>
    </article>
  );
}

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-32">
      <h2 className="display max-w-[14ch] text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.96]">Six things it does well.</h2>
      <div className="mt-12 grid gap-3.5 md:grid-cols-6">
        <Tile title="Screen-off playback" body="Lock your phone or switch apps. The music carries on, with controls on your lock screen." className="md:col-span-4">
          <div className="flex h-full min-h-40 items-center gap-4 rounded-md bg-black px-5 py-6">
            <div className="font-display text-[56px] leading-none font-bold text-text-muted [font-stretch:70%] tabular-nums">21:41</div>
            <div className="ml-auto flex items-center gap-3 text-amber">
              <span className="text-[14px] font-semibold text-text-muted">Monsoon Static</span>
              <Bars size={24} />
            </div>
          </div>
        </Tile>
        <Tile title="No audio ads" body="Nothing breaks in between songs or halfway through one. Play a whole album straight through." className="md:col-span-2">
          <div aria-hidden className="flex h-24 items-center gap-[3px]">
            {waveform.slice(0, 36).map((h, i) => (
              <span key={i} className="flex-1 rounded-full bg-amber" style={{ height: `${h * 100}%` }} />
            ))}
          </div>
        </Tile>
        <Tile title="5-band equalizer" body="Shape the sound from 60 Hz to 14 kHz, or start from a preset. Bass booster included." className="md:col-span-2" accent>
          <div aria-hidden className="flex h-28 items-end gap-2">
            {[70, 100, 40, 62, 84].map((h) => (
              <span key={h} className="flex-1 rounded-t-[10px] bg-on-amber" style={{ height: `${h}%` }} />
            ))}
          </div>
        </Tile>
        <Tile title="Offline downloads" body="Save tracks, albums and playlists to your phone, then play them with no connection." className="md:col-span-4">
          <div className="grid gap-x-6 sm:grid-cols-2">
            <TrackRow track={tracks[1]} saved trailing="more" />
            <TrackRow track={tracks[2]} saved trailing="more" />
          </div>
        </Tile>
        <Tile title="Playlist import" body="Paste a public Spotify or YouTube Music playlist link and your list comes across." className="md:col-span-3">
          <div className="flex items-center gap-2.5 rounded-full bg-ink-high py-2 pr-2 pl-4">
            <Icon name="link" size={20} className="flex-none text-amber" />
            <span className="min-w-0 flex-1 truncate text-[15px] font-medium text-text-muted">Paste a playlist link</span>
            <span className="rounded-full bg-amber px-4 py-2 text-[14px] font-semibold text-on-amber">Import</span>
          </div>
        </Tile>
        <Tile title="No account needed" body="No sign-up, no email, no phone number. Open the app and press play." className="md:col-span-3">
          <div className="flex items-center gap-2.5 py-2">
            <span className="text-[15px] font-semibold text-text-faint line-through">Create account</span>
            <span className="ml-auto grid size-12 place-items-center rounded-full bg-amber text-on-amber">
              <Icon name="play" size={24} />
            </span>
          </div>
        </Tile>
      </div>
    </section>
  );
}
