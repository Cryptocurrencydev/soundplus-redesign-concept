"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { Phone } from "@/components/phone/Phone";
import { NowPlayingScreen } from "@/components/phone/NowPlaying";
import { Cover } from "@/components/ui/Cover";
import { Icon } from "@/components/ui/Icon";
import { Bars } from "@/components/ui/kit";

/** The product's core promise as the one orchestrated moment: the screen sleeps, the music doesn't. */
export function HeroPhone() {
  const [off, setOff] = useState(false);
  const touched = useRef(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = setTimeout(() => !touched.current && setOff(true), 2800);
    const b = setTimeout(() => !touched.current && setOff(false), 6800);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="relative">
        <Phone className="[--s:.72] sm:[--s:.8] xl:[--s:.84]">
          <div inert aria-hidden className="h-full">
            <NowPlayingScreen interactive={false} />
          </div>
          <AnimatePresence>
            {off && (
              <m.div aria-hidden className="absolute inset-0 z-10 bg-black" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <div className="pt-28 text-center">
                  <div className="font-display text-[84px] leading-none font-bold text-text-muted [font-stretch:70%] tabular-nums">21:41</div>
                  <div className="mt-2 text-[15px] font-medium text-text-faint">Thursday 5 November</div>
                </div>
                <div className="absolute inset-x-6 bottom-24 flex items-center gap-3 rounded-md bg-[#16132f] p-3">
                  <Cover kind="sun" size={48} radius={10} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[15px] leading-5 font-medium">Monsoon Static</div>
                    <div className="truncate text-[13px] leading-[18px] font-medium text-text-muted">Night Bus Radio</div>
                  </div>
                  <Bars size={20} className="mr-1 text-amber" />
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </Phone>
        <button
          type="button"
          aria-pressed={off}
          aria-label={off ? "Turn phone screen on" : "Turn phone screen off"}
          onClick={() => {
            touched.current = true;
            setOff(!off);
          }}
          className="absolute top-[24%] -right-[5px] h-[72px] w-[9px] rounded-r-[4px] bg-text shadow-[0_0_0_5px_#0f0c2e66] transition-transform before:absolute before:-inset-x-5 before:-inset-y-2 before:content-[''] active:translate-x-[-2px]"
        />
        <p className="mx-auto mt-3 flex w-fit items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-semibold text-text">
          <Icon name="lock" size={15} />
          {off ? "Screen off, still playing" : "Press the side button to lock it"}
        </p>
      </div>
    </LazyMotion>
  );
}
