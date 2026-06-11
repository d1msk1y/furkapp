import { useState } from 'react';
import { motion } from 'motion/react';
import {
  HelpCircle,
  Info,
  AlertTriangle,
  Wrench,
  ArrowDown,
  ChevronDown,
  ChevronLeft,
  Mountain,
  TrendingUp,
  Ruler,
  Layers,
  MoveHorizontal,
} from 'lucide-react';
import { ZahnradSystem, Hotspot } from '../../types';
import ScreenContainer from '../layout/ScreenContainer';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import InclineGauge from '../ui/InclineGauge';
import StatTile from '../ui/StatTile';
import SystemBlueprint from '../diagrams/SystemBlueprint';

function statIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes('steigung')) return <TrendingUp size={16} strokeWidth={2.5} />;
  if (l.includes('teilung')) return <Ruler size={16} strokeWidth={2.5} />;
  if (l.includes('material')) return <Layers size={16} strokeWidth={2.5} />;
  if (l.includes('spur')) return <MoveHorizontal size={16} strokeWidth={2.5} />;
  return <Info size={16} strokeWidth={2.5} />;
}

interface DetailScreenProps {
  readonly system: ZahnradSystem;
  readonly onBackToDashboard: () => void;
  readonly onStartQuiz: () => void;
}

export default function DetailScreen({ system, onBackToDashboard, onStartQuiz }: Readonly<DetailScreenProps>) {
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  return (
    <ScreenContainer className="overflow-x-hidden relative pb-28">
      {/* Title Block */}
      <section className="bg-cement-light p-6 border-b-[3px] border-iron-dark">
        <div className="flex items-start gap-4">
          <Button
            variant="icon"
            size="sm"
            onClick={onBackToDashboard}
            aria-label="Zurück zur Auswahl"
            className="shrink-0"
          >
            <ChevronLeft size={22} strokeWidth={3} className="text-iron-dark" />
          </Button>
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-iron-dark leading-none">
              {system.name}
            </h2>
            <p className="text-sm font-mono font-bold uppercase tracking-widest text-primary-red mt-1">
              ENTWICKELT {system.developed} • {system.type.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <Badge variant="pine" className="px-2 py-1">
            <Mountain size={11} strokeWidth={2.5} />
            {system.famousLine.toUpperCase()}
          </Badge>
          <Badge variant="glacier" className="px-2 py-1">
            {system.tagline.toUpperCase()}
          </Badge>
        </div>

        {/* Incline gauge — turns the gradient into a real slope */}
        <InclineGauge percent={system.maxGradientPercent} className="mt-5" />
      </section>

      {/* Blueprint Diagram */}
      <SystemBlueprint
        systemId={system.id}
        hotspots={system.hotspots}
        onHotspotClick={setSelectedHotspot}
      />

      {/* Toggle Bar */}
      <section className="bg-cement-sand border-b-[3px] border-iron-dark p-4 sticky top-0 z-10 flex justify-between items-center">
        <span className="text-sm font-black uppercase tracking-wider text-iron-dark flex items-center gap-1.5">
          <Info size={16} className="text-primary-red" />
          TECHNISCHE DETAILS ANZEIGEN
        </span>

        <div className="relative inline-block w-16 h-8 align-middle select-none">
          <input
            type="checkbox"
            name="toggle"
            id="tech-toggle"
            checked={showTechDetails}
            onChange={(e) => setShowTechDetails(e.target.checked)}
            className="absolute block w-8 h-8 rounded-none border-[3px] border-iron-dark bg-cement-light appearance-none cursor-pointer z-20 checked:translate-x-6.5 transition-transform duration-100 ease-out"
          />
          <label
            htmlFor="tech-toggle"
            aria-label="Technische Details umschalten"
            className={`block overflow-hidden h-8 rounded-none border-[3px] border-iron-dark cursor-pointer transition-colors duration-100 ${
              showTechDetails ? 'bg-ink' : 'bg-cement-light'
            }`}
          />
        </div>
      </section>

      {/* Content Area */}
      <main className="grow bg-cement-sand p-6">
        {!showTechDetails && (
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Lead sentence */}
            <p className="text-base sm:text-lg font-bold leading-[140%] text-iron-dark">
              {system.explanationShort}
            </p>

            {/* Visual Gefahr -> Lösung panel */}
            <div className="space-y-3">
              <div className="bg-cement-light border-[3px] border-iron-dark shadow-hard-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center justify-center h-8 w-8 bg-primary-red border-2 border-iron-dark shrink-0">
                    <AlertTriangle size={18} strokeWidth={2.5} className="text-white" />
                  </span>
                  <span className="text-sm font-black uppercase tracking-widest text-primary-red">
                    Die Gefahr
                  </span>
                </div>
                <p className="text-sm sm:text-base font-medium leading-[145%] text-iron-dark">
                  {system.steepDangerText}
                </p>
              </div>

              <div className="flex justify-center">
                <span className="flex items-center justify-center h-8 w-8 bg-ink rounded-full">
                  <ArrowDown size={18} strokeWidth={3} className="text-white" />
                </span>
              </div>

              <div className="bg-cement-light border-[3px] border-iron-dark shadow-hard-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center justify-center h-8 w-8 bg-pine border-2 border-iron-dark shrink-0">
                    <Wrench size={18} strokeWidth={2.5} className="text-white" />
                  </span>
                  <span className="text-sm font-black uppercase tracking-widest text-pine">
                    Die Lösung
                  </span>
                </div>
                <p className="text-sm sm:text-base font-medium leading-[145%] text-iron-dark">
                  {system.solutionText}
                </p>
              </div>
            </div>

            {/* Collapsible history */}
            <div className="border-[3px] border-iron-dark bg-cement-light shadow-hard-sm">
              <button
                type="button"
                onClick={() => setShowHistory((v) => !v)}
                aria-expanded={showHistory}
                className="w-full flex items-center justify-between px-4 py-3 cursor-pointer"
              >
                <span className="text-sm font-mono font-black uppercase text-primary-red tracking-wider">
                  Historische Details
                </span>
                <ChevronDown
                  size={18}
                  strokeWidth={3}
                  className={`text-iron-dark transition-transform duration-150 ${showHistory ? 'rotate-180' : ''}`}
                />
              </button>
              {showHistory && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="px-4 pb-4 text-sm leading-relaxed text-neutral-600 font-normal border-t-2 border-iron-dark pt-3"
                >
                  {system.historyAndPurpose}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}

        {showTechDetails && (
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            {system.techStats.map((stat) => (
              <StatTile
                key={stat.label}
                icon={statIcon(stat.label)}
                label={stat.label}
                value={stat.value}
              />
            ))}

            <div className="col-span-2 bg-cement-sand border-[3px] border-iron-dark p-4 text-sm font-mono tracking-wide leading-relaxed font-bold text-neutral-600">
              HINWEIS: Alle Toleranz-Angaben basieren auf den Originalzeichnungen und Archivbeständen der Furka-Oberalp-Bahngesellschaft aus dem späten 19. Jahrhundert.
            </div>
          </motion.div>
        )}
      </main>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-cement-sand border-t-[3px] border-iron-dark p-4 z-20 flex justify-center">
        <div className="w-full max-w-2xl px-2">
          <Button
            variant="primary"
            className="w-full h-16 text-xl flex items-center justify-center gap-2"
            onClick={onStartQuiz}
          >
            <HelpCircle size={22} strokeWidth={3} />
            WISSEN TESTEN
          </Button>
        </div>
      </div>

      {/* Hotspot Modal */}
      <Modal
        isOpen={!!selectedHotspot}
        onClose={() => setSelectedHotspot(null)}
        title={selectedHotspot?.title || ''}
        subtitle="GEBAUT FÜR STEILSTRECKEN"
        footerAction={
          <button
            onClick={() => setSelectedHotspot(null)}
            className="px-5 py-2.5 bg-ink text-white font-mono text-sm uppercase font-extrabold tracking-wider transition-colors hover:bg-neutral-800"
          >
            INSPEKTION SCHLIESSEN
          </button>
        }
      >
        <p className="text-base sm:text-lg font-medium leading-[145%] text-iron-dark mb-4">
          {selectedHotspot?.description}
        </p>
      </Modal>
    </ScreenContainer>
  );
}
