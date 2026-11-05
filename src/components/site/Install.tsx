import { Icon } from "@/components/ui/Icon";
import { LINKS, SPEC } from "@/lib/site";

const steps = [
  { t: "Download the APK", b: `Tap Download on your Android phone. The file is ${SPEC.size}.` },
  { t: "Allow the install", b: "Open the file. If Android asks, turn on Allow from this source in settings." },
  { t: "Press play", b: "Open SoundPlus and start listening. There is nothing to sign up for." },
];

const spec = [
  ["Version", `${SPEC.version} (build ${SPEC.build})`],
  ["Requires", `Android ${SPEC.minAndroid}`],
  ["Download size", SPEC.size],
  ["Price", SPEC.price],
  ["Account", "None needed"],
];

export function Install() {
  return (
    <section id="install" className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
      <div>
        <h2 className="display text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.96]">Installed in three steps.</h2>
        <ol className="mt-10">
          {steps.map((s, i) => (
            <li key={s.t} className="grid grid-cols-[3.5rem_1fr] gap-x-2 border-t border-line py-6 md:grid-cols-[5rem_1fr]">
              <span aria-hidden className="display text-[44px] leading-none text-amber md:text-[56px]">{i + 1}</span>
              <div>
                <h3 className="text-[20px] leading-7 font-semibold">{s.t}</h3>
                <p className="mt-1 max-w-[48ch] text-[16px] leading-[1.5] text-text-muted">{s.b}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <aside aria-label="Specifications" className="self-end rounded-lg bg-ink-raised p-6 md:p-8">
        <dl>
          {spec.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line py-3.5 first:pt-0">
              <dt className="text-[15px] text-text-muted">{k}</dt>
              <dd className="text-right text-[16px] font-semibold tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
        <a href={LINKS.apk} className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-amber text-[17px] font-semibold text-on-amber transition-colors hover:bg-amber-press">
          <Icon name="android" size={22} />
          Download for Android
        </a>
      </aside>
    </section>
  );
}
