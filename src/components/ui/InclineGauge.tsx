interface InclineGaugeProps {
  /** Gradient in percent (e.g. 48 for the Pilatusbahn). */
  readonly percent: number;
  /** Compact mode renders a small inline slope with no labels (for cards). */
  readonly compact?: boolean;
  readonly className?: string;
}

/**
 * Visualizes a rack-railway gradient as an actual slope wedge with a tiny
 * climbing train marker. The hypotenuse uses the true grade angle
 * (angle = atan(percent / 100)) for authenticity.
 */
export default function InclineGauge({ percent, compact = false, className = '' }: InclineGaugeProps) {
  const baseX = 8;
  const baseY = 54;
  const baseLen = 84;
  const rise = Math.min(baseLen * (percent / 100), 46);
  const apexY = baseY - rise;
  const apexX = baseX + baseLen;
  const angleDeg = Math.round((Math.atan(percent / 100) * 180) / Math.PI);

  // Train marker position along the slope.
  const t = 0.6;
  const trainX = baseX + baseLen * t;
  const trainY = baseY - rise * t;

  const Slope = (
    <svg viewBox="0 0 100 60" className="w-full h-full block" fill="none" aria-hidden="true">
      {/* Filled slope wedge */}
      <path
        d={`M${baseX} ${baseY} L${apexX} ${apexY} L${apexX} ${baseY} Z`}
        fill="var(--color-glacier-light)"
        stroke="var(--app-border)"
        strokeWidth="2"
      />
      {/* Ground line */}
      <line x1={baseX} y1={baseY} x2={apexX} y2={baseY} stroke="var(--app-border)" strokeWidth="2.5" />
      {/* Rack track on the slope (red signal accent) */}
      <line x1={baseX} y1={baseY} x2={apexX} y2={apexY} stroke="#f22b0d" strokeWidth="2.5" />
      {/* Climbing train marker */}
      <g transform={`translate(${trainX} ${trainY}) rotate(${-angleDeg})`}>
        <rect x="-9" y="-12" width="18" height="9" fill="var(--app-border)" />
        <rect x="-6" y="-10" width="4.5" height="4" fill="var(--color-glacier-light)" />
        <rect x="1.5" y="-10" width="4.5" height="4" fill="var(--color-glacier-light)" />
        <circle cx="-5" cy="-2.5" r="2.2" fill="var(--app-border)" />
        <circle cx="5" cy="-2.5" r="2.2" fill="var(--app-border)" />
      </g>
    </svg>
  );

  if (compact) {
    return <div className={`w-18 h-12 ${className}`}>{Slope}</div>;
  }

  return (
    <div className={`flex items-stretch gap-4 ${className}`}>
      <div className="relative h-24 flex-1 border-[3px] border-iron-dark bg-cement-light shadow-hard-sm">
        {Slope}
        <span className="absolute top-1.5 left-2 text-label text-slate-stone">MAX. STEIGUNG</span>
      </div>
      <div className="flex flex-col items-center justify-center border-[3px] border-iron-dark bg-ink px-4 shadow-hard-sm">
        <span className="text-4xl font-black text-primary-red leading-none tracking-tighter">
          {percent}%
        </span>
        <span className="text-[11px] font-mono font-black uppercase tracking-widest text-white/70 mt-1">
          ≈ {angleDeg}° NEIGUNG
        </span>
      </div>
    </div>
  );
}
