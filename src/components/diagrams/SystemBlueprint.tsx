import { Info } from 'lucide-react';
import type { FC } from 'react';
import { Hotspot } from '../../types';

interface SystemBlueprintProps {
  readonly systemId: string;
  readonly hotspots: Hotspot[];
  readonly onHotspotClick: (hotspot: Hotspot) => void;
}

function LocherSVG() {
  return (
    <g>
      <rect x="180" y="50" width="40" height="200" fill="#f8f6f5" stroke="#0D0D0D" strokeWidth="3" />
      <line x1="180" y1="50" x2="180" y2="250" stroke="#0D0D0D" strokeWidth="4" />
      <line x1="220" y1="50" x2="220" y2="250" stroke="#0D0D0D" strokeWidth="4" />
      {Array.from({ length: 12 }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <g key={`locher-tooth-${i}`}>
          <path d={`M170 ${70 + i * 16} L180 ${65 + i * 16} L180 ${75 + i * 16} Z`} fill="#0D0D0D" stroke="#0D0D0D" strokeWidth="1" />
          <path d={`M230 ${70 + i * 16} L220 ${65 + i * 16} L220 ${75 + i * 16} Z`} fill="#0D0D0D" stroke="#0D0D0D" strokeWidth="1" />
        </g>
      ))}
      <circle cx="130" cy="140" r="45" fill="none" stroke="#0D0D0D" strokeWidth="3.5" strokeDasharray="6,4" />
      <circle cx="130" cy="140" r="18" fill="none" stroke="#0D0D0D" strokeWidth="3" />
      <circle cx="130" cy="140" r="5" fill="#f22b0d" />
      <line x1="130" y1="95" x2="130" y2="185" stroke="#0D0D0D" strokeWidth="1.5" />
      <line x1="85" y1="140" x2="175" y2="140" stroke="#0D0D0D" strokeWidth="1.5" />
      <circle cx="270" cy="140" r="45" fill="none" stroke="#0D0D0D" strokeWidth="3.5" strokeDasharray="6,4" />
      <circle cx="270" cy="140" r="18" fill="none" stroke="#0D0D0D" strokeWidth="3" />
      <circle cx="270" cy="140" r="5" fill="#f22b0d" />
      <line x1="270" y1="95" x2="270" y2="185" stroke="#0D0D0D" strokeWidth="1.5" />
      <line x1="225" y1="140" x2="315" y2="140" stroke="#0D0D0D" strokeWidth="1.5" />
      <circle cx="200" cy="190" r="12" fill="none" stroke="#f22b0d" strokeWidth="2.5" />
      <circle cx="200" cy="190" r="4" fill="#f22b0d" />
    </g>
  );
}

function AbtSVG() {
  return (
    <g>
      <rect x="80" y="110" width="240" height="20" fill="#eaeae6" stroke="#0D0D0D" strokeWidth="3" />
      <rect x="100" y="130" width="200" height="35" fill="#ffffff" stroke="#0D0D0D" strokeWidth="3" />
      <path d="M100 130 H300 L290 115 H110 Z" fill="#f22b0d" opacity="0.1" />
      {Array.from({ length: 11 }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <path key={`abt-front-${i}`} d={`M${115 + i * 16} 130 L${121 + i * 16} 115 H${127 + i * 16} L${131 + i * 16} 130 Z`} fill="#0D0D0D" />
      ))}
      <rect x="92" y="90" width="200" height="30" fill="#eaeae6" stroke="#0D0D0D" strokeWidth="2" strokeDasharray="4,2" />
      {Array.from({ length: 11 }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <path key={`abt-back-${i}`} d={`M${99 + i * 16} 90 L${105 + i * 16} 78 H${111 + i * 16} L${115 + i * 16} 90 Z`} fill="#595959" />
      ))}
      <circle cx="200" cy="120" r="32" fill="none" stroke="#f22b0d" strokeWidth="3" strokeDasharray="5,3" />
      <circle cx="200" cy="120" r="8" fill="#f22b0d" />
    </g>
  );
}

function StrubSVG() {
  return (
    <g>
      <rect x="180" y="130" width="40" height="110" fill="#eaeae6" stroke="#0D0D0D" strokeWidth="3" />
      <line x1="180" y1="180" x2="220" y2="180" stroke="#0D0D0D" strokeWidth="2" />
      <path d="M130 240 L180 220 H220 L270 240 Z" fill="#eaeae6" stroke="#0D0D0D" strokeWidth="3" />
      <path d="M160 110 H240 L230 145 H170 Z" fill="#ffffff" stroke="#0D0D0D" strokeWidth="3.5" />
      {Array.from({ length: 6 }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <rect key={`strub-tooth-${i}`} x={168 + i * 11} y="103" width="7" height="7" fill="#f22b0d" stroke="#0D0D0D" strokeWidth="1.5" />
      ))}
      <path d="M140 135 H165 L155 155 H130 Z" fill="#0D0D0D" />
      <path d="M260 135 H235 L245 155 H270 Z" fill="#0D0D0D" />
      <line x1="130" y1="145" x2="270" y2="145" stroke="#f22b0d" strokeWidth="2" strokeDasharray="4,4" />
    </g>
  );
}

function RiggenbachSVG() {
  return (
    <g>
      <line x1="80" y1="100" x2="320" y2="100" stroke="#0D0D0D" strokeWidth="14" strokeLinecap="square" />
      <line x1="80" y1="100" x2="320" y2="100" stroke="#eaeae6" strokeWidth="8" strokeLinecap="square" />
      <line x1="80" y1="190" x2="320" y2="190" stroke="#0D0D0D" strokeWidth="14" strokeLinecap="square" />
      <line x1="80" y1="190" x2="320" y2="190" stroke="#eaeae6" strokeWidth="8" strokeLinecap="square" />
      {Array.from({ length: 12 }).map((_, i) => {
        const cx = 100 + i * 18;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <g key={`riggenbach-rung-${i}`}>
            <line x1={cx} y1="106" x2={cx} y2="184" stroke="#0D0D0D" strokeWidth="5.5" />
            <circle cx={cx} cy="100" r="5" fill="#f22b0d" />
            <circle cx={cx} cy="190" r="5" fill="#f22b0d" />
          </g>
        );
      })}
      <circle cx="210" cy="145" r="30" fill="none" stroke="#f22b0d" strokeWidth="3" strokeDasharray="4,2" />
    </g>
  );
}

function VonRollSVG() {
  return (
    <g>
      <rect x="70" y="150" width="260" height="25" fill="#eaeae6" stroke="#0D0D0D" strokeWidth="3.5" />
      <rect x="100" y="80" width="200" height="70" fill="#ffffff" stroke="#0D0D0D" strokeWidth="4" />
      {Array.from({ length: 8 }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <g key={`vonroll-notch-${i}`}>
          <rect x={110 + i * 22} y="80" width="10" height="25" fill="#f22b0d" stroke="#0D0D0D" strokeWidth="2" />
          <path d={`M${110 + i * 22} 105 L${115 + i * 22} 120 L${120 + i * 22} 105 Z`} fill="#f22b0d" />
        </g>
      ))}
      <circle cx="130" cy="130" r="5" fill="#0D0D0D" />
      <circle cx="270" cy="130" r="5" fill="#0D0D0D" />
    </g>
  );
}

const blueprintMap: Record<string, FC> = {
  locher: LocherSVG,
  abt: AbtSVG,
  strub: StrubSVG,
  riggenbach: RiggenbachSVG,
  von_roll: VonRollSVG,
};

export default function SystemBlueprint({ systemId, hotspots, onHotspotClick }: Readonly<SystemBlueprintProps>) {
  const BlueprintSVG = blueprintMap[systemId];

  return (
    <section className="relative w-full h-80 border-b-[3px] border-iron-dark bg-white overflow-hidden select-none">
      {/* Technical drafting grid background */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(#0D0D0D 1px, transparent 1px),
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px, 16px 16px, 16px 16px',
          backgroundPosition: '0 0, 8px 8px, 8px 8px',
        }}
      />

      {/* Dynamic schematic drawing */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        <g transform="translate(0, 20)">
          {BlueprintSVG && <BlueprintSVG />}
        </g>
      </svg>

      {/* Floating schematic label */}
      <div className="absolute top-4 left-4 z-10 px-2 py-1 bg-white border-2 border-iron-dark font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
        CAD RISS // PROFIL {systemId.toUpperCase()}-01
      </div>

      {/* Hotspot dots */}
      {hotspots.map((hotspot) => (
        <button
          key={hotspot.id}
          onClick={() => onHotspotClick(hotspot)}
          aria-label={`Hotspot: ${hotspot.title}`}
          className="absolute p-0 w-7 h-7 bg-primary-red rounded-full flex items-center justify-center cursor-pointer border-3 border-white transition-transform duration-75 hover:scale-110 active:scale-95 z-20"
          style={{
            top: hotspot.top,
            left: hotspot.left,
            boxShadow: '2px 2px 0px 0px rgba(13, 13, 13, 1)',
          }}
        >
          <Info size={12} className="text-white fill-current shrink-0" />
        </button>
      ))}

      {/* Hotspot hint */}
      <div className="absolute bottom-4 right-4 z-10 bg-iron-dark text-white font-mono text-[8px] tracking-wider px-2 py-1 uppercase border border-white flex items-center gap-1 opacity-75">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-red animate-ping" />{' '}
        ROTE HOTSPOTS TIPPFÄHIG
      </div>
    </section>
  );
}
