import { ImageResponse } from "next/og";

export const alt = "SoundPlus redesign concept by DC Tech, not the official site";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  const bars = [52, 88, 40, 72, 48];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0f0c2e", color: "#f6f3ff", padding: 64, position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 700, justifyContent: "space-between" }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#ffb21e" }}>Redesign concept by DC Tech, not the official site</div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1 }}>SoundPlus, redrawn</div>
          <div style={{ fontSize: 30, color: "#bdb7e3" }}>Landing page, six app screens and a design system</div>
        </div>
        <div style={{ position: "absolute", right: 56, bottom: 0, display: "flex", alignItems: "flex-end", height: 560 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ width: 66, height: `${h}%`, background: "#ffb21e", borderRadius: "20px 20px 0 0", marginLeft: 12 }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
