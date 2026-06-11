interface RidgelineProps {
  /** Tailwind text color class — the silhouette uses currentColor. */
  readonly className?: string;
  /** Pixel height of the band. */
  readonly height?: number;
  /** Flip vertically so peaks point downward (useful as a top divider). */
  readonly flip?: boolean;
  /** Render a thin red railway line tracing across the ridge. */
  readonly withTrack?: boolean;
}

/**
 * Reusable alpine mountain silhouette band used as a section divider / header
 * accent. Inherits its fill from the text color (currentColor) so it can adopt
 * any palette token (iron-dark, pine, glacier, …).
 */
export default function Ridgeline({
  className = 'text-iron-dark',
  height = 48,
  flip = false,
  withTrack = false,
}: RidgelineProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${className}`}
      style={{ height, transform: flip ? 'scaleY(-1)' : undefined }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 48"
        preserveAspectRatio="none"
        className="w-full h-full block"
        fill="none"
      >
        {/* Back range (lighter, layered for depth) */}
        <path
          d="M0 48 L40 22 L78 34 L120 12 L168 30 L210 8 L260 28 L312 14 L360 30 L400 18 L400 48 Z"
          fill="currentColor"
          opacity="0.35"
        />
        {/* Front range (full silhouette) */}
        <path
          d="M0 48 L52 30 L96 40 L150 18 L200 36 L250 14 L300 34 L348 22 L400 38 L400 48 Z"
          fill="currentColor"
        />
        {withTrack && (
          <path
            d="M0 48 L52 30 L96 40 L150 18 L200 36 L250 14 L300 34 L348 22 L400 38"
            stroke="#f22b0d"
            strokeWidth="2"
            strokeDasharray="6,5"
            fill="none"
            opacity="0.85"
          />
        )}
      </svg>
    </div>
  );
}
