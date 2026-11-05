/** Fictional catalogue. No real artists or releases appear in the concept. */
export type CoverKind = "sun" | "rings" | "stripes" | "tide" | "grid" | "arc";
export type Track = { title: string; artist: string; time: string; cover: CoverKind };

export const tracks: Track[] = [
  { title: "Monsoon Static", artist: "Night Bus Radio", time: "4:12", cover: "sun" },
  { title: "Paper Lanterns", artist: "Mira Sol", time: "3:42", cover: "rings" },
  { title: "Slow Ferry", artist: "Kite Season", time: "5:03", cover: "tide" },
  { title: "Chai at 2am", artist: "Lo-Fi Bazaar", time: "2:58", cover: "stripes" },
  { title: "Rooftop Cricket", artist: "Bombay Dusk", time: "3:27", cover: "grid" },
  { title: "Static Bloom", artist: "Mira Sol", time: "4:31", cover: "arc" },
  { title: "Long Way Home", artist: "Night Bus Radio", time: "3:55", cover: "sun" },
];

/** Deterministic waveform so server and client markup match. */
export const waveform = Array.from({ length: 56 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 0.61) * 0.55 + Math.sin(i * 1.73) * 0.3 + Math.sin(i * 0.17) * 0.15);
  return Math.round((0.18 + v * 0.82) * 100) / 100;
});
