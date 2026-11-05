export function Phone({ children, className = "", scale, label }: { children: React.ReactNode; className?: string; scale?: number; label?: string }) {
  return (
    <div role={label ? "group" : undefined} aria-label={label} className={`phone ${className}`} style={scale ? ({ "--s": scale } as React.CSSProperties) : undefined}>
      <div className="phone-body">
        <div className="phone-screen">{children}</div>
      </div>
    </div>
  );
}
