"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { Cover } from "@/components/ui/Cover";
import { Fader } from "@/components/ui/Fader";
import { Icon } from "@/components/ui/Icon";
import { Chip, StatusBar } from "@/components/ui/kit";
import { waveform } from "@/lib/tracks";

const LENGTH = 252; // 4:12
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function NowPlayingScreen({ interactive = true }: { interactive?: boolean }) {
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(true);
  const [pos, setPos] = useState(97);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!playing || !interactive || reduced) return;
    const id = setInterval(() => setPos((p) => (p + 1) % LENGTH), 1000);
    return () => clearInterval(id);
  }, [playing, interactive, reduced]);

  const pct = pos / LENGTH;
  const Btn = interactive ? "button" : "span";

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="relative h-full">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(90%_70%_at_50%_30%,#c8336f88,#2c1a7a66_55%,transparent)]" />
        <StatusBar />
        <div className="flex items-center justify-between px-3 pt-1">
          <span className="grid size-10 place-items-center">
            <Icon name="chevron" size={24} />
          </span>
          <div className="text-center">
            <div className="text-[11px] leading-[14px] font-semibold text-text-muted">Playing from</div>
            <div className="text-[13px] leading-[18px] font-semibold">Long Way Home</div>
          </div>
          <span className="grid size-10 place-items-center">
            <Icon name="sliders" size={22} />
          </span>
        </div>

        <m.div className="mx-auto mt-4 w-[312px]" animate={{ scale: playing ? 1 : 0.9 }} transition={{ type: "spring", stiffness: 260, damping: 26 }}>
          <Cover kind="sun" className="w-full shadow-[0_24px_48px_-12px_#0009]" radius={28} />
        </m.div>

        <div className="flex items-center gap-3 px-6 pt-5">
          <div className="min-w-0 flex-1">
            <h3 className="font-display truncate text-[30px] leading-[34px] font-extrabold [font-stretch:75%]">Monsoon Static</h3>
            <p className="truncate text-[15px] leading-5 font-medium text-text-muted">Night Bus Radio</p>
          </div>
          <Btn {...(interactive ? { type: "button" as const, "aria-pressed": liked, "aria-label": "Like track", onClick: () => setLiked(!liked) } : {})} className={`grid size-11 flex-none place-items-center rounded-full ${liked ? "text-amber" : "text-text-muted"}`}>
            <Icon name="heart" size={26} fill={liked} />
          </Btn>
        </div>

        <div className="px-6 pt-3">
          <Fader label="Seek" min={0} max={LENGTH} value={pos} valueText={`${fmt(pos)} of ${fmt(LENGTH)}`} disabled={!interactive} onChange={setPos} className="py-1">
            <div className="flex h-12 items-center justify-between">
              {waveform.map((h, i) => {
                const on = i / waveform.length < pct;
                return <span key={i} className={`w-[3px] rounded-full transition-colors ${on ? "bg-amber" : "bg-line"}`} style={{ height: `${h * 100}%` }} />;
              })}
            </div>
          </Fader>
          <div className="flex justify-between pt-0.5 text-[13px] font-medium text-text-muted tabular-nums">
            <span>{fmt(pos)}</span>
            <span>{fmt(LENGTH)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 pt-2.5">
          <span className="grid size-11 place-items-center text-text-muted">
            <Icon name="shuffle" size={24} />
          </span>
          <span className="grid size-11 place-items-center">
            <Icon name="prev" size={30} />
          </span>
          <Btn
            {...(interactive ? { type: "button" as const, "aria-label": playing ? "Pause" : "Play", onClick: () => setPlaying(!playing) } : {})}
            className={`grid size-[76px] place-items-center rounded-full transition-[background-color,transform] active:scale-95 ${playing ? "bg-amber text-on-amber" : "bg-text text-ink"}`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <m.span key={playing ? "pause" : "play"} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.14 }} className="grid place-items-center">
                <Icon name={playing ? "pause" : "play"} size={34} />
              </m.span>
            </AnimatePresence>
          </Btn>
          <span className="grid size-11 place-items-center">
            <Icon name="next" size={30} />
          </span>
          <span className="grid size-11 place-items-center text-amber">
            <Icon name="repeat" size={24} />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-2">
          <Chip>Crossfade 3s</Chip>
          <Chip icon="lyrics">Lyrics</Chip>
          <Chip icon="queue">Queue</Chip>
        </div>
      </div>
    </LazyMotion>
  );
}
