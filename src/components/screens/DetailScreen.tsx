import { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Info } from 'lucide-react';
import { ZahnradSystem, Hotspot } from '../../types';
import ScreenContainer from '../layout/ScreenContainer';
import Header from '../layout/Header';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import SystemBlueprint from '../diagrams/SystemBlueprint';

interface DetailScreenProps {
  readonly system: ZahnradSystem;
  readonly onBackToDashboard: () => void;
  readonly onStartQuiz: () => void;
}

export default function DetailScreen({ system, onBackToDashboard, onStartQuiz }: Readonly<DetailScreenProps>) {
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  return (
    <ScreenContainer className="overflow-x-hidden relative pb-28">
      {/* Header */}
      <Header
        title="SYSTEM-DETAIL"
        onBack={onBackToDashboard}
        backLabel="Zurück zur Auswahl"
        sticky
        className="h-auto"
      />

      {/* Title Block */}
      <section className="bg-white p-6 border-b-[3px] border-iron-dark">
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-iron-dark">
          {system.name}
        </h2>
        <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-primary-red mt-2.5">
          ENTWICKELT {system.developed} • {system.type.toUpperCase()}
        </p>
      </section>

      {/* Blueprint Diagram */}
      <SystemBlueprint
        systemId={system.id}
        hotspots={system.hotspots}
        onHotspotClick={setSelectedHotspot}
      />

      {/* Toggle Bar */}
      <section className="bg-[#E8E8E8] border-b-[3px] border-iron-dark p-4 sticky top-20.75 z-10 flex justify-between items-center">
        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-iron-dark flex items-center gap-1.5">
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
            className="absolute block w-8 h-8 rounded-none border-[3px] border-iron-dark bg-white appearance-none cursor-pointer z-20 checked:translate-x-6.5 transition-transform duration-100 ease-out"
          />
          <label
            htmlFor="tech-toggle"
            aria-label="Technische Details umschalten"
            className={`block overflow-hidden h-8 rounded-none border-[3px] border-iron-dark cursor-pointer transition-colors duration-100 ${
              showTechDetails ? 'bg-iron-dark' : 'bg-white'
            }`}
          />
        </div>
      </section>

      {/* Content Area */}
      <main className="grow bg-cement-sand p-6">
        {!showTechDetails && (
          <motion.div
            className="space-y-6 text-base sm:text-lg font-medium leading-[145%] text-iron-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <p className="first-letter:text-4xl first-letter:font-black first-letter:text-primary-red first-letter:mr-2 first-letter:float-left">
              {system.explanationShort}
            </p>

            <div className="border-l-[6px] border-iron-dark pl-4 py-2 bg-white/50 pr-2">
              <p className="text-md sm:text-lg font-bold leading-[140%] text-iron-dark italic">
                {system.steepDangerText}
              </p>
            </div>

            <p>{system.solutionText}</p>

            <Card shadow="sm" className="p-5">
              <span className="block text-xs font-mono font-bold uppercase text-primary-red mb-2 tracking-wider">
                HISTORISCHE ANALYSE M322
              </span>
              <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 font-normal">
                {system.historyAndPurpose}
              </p>
            </Card>
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
              <Card key={stat.label} className="p-4 flex flex-col justify-between h-28">
                <span className="block text-[10px] sm:text-xs font-mono font-black uppercase text-neutral-500 tracking-wider">
                  {stat.label}
                </span>
                <span className="block text-xl sm:text-2xl font-black uppercase text-primary-red tracking-tight leading-none mt-2">
                  {stat.value}
                </span>
              </Card>
            ))}

            <div className="col-span-2 bg-[#E8E8E8] border-[3px] border-iron-dark p-4 text-xs font-mono tracking-wide leading-relaxed font-bold text-neutral-600">
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
            className="px-5 py-2.5 bg-iron-dark text-white font-mono text-xs uppercase font-extrabold tracking-wider transition-colors hover:bg-neutral-800"
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
