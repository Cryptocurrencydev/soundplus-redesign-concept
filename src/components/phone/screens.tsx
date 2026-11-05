import { Chip, MiniPlayer, SectionHead, StatusBar, TabBar, TrackRow } from "@/components/ui/kit";
import { Cover } from "@/components/ui/Cover";
import { Icon } from "@/components/ui/Icon";
import { tracks as t } from "@/lib/tracks";

function Docked({ tab, playing = true, track = t[0] }: { tab: "Home" | "Search" | "Library"; playing?: boolean; track?: (typeof t)[number] }) {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-ink pb-2">
      <div className="px-2 pt-1.5">
        <MiniPlayer track={track} playing={playing} />
      </div>
      <TabBar active={tab} />
    </div>
  );
}

export function HomeScreen() {
  return (
    <div className="h-full">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-2">
        <h3 className="font-display text-[30px] leading-[34px] font-extrabold [font-stretch:75%]">Good evening</h3>
        <span className="grid size-10 place-items-center rounded-full bg-ink-high">
          <Icon name="sliders" size={20} />
        </span>
      </div>
      <div className="no-scrollbar flex gap-2 overflow-hidden px-4 pt-4">
        <Chip selected>For you</Chip>
        <Chip>Bollywood</Chip>
        <Chip>Lo-fi</Chip>
        <Chip>Punjabi</Chip>
      </div>
      <SectionHead action="See all">Made for tonight</SectionHead>
      <div className="flex gap-3 overflow-hidden pl-4">
        {[
          { c: "tide", n: "Slow start", s: "28 tracks" },
          { c: "stripes", n: "Late desk", s: "41 tracks" },
          { c: "arc", n: "Night drive", s: "33 tracks" },
        ].map((p) => (
          <div key={p.n} className="w-[136px] flex-none">
            <Cover kind={p.c as "tide"} size={136} radius={16} />
            <div className="mt-2 text-[15px] leading-5 font-medium">{p.n}</div>
            <div className="text-[13px] leading-[18px] font-medium text-text-muted">{p.s}</div>
          </div>
        ))}
      </div>
      <SectionHead>Jump back in</SectionHead>
      <div className="px-2">
        <TrackRow track={t[0]} state="playing" />
        <TrackRow track={t[1]} saved />
      </div>
      <Docked tab="Home" />
    </div>
  );
}

export function QueueScreen() {
  return (
    <div className="h-full">
      <StatusBar />
      <div className="flex items-center gap-3 px-3 pt-1.5">
        <span className="grid size-10 place-items-center rounded-full">
          <Icon name="close" size={22} />
        </span>
        <h3 className="flex-1 text-[17px] leading-6 font-semibold">2 selected</h3>
        <span className="grid size-10 place-items-center rounded-full bg-ink-high">
          <Icon name="download" size={20} />
        </span>
        <span className="grid size-10 place-items-center rounded-full bg-ink-high">
          <Icon name="more" size={20} />
        </span>
      </div>
      <div className="px-4 pt-4 text-[13px] leading-[18px] font-semibold text-text-muted">Now playing</div>
      <div className="px-2 pt-1.5">
        <TrackRow track={t[0]} state="paused" trailing="time" />
      </div>
      <div className="flex items-baseline justify-between px-4 pt-5 pb-1.5">
        <h4 className="font-display text-[22px] leading-7 font-bold [font-stretch:75%]">Up next</h4>
        <span className="text-[13px] font-medium text-text-faint">6 tracks, 23 min</span>
      </div>
      <div className="px-2">
        <TrackRow track={t[1]} lead="check" state="selected" trailing="drag" />
        <TrackRow track={t[2]} lead="check" trailing="drag" />
        <TrackRow track={t[3]} lead="check" state="selected" trailing="drag" />
        <TrackRow track={t[4]} lead="check" trailing="drag" />
        <TrackRow track={t[5]} lead="check" trailing="drag" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex gap-2 bg-ink px-4 pt-3 pb-7">
        <Chip selected icon="shuffle">Radio on</Chip>
        <Chip icon="repeat">Repeat one</Chip>
        <Chip icon="plus">Add</Chip>
      </div>
    </div>
  );
}

export function LibraryScreen() {
  return (
    <div className="h-full">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-2">
        <h3 className="font-display text-[30px] leading-[34px] font-extrabold [font-stretch:75%]">Your library</h3>
        <span className="grid size-10 place-items-center rounded-full bg-ink-high">
          <Icon name="plus" size={20} />
        </span>
      </div>
      <div className="flex gap-2 overflow-hidden px-4 pt-4">
        <Chip>Playlists</Chip>
        <Chip selected>Downloads</Chip>
        <Chip>Liked</Chip>
        <Chip>Albums</Chip>
      </div>
      <div className="mx-4 mt-4 flex items-center gap-3 rounded-md border border-dashed border-line px-3 py-3">
        <span className="grid size-10 flex-none place-items-center rounded-full bg-ink-high text-amber">
          <Icon name="link" size={20} />
        </span>
        <span className="min-w-0">
          <span className="block text-[15px] leading-5 font-medium">Import a playlist</span>
          <span className="block text-[13px] leading-[18px] font-medium text-text-muted">Paste a public playlist link</span>
        </span>
      </div>
      <div className="flex items-baseline justify-between px-4 pt-5 pb-1.5">
        <span className="text-[13px] font-semibold text-text-muted">18 saved on this phone</span>
        <span className="text-[13px] font-medium text-text-faint">312 MB</span>
      </div>
      <div className="px-2">
        <TrackRow track={t[1]} saved trailing="more" />
        <TrackRow track={t[2]} saved trailing="more" />
        <TrackRow track={t[3]} saved trailing="more" />
        <TrackRow track={t[5]} saved state="paused" trailing="more" />
      </div>
      <Docked tab="Library" playing={false} track={t[5]} />
    </div>
  );
}

export function SearchScreen() {
  return (
    <div className="h-full">
      <StatusBar />
      <div className="px-4 pt-2">
        <div className="flex h-12 items-center gap-2.5 rounded-full bg-ink-high px-4 ring-2 ring-amber">
          <Icon name="search" size={20} className="text-amber" />
          <span className="flex-1 text-[15px] font-medium">
            mira s<span className="ml-px inline-block h-[18px] w-[2px] translate-y-[3px] bg-amber" />
          </span>
          <Icon name="close" size={20} className="text-text-muted" />
        </div>
      </div>
      <div className="flex gap-2 overflow-hidden px-4 pt-3">
        <Chip selected>All</Chip>
        <Chip>Tracks</Chip>
        <Chip>Artists</Chip>
        <Chip>Playlists</Chip>
      </div>
      <div className="px-4 pt-5 pb-2 text-[13px] leading-[18px] font-semibold text-text-muted">Top result</div>
      <div className="mx-4 flex items-center gap-3.5 rounded-md bg-ink-raised p-3">
        <Cover kind="rings" size={72} radius={999} />
        <div className="min-w-0 flex-1">
          <div className="font-display text-[22px] leading-7 font-bold [font-stretch:75%]">Mira Sol</div>
          <div className="text-[13px] leading-[18px] font-medium text-text-muted">Artist, 14 tracks</div>
        </div>
        <span className="grid size-11 place-items-center rounded-full bg-amber text-on-amber">
          <Icon name="play" size={22} />
        </span>
      </div>
      <div className="px-4 pt-5 pb-1.5 text-[13px] leading-[18px] font-semibold text-text-muted">Tracks</div>
      <div className="px-2">
        <TrackRow track={t[1]} saved trailing="more" />
        <TrackRow track={t[5]} trailing="more" />
        <TrackRow track={{ ...t[6], title: "Mirrors at Sea", artist: "Mira Sol", cover: "tide" }} trailing="more" />
      </div>
      <Docked tab="Search" />
    </div>
  );
}
