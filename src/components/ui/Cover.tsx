import type { CoverKind } from "@/lib/tracks";

/** Generated album art. Cover colours are content, not UI, so they may leave the amber rule. */
export function Cover({ kind, size, className = "", radius = 10 }: { kind: CoverKind; size?: number; className?: string; radius?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" width={size} height={size} className={`block flex-none ${className}`} style={{ borderRadius: radius }}>
      {art[kind]}
    </svg>
  );
}

const art: Record<CoverKind, React.ReactNode> = {
  sun: (
    <>
      <defs>
        <linearGradient id="c-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c1a7a" />
          <stop offset="0.62" stopColor="#d3366f" />
          <stop offset="1" stopColor="#ff9a3d" />
        </linearGradient>
        <clipPath id="c-sun-clip">
          <rect width="100" height="62" />
        </clipPath>
      </defs>
      <rect width="100" height="100" fill="url(#c-sun)" />
      <circle cx="50" cy="60" r="27" fill="#ffd166" clipPath="url(#c-sun-clip)" />
      {[66, 72, 79, 87].map((y, i) => (
        <rect key={y} y={y} width="100" height={2 + i * 1.4} fill="#150f45" opacity={0.85} />
      ))}
      <rect y="92" width="100" height="8" fill="#150f45" />
    </>
  ),
  rings: (
    <>
      <rect width="100" height="100" fill="#123a5a" />
      {[44, 34, 24, 14].map((r, i) => (
        <circle key={r} cx="66" cy="38" r={r} fill={["#1b5f7a", "#2a8f92", "#6cc5a1", "#f4e9b0"][i]} />
      ))}
    </>
  ),
  stripes: (
    <>
      <rect width="100" height="100" fill="#f1e4c8" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={10 + i * 17} y={18 + (i % 2) * 22} width="11" height={70 - (i % 2) * 22} rx="5.500" fill={i % 2 ? "#c43d5a" : "#3a2470"} />
      ))}
    </>
  ),
  tide: (
    <>
      <rect width="100" height="100" fill="#0e5f6e" />
      <circle cx="28" cy="28" r="12" fill="#ffe2a8" />
      {[50, 64, 78].map((y, i) => (
        <path key={y} d={`M0 ${y} q 25 -14 50 0 t 50 0 V100 H0 Z`} fill={["#17808a", "#1f9f9a", "#7fdcc0"][i]} />
      ))}
    </>
  ),
  grid: (
    <>
      <rect width="100" height="100" fill="#7c1f55" />
      {Array.from({ length: 16 }, (_, i) => (
        <circle key={i} cx={17 + (i % 4) * 22} cy={17 + Math.floor(i / 4) * 22} r={3 + ((i * 7) % 6) * 1.300} fill="#ffc9a3" />
      ))}
    </>
  ),
  arc: (
    <>
      <rect width="100" height="100" fill="#2a1f78" />
      <path d="M0 100a100 100 0 0 1 100-100v100Z" fill="#6a4ce0" />
      <path d="M30 100a70 70 0 0 1 70-70v70Z" fill="#c78bff" />
      <path d="M60 100a40 40 0 0 1 40-40v40Z" fill="#ffe0f0" />
    </>
  ),
};
