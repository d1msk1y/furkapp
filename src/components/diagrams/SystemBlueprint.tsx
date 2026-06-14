import { Info } from 'lucide-react';
import { Hotspot } from '../../types';
import { useLanguage } from '../../features/i18n/useLanguage';

interface SystemBlueprintProps {
  readonly systemId: string;
  readonly hotspots: Hotspot[];
  readonly onHotspotClick: (hotspot: Hotspot) => void;
}

// Actual photos — filenames as uploaded (rigenbach.png has a typo upstream)
const photoMap: Record<string, string> = {
  abt: '/systemPictures/abt.png',
  locher: '/systemPictures/locher.png',
  strub: '/systemPictures/strub.png',
  riggenbach: '/systemPictures/rigenbach.png',
  von_roll: '/systemPictures/vonroll.png',
};

export default function SystemBlueprint({ systemId, hotspots, onHotspotClick }: Readonly<SystemBlueprintProps>) {
  const { t } = useLanguage();
  const photo = photoMap[systemId];

  return (
    <section className="relative w-full h-80 border-b-[3px] border-iron-dark bg-white overflow-hidden select-none">
      {photo && (
        <img
          src={photo}
          alt={systemId}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      )}

      {/* Floating schematic label */}
      <div className="absolute top-4 left-4 z-10 px-2 py-1 bg-white border-2 border-iron-dark font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
        FOTO // {systemId.toUpperCase()}-01
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
      <div className="absolute bottom-4 right-4 z-10 bg-ink text-white font-mono text-[8px] tracking-wider px-2 py-1 uppercase border border-white flex items-center gap-1 opacity-75">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-red animate-ping" />{' '}
        {t('detail.hotspot_hint')}
      </div>
    </section>
  );
}
