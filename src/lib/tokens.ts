/** Mirrors the @theme block in globals.css. /system renders from this file. */
export const colors = [
  { name: "ink", hex: "#0F0C2E", role: "Page and app background" },
  { name: "ink-raised", hex: "#1A1645", role: "Cards, sheets, mini player" },
  { name: "ink-high", hex: "#29236A", role: "Selected rows, slider tracks, chips" },
  { name: "line", hex: "#433C8C", role: "Borders and dividers" },
  { name: "text", hex: "#F6F3FF", role: "Primary text and icons" },
  { name: "text-muted", hex: "#BDB7E3", role: "Secondary text" },
  { name: "text-faint", hex: "#9690C7", role: "Tertiary text, timestamps" },
  { name: "amber", hex: "#FFB21E", role: "The one accent: play, active, selected" },
  { name: "amber-press", hex: "#E89A00", role: "Accent, pressed" },
  { name: "on-amber", hex: "#1B1240", role: "Text and icons on amber" },
] as const;

export const contrastPairs = [
  ["text", "ink"],
  ["text-muted", "ink"],
  ["text-faint", "ink"],
  ["text-muted", "ink-raised"],
  ["text-faint", "ink-raised"],
  ["amber", "ink"],
  ["amber", "ink-high"],
  ["on-amber", "amber"],
] as const;

export const appType = [
  { name: "Display", size: 30, line: 34, weight: 800, font: "Anybody, 75% width", sample: "Monsoon Static", cls: "font-display text-[30px] leading-[34px] font-extrabold [font-stretch:75%]" },
  { name: "Title", size: 22, line: 28, weight: 700, font: "Anybody, 75% width", sample: "Made for tonight", cls: "font-display text-[22px] leading-7 font-bold [font-stretch:75%]" },
  { name: "Heading", size: 17, line: 24, weight: 600, font: "Instrument Sans", sample: "Up next in your queue", cls: "text-[17px] leading-6 font-semibold" },
  { name: "Body", size: 15, line: 20, weight: 500, font: "Instrument Sans", sample: "Paper Lanterns", cls: "text-[15px] leading-5 font-medium" },
  { name: "Label", size: 13, line: 18, weight: 500, font: "Instrument Sans", sample: "Mira Sol, 3:42", cls: "text-[13px] leading-[18px] font-medium" },
  { name: "Micro", size: 11, line: 14, weight: 600, font: "Instrument Sans", sample: "3.6 kHz", cls: "text-[11px] leading-[14px] font-semibold" },
] as const;

export const spacing = [4, 8, 12, 16, 24, 32, 48, 64, 96] as const;

export const radii = [
  { name: "xs", px: 6, use: "Tags, small covers" },
  { name: "sm", px: 10, use: "Track row covers, inputs" },
  { name: "md", px: 16, use: "Mini player, panels" },
  { name: "lg", px: 28, use: "Sheets, large art" },
  { name: "full", px: 999, use: "Buttons, chips, sliders" },
] as const;

function luminance(hex: string) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = c.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
