import type { Track } from "@/lib/tracks";
import { Cover } from "./Cover";
import { Icon, type IconName } from "./Icon";

/* Core app components. Each takes its state as a prop so /system and the
   phone screens render exactly the same thing. */

export function Bars({ paused, size = 16, className = "" }: { paused?: boolean; size?: number; className?: string }) {
  return (
    <span aria-hidden className={`inline-flex items-end gap-[2px] ${paused ? "eq-paused" : ""} ${className}`} style={{ height: size }}>
      {[0.9, 0.55, 1, 0.7].map((h, i) => (
        <span key={i} className="eq-bar w-[3px] rounded-full bg-current" style={{ height: `${h * 100}%`, animationDelay: `${i * -210}ms` }} />
      ))}
    </span>
  );
}

export type RowState = "default" | "playing" | "paused" | "selected";

export function TrackRow({ track, state = "default", saved, trailing = "time", lead }: { track: Track; state?: RowState; saved?: boolean; trailing?: "time" | "more" | "drag"; lead?: "check" }) {
  const active = state === "playing" || state === "paused";
  return (
    <div className={`flex h-16 items-center gap-3 rounded-md px-2 ${state === "selected" || active ? "bg-ink-high" : ""}`}>
      {lead === "check" && (
        <span className={`grid size-[22px] flex-none place-items-center rounded-full border-2 ${state === "selected" ? "border-amber bg-amber text-on-amber" : "border-line"}`}>
          {state === "selected" && <Icon name="check" size={14} />}
        </span>
      )}
      <span className="relative flex-none">
        <Cover kind={track.cover} size={48} radius={10} />
        {active && (
          <span className="absolute inset-0 grid place-items-center rounded-sm bg-ink/60 text-amber">
            {state === "playing" ? <Bars size={18} /> : <Icon name="pause" size={20} />}
          </span>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block truncate text-[15px] leading-5 font-medium ${active ? "text-amber" : "text-text"}`}>{track.title}</span>
        <span className="flex items-center gap-1 truncate text-[13px] leading-[18px] font-medium text-text-muted">
          {saved && (
            <span title="Saved offline" className="text-amber">
              <Icon name="download" size={14} />
            </span>
          )}
          {track.artist}
        </span>
      </span>
      {trailing === "time" && <span className="text-[13px] font-medium text-text-faint tabular-nums">{track.time}</span>}
      {trailing === "more" && <Icon name="more" size={22} className="text-text-muted" />}
      {trailing === "drag" && <Icon name="drag" size={22} className="text-text-faint" />}
    </div>
  );
}

export function MiniPlayer({ track, playing = true, progress = 38 }: { track: Track; playing?: boolean; progress?: number }) {
  return (
    <div className="relative overflow-hidden rounded-md bg-ink-high">
      <div className="flex h-16 items-center gap-3 px-2.5">
        <Cover kind={track.cover} size={44} radius={10} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] leading-5 font-medium">{track.title}</div>
          <div className="flex items-center gap-1.5 truncate text-[13px] leading-[18px] font-medium text-text-muted">{playing ? "Playing" : "Paused"}, {track.artist}</div>
        </div>
        <Icon name="heart" size={22} className="text-text-muted" />
        <span className={`grid size-10 place-items-center rounded-full ${playing ? "bg-amber text-on-amber" : "bg-text text-ink"}`}>
          <Icon name={playing ? "pause" : "play"} size={20} />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-line">
        <div className={`h-full ${playing ? "bg-amber" : "bg-text-muted"}`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export function Chip({ children, selected, disabled, icon }: { children: React.ReactNode; selected?: boolean; disabled?: boolean; icon?: IconName }) {
  return (
    <span className={`inline-flex h-9 flex-none items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold whitespace-nowrap ${selected ? "bg-amber text-on-amber" : "bg-ink-high text-text"} ${disabled ? "opacity-40" : ""}`}>
      {selected && <Icon name="check" size={15} />}
      {icon && !selected && <Icon name={icon} size={15} />}
      {children}
    </span>
  );
}

export function Switch({ on, disabled }: { on?: boolean; disabled?: boolean }) {
  return (
    <span className={`relative inline-block h-[30px] w-[50px] flex-none rounded-full transition-colors ${on ? "bg-amber" : "bg-ink-high ring-1 ring-line ring-inset"} ${disabled ? "opacity-40" : ""}`}>
      <span className={`absolute top-[3px] left-[3px] size-6 rounded-full transition-transform ${on ? "translate-x-5 bg-on-amber" : "bg-text-muted"}`} />
    </span>
  );
}

export function SliderTrack({ value, disabled, focus }: { value: number; disabled?: boolean; focus?: boolean }) {
  return (
    <span className={`relative block h-6 w-full ${disabled ? "opacity-40" : ""}`}>
      <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-ink-high" />
      <span className="absolute top-1/2 left-0 h-1.5 -translate-y-1/2 rounded-full bg-amber" style={{ width: `${value}%` }} />
      <span className={`absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text ${focus ? "outline-2 outline-offset-2 outline-amber" : ""}`} style={{ left: `${value}%` }} />
    </span>
  );
}

export type Tab = "Home" | "Search" | "Library";
const tabs: { name: Tab; icon: IconName }[] = [
  { name: "Home", icon: "home" },
  { name: "Search", icon: "search" },
  { name: "Library", icon: "library" },
];

export function TabBar({ active }: { active: Tab }) {
  return (
    <div className="flex h-[68px] items-start justify-around px-6 pt-2.5">
      {tabs.map((t) => (
        <span key={t.name} className={`flex w-20 flex-col items-center gap-1 text-[11px] leading-[14px] font-semibold ${t.name === active ? "text-amber" : "text-text-faint"}`}>
          <span className={`grid h-7 w-14 place-items-center rounded-full ${t.name === active ? "bg-ink-high" : ""}`}>
            <Icon name={t.icon} size={22} />
          </span>
          {t.name}
        </span>
      ))}
    </div>
  );
}

export function StatusBar({ time = "21:41", dim }: { time?: string; dim?: boolean }) {
  return (
    <div className={`flex h-10 items-center justify-between px-7 pt-1 text-[13px] font-semibold tabular-nums ${dim ? "text-text-muted" : "text-text"}`}>
      <span>{time}</span>
      <span className="absolute top-3 left-1/2 size-[18px] -translate-x-1/2 rounded-full bg-black" />
      <span className="flex items-center gap-1.5">
        <span className="flex items-end gap-px">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-[1px] bg-current" style={{ height: h }} />
          ))}
        </span>
        <span className="h-[11px] w-[22px] rounded-[3px] border border-current p-px">
          <span className="block h-full w-3/4 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}

export function SectionHead({ children, action }: { children: React.ReactNode; action?: string }) {
  return (
    <div className="flex items-baseline justify-between px-4 pt-5 pb-2.5">
      <h4 className="font-display text-[22px] leading-7 font-bold [font-stretch:75%]">{children}</h4>
      {action && <span className="text-[13px] font-semibold text-text-muted">{action}</span>}
    </div>
  );
}
