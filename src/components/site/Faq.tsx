"use client";

import { useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

const faqs = [
  { q: "Is SoundPlus free?", a: "Yes. Downloading and listening cost nothing." },
  { q: "Do I need an account?", a: "No. There is no sign-up, so you can open the app and start playing straight away." },
  { q: "Why do I install an APK?", a: "SoundPlus is distributed directly as an APK file, so Android asks you to allow the install the first time. The install section above covers each step." },
  { q: "Can I bring my playlists?", a: "Yes. Go to Library, choose Import Playlist and paste a Spotify or YouTube Music link. The playlist has to be public, or the import comes through incomplete." },
  { q: "Why does the music stop when my screen is off?", a: "Your phone's battery settings are probably closing the app. Open the app's battery options in Android settings and set them to Unrestricted." },
  { q: "Where does the music come from?", a: "SoundPlus is an independent player that streams from YouTube Music. It is not affiliated with YouTube or Google." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto grid max-w-[1320px] gap-10 px-5 pb-24 md:px-10 md:pb-32 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
      <h2 className="display text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.96]">Questions, answered.</h2>
      <LazyMotion features={domAnimation} strict>
        <div>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-t border-line last:border-b">
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left text-[18px] leading-6 font-semibold">
                    {f.q}
                    <Icon name="chevron" size={22} className={`flex-none text-amber transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div id={`faq-${i}`} initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }} className="overflow-hidden">
                      <p className="max-w-[60ch] pb-5 text-[16px] leading-[1.55] text-text-muted">{f.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </LazyMotion>
    </section>
  );
}
