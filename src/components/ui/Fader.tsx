"use client";

import { useRef } from "react";

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  valueText?: string;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  onChange: (v: number) => void;
  className?: string;
  children: React.ReactNode;
};

/** Accessible slider: pointer drag plus arrow, Home and End keys. The visuals go in children. */
export function Fader({ label, value, min, max, step = 1, valueText, disabled, orientation = "horizontal", onChange, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const fromPointer = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const t = orientation === "vertical" ? 1 - (e.clientY - r.top) / r.height : (e.clientX - r.left) / r.width;
    const raw = min + Math.min(1, Math.max(0, t)) * (max - min);
    onChange(Math.round(raw / step) * step);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowUp: value + step,
      ArrowRight: value + step,
      ArrowDown: value - step,
      ArrowLeft: value - step,
      Home: min,
      End: max,
    };
    if (e.key in map) {
      e.preventDefault();
      onChange(Math.min(max, Math.max(min, map[e.key])));
    }
  };

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-orientation={orientation}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={valueText}
      aria-disabled={disabled || undefined}
      className={`touch-none select-none ${disabled ? "" : "cursor-grab active:cursor-grabbing"} ${className ?? ""}`}
      onKeyDown={disabled ? undefined : onKey}
      onPointerDown={
        disabled
          ? undefined
          : (e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              fromPointer(e);
            }
      }
      onPointerMove={disabled ? undefined : (e) => e.buttons && fromPointer(e)}
    >
      {children}
    </div>
  );
}
