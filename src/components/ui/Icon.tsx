const paths = {
  play: "M8 5.6c0-1 1.1-1.6 1.9-1.1l10.6 6.4c.8.5.8 1.7 0 2.2L9.9 19.5c-.8.5-1.9-.1-1.9-1.1V5.6Z",
  pause: "M7 4.5h3.2c.4 0 .8.4.8.8v13.4c0 .4-.4.8-.8.8H7c-.4 0-.8-.4-.8-.8V5.3c0-.4.4-.8.8-.8Zm6.8 0H17c.4 0 .8.4.8.8v13.4c0 .4-.4.8-.8.8h-3.2c-.4 0-.8-.4-.8-.8V5.3c0-.4.4-.8.8-.8Z",
  next: "M5 6c0-.9 1-1.4 1.700-.9L15 11v-5.200c0-.5.4-.8.8-.8h2.400c.5 0 .8.400.8.8v12.400c0 .5-.4.8-.8.8h-2.400c-.5 0-.8-.4-.8-.8V13l-8.300 5.900C6 19.400 5 18.900 5 18V6Z",
  prev: "M19 6c0-.9-1-1.400-1.700-.9L9 11v-5.200c0-.5-.4-.8-.8-.8H5.800c-.5 0-.8.400-.8.8v12.400c0 .5.4.8.8.8h2.400c.5 0 .8-.4.8-.8V13l8.300 5.900c.7.5 1.700 0 1.700-.9V6Z",
} as const;

const strokes = {
  home: "M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm9 2-4-4",
  library: "M5 4v16M10 4v16M15 4.500l4.500 15.500",
  sliders: "M4 7h9m4 0h3M4 17h3m4 0h9M15 5v4M9 15v4",
  heart: "M12 20s-8-4.700-8-10.500A4.500 4.500 0 0 1 12 7a4.500 4.500 0 0 1 8 2.500C20 15.300 12 20 12 20Z",
  shuffle: "M3 7h3.500c2 0 3 1 4.500 3.500l2 3.500c1.500 2.500 2.500 3 4.500 3H21m0 0-3-3m3 3-3 3M3 17h3.500c1.400 0 2.300-.5 3.200-1.700M21 7h-3.500c-1.400 0-2.300.5-3.200 1.700M21 7l-3-3m3 3-3 3",
  repeat: "M4 11V9a3 3 0 0 1 3-3h13m0 0-3-3m3 3-3 3M20 13v2a3 3 0 0 1-3 3H4m0 0 3 3m-3-3 3-3",
  queue: "M4 6h16M4 12h10M4 18h7m7-6v8l-3-1.500",
  lyrics: "M5 5h14v11H10l-5 4V5Zm4 4h6m-6 3h4",
  download: "M12 4v11m0 0 4.500-4.500M12 15l-4.500-4.500M5 20h14",
  check: "m5 12.500 4.500 4.500L19 7.500",
  chevron: "m6 9 6 6 6-6",
  more: "M12 6h.01M12 12h.01M12 18h.01",
  drag: "M5 9h14M5 15h14",
  close: "M6 6l12 12M18 6 6 18",
  plus: "M12 5v14M5 12h14",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6v-9Z",
  link: "M10 14a4 4 0 0 0 6 .400l3-3a4 4 0 0 0-5.700-5.700l-1.300 1.300M14 10a4 4 0 0 0-6-.400l-3 3a4 4 0 0 0 5.700 5.700l1.300-1.300",
  android: "M7 10v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-7H7Zm0-1a5 5 0 0 1 10 0H7Zm-3 1v5m16-5v5M9 18v3m6-3v3M8.500 4.500 7.500 3m8 1.500 1-1.500",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.500 2.500 3.500 5.500 3.500 9s-1 6.500-3.500 9c-2.500-2.500-3.500-5.500-3.500-9S9.500 5.500 12 3Z",
  arrowDown: "M12 5v14m0 0 6-6m-6 6-6-6",
} as const;

export type IconName = keyof typeof paths | keyof typeof strokes;

export function Icon({ name, size = 24, className, fill }: { name: IconName; size?: number; className?: string; fill?: boolean }) {
  const solid = name in paths;
  const d = solid ? paths[name as keyof typeof paths] : strokes[name as keyof typeof strokes];
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" className={className} fill={solid || fill ? "currentColor" : "none"} stroke={solid ? "none" : "currentColor"} strokeWidth={solid ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
