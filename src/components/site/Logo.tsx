export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-end gap-2 ${className}`}>
      <span aria-hidden className="flex h-5 items-end gap-[3px]">
        {[0.6, 1, 0.42, 0.8, 0.52].map((h, i) => (
          <span key={i} className="w-[4px] rounded-full bg-amber" style={{ height: `${h * 100}%` }} />
        ))}
      </span>
      <span className="font-display text-[22px] leading-5 font-extrabold tracking-tight [font-stretch:80%]">SoundPlus</span>
    </span>
  );
}
