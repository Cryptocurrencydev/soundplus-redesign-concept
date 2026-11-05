"use client";

import { useEffect, useRef, useState } from "react";
import { Fader } from "@/components/ui/Fader";
import { Icon } from "@/components/ui/Icon";
import { SliderTrack, StatusBar, Switch } from "@/components/ui/kit";

const BANDS = ["60 Hz", "230 Hz", "910 Hz", "3.6 kHz", "14 kHz"];
const PRESETS: Record<string, number[]> = {
  Flat: [0, 0, 0, 0, 0],
  "Bass boost": [8, 5, 0, -1, 1],
  Vocal: [-3, -1, 4, 5, 1],
  "Late night": [4, 2, -2, -5, -7],
};
const MAX = 12;
const W = 312;
const H = 148;

/** Smooth curve through the five band points (Catmull-Rom to bezier). */
function curve(vals: number[]) {
  const pts = vals.map((v, i) => [(W / 5) * (i + 0.5), H / 2 - (v / MAX) * (H / 2 - 10)]);
  const all = [[0, pts[0][1]], ...pts, [W, pts[4][1]]];
  let d = `M0 ${all[0][1]}`;
  for (let i = 0; i < all.length - 1; i++) {
    const p0 = all[i - 1] ?? all[i];
    const [p1, p2] = [all[i], all[i + 1]];
    const p3 = all[i + 2] ?? p2;
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`;
  }
  return { d, pts };
}

export function EqualizerScreen() {
  const [on, setOn] = useState(true);
  const [preset, setPreset] = useState<string | null>("Late night");
  const [vals, setVals] = useState(PRESETS["Late night"]);
  const [bass, setBass] = useState(30);
  const [fade, setFade] = useState(3);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const applyPreset = (name: string) => {
    setPreset(name);
    const from = vals;
    const to = PRESETS[name];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setVals(to);
    let start: number | undefined;
    cancelAnimationFrame(raf.current);
    const tick = (now: number) => {
      start ??= now;
      const t = Math.min(1, (now - start) / 320);
      const e = 1 - (1 - t) ** 3;
      setVals(from.map((f, i) => f + (to[i] - f) * e));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  const setBand = (i: number, v: number) => {
    cancelAnimationFrame(raf.current);
    setPreset(null);
    setVals(vals.map((x, j) => (j === i ? v : Math.round(x))));
  };

  const { d, pts } = curve(vals);

  return (
    <div className="h-full">
      <StatusBar />
      <div className="flex items-center gap-2 px-3 pt-1">
        <span className="grid size-10 place-items-center">
          <Icon name="chevron" size={24} className="rotate-90" />
        </span>
        <h3 className="font-display flex-1 text-[30px] leading-[34px] font-extrabold [font-stretch:75%]">Equalizer</h3>
        <button type="button" role="switch" aria-checked={on} aria-label="Equalizer on" onClick={() => setOn(!on)} className="mr-2 rounded-full">
          <Switch on={on} />
        </button>
      </div>

      <div className={`transition-opacity duration-200 ${on ? "" : "opacity-45"}`}>
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pt-3.5">
          {Object.keys(PRESETS).map((p) => (
            <button key={p} type="button" disabled={!on} aria-pressed={preset === p} onClick={() => applyPreset(p)} className={`inline-flex h-9 flex-none items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold whitespace-nowrap transition-colors ${preset === p ? "bg-amber text-on-amber" : "bg-ink-high text-text"}`}>
              {preset === p && <Icon name="check" size={15} />}
              {p}
            </button>
          ))}
        </div>

        <div className="mx-3 mt-3.5 rounded-lg bg-ink-raised pt-3 pb-3">
          <div className="flex items-baseline justify-between px-4 pb-1.5 text-[13px] font-semibold">
            <span>{preset ?? "Custom"}</span>
            <button type="button" disabled={!on} onClick={() => applyPreset("Flat")} className="text-text-muted">
              Reset
            </button>
          </div>
          <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="mx-auto block w-[312px]">
            <defs>
              <linearGradient id="eq-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffb21e" stopOpacity=".42" />
                <stop offset="1" stopColor="#ffb21e" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" x2={W} y1={H / 2} y2={H / 2} stroke="#433c8c" strokeDasharray="3 5" />
            <path d={`${d} L${W} ${H} L0 ${H} Z`} fill="url(#eq-fill)" />
            <path d={d} fill="none" stroke="#ffb21e" strokeWidth="3" strokeLinecap="round" />
            {pts.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="5" fill="#0f0c2e" stroke="#ffb21e" strokeWidth="2.5" />
            ))}
          </svg>
          <div className="flex px-0 pt-2">
            {vals.map((v, i) => {
              const db = Math.round(v);
              const pct = ((v + MAX) / (2 * MAX)) * 100;
              return (
                <div key={BANDS[i]} className="flex w-1/5 flex-col items-center">
                  <span className={`pb-1 text-[13px] font-semibold tabular-nums ${db === 0 ? "text-text-faint" : "text-amber"}`}>{db > 0 ? `+${db}` : db}</span>
                  <Fader label={`${BANDS[i]} gain`} orientation="vertical" min={-MAX} max={MAX} value={db} valueText={`${db} decibels`} disabled={!on} onChange={(n) => setBand(i, n)} className="relative h-[196px] w-11 rounded-md">
                    <span className="absolute inset-y-[5%] left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-ink-high" />
                    <span className="absolute left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-amber" style={v >= 0 ? { bottom: "50%", height: `${(pct - 50) * 0.9}%` } : { top: "50%", height: `${(50 - pct) * 0.9}%` }} />
                    <span className="absolute left-1/2 h-[22px] w-9 -translate-x-1/2 translate-y-1/2 rounded-[8px] bg-text shadow-[0_2px_6px_#0008]" style={{ bottom: `${5 + pct * 0.9}%` }} />
                  </Fader>
                  <span className="pt-1 text-[11px] leading-[14px] font-semibold text-text-muted">{BANDS[i]}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-6 pt-3.5">
          <div className="flex justify-between text-[13px] leading-[18px] font-semibold">
            <span>Bass booster</span>
            <span className="text-amber tabular-nums">{bass}%</span>
          </div>
          <Fader label="Bass booster" min={0} max={100} value={bass} valueText={`${bass} percent`} disabled={!on} onChange={setBass}>
            <SliderTrack value={bass} />
          </Fader>
          <div className="flex justify-between pt-1.5 text-[13px] leading-[18px] font-semibold">
            <span>Crossfade</span>
            <span className="text-amber tabular-nums">{fade}s</span>
          </div>
          <Fader label="Crossfade" min={0} max={10} value={fade} valueText={`${fade} seconds`} disabled={!on} onChange={setFade}>
            <SliderTrack value={fade * 10} />
          </Fader>
        </div>
      </div>
    </div>
  );
}
