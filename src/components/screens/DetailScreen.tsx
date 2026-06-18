import { useState, useEffect } from 'react';
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
import { ZahnradSystem, Hotspot, SystemId } from '../../types';
import ScreenContainer from '../layout/ScreenContainer';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import InclineGauge from '../ui/InclineGauge';
import StatTile from '../ui/StatTile';
import SystemBlueprint from '../diagrams/SystemBlueprint';
import { useLanguage } from '../../features/i18n/useLanguage';
import { useChildMode } from '../../features/childMode/useChildMode';
import { useScreenReader, speakText, extractAccessibleText } from '../../features/accessibility/useScreenReader';

function statIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes('steigung') || l.includes('gradient') || l.includes('pente')) return <TrendingUp size={16} strokeWidth={2.5} />;
  if (l.includes('teilung') || l.includes('pitch') || l.includes('pas')) return <Ruler size={16} strokeWidth={2.5} />;
  if (l.includes('material') || l.includes('matériau')) return <Layers size={16} strokeWidth={2.5} />;
  if (l.includes('spur') || l.includes('gauge') || l.includes('écartement')) return <MoveHorizontal size={16} strokeWidth={2.5} />;
  return <Info size={16} strokeWidth={2.5} />;
}

interface DetailScreenProps {
  readonly system: ZahnradSystem;
  readonly onBackToDashboard: () => void;
  readonly onStartQuiz: (systemId: SystemId) => void;
}

export default function DetailScreen({ system, onBackToDashboard, onStartQuiz }: Readonly<DetailScreenProps>) {
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const { t, language } = useLanguage();
  const { isChildMode } = useChildMode();
  const { isScreenReaderEnabled } = useScreenReader();

  useEffect(() => {
    if (!isScreenReaderEnabled) return;
    if (showTechDetails) {
      setTimeout(() => {
        const el = document.getElementById('tech-details-container');
        if (el) speakText(extractAccessibleText(el), language);
      }, 300);
    }
  }, [showTechDetails, isScreenReaderEnabled, language]);

  useEffect(() => {
    if (!isScreenReaderEnabled) return;
    if (showHistory) {
      setTimeout(() => {
        const el = document.getElementById('history-details-container');
        if (el) speakText(extractAccessibleText(el), language);
      }, 300);
    }
  }, [showHistory, isScreenReaderEnabled, language]);

  useEffect(() => {
    if (!isScreenReaderEnabled) return;
    if (selectedHotspot) {
      setTimeout(() => {
        const title = t(`systems.${system.id}.hotspots.${selectedHotspot.id}_title`);
        const desc = t(`systems.${system.id}.hotspots.${selectedHotspot.id}_desc`);
        speakText(`${title}. ... ${desc}`, language);
      }, 300);
    }
  }, [selectedHotspot, isScreenReaderEnabled, language, system.id, t]);

  // In child mode, use simplified text from child_mode namespace; otherwise use normal system text
  const txt = (field: string) =>
    isChildMode
      ? t(`child_mode.systems.${system.id}.${field}`)
      : t(`systems.${system.id}.${field}`);

  const STAT_KEYS = ['max_gradient', 'tooth_pitch', 'rack_material', 'gauge'] as const;

  return (
    <ScreenContainer className="overflow-x-hidden relative pb-28">
      {/* Title Block */}
      <section className="bg-cement-light p-6 border-b-[3px] border-iron-dark">
        <div className="flex items-start gap-4">
          <Button
            variant="icon"
            size="sm"
            onClick={onBackToDashboard}
            aria-label={t('detail.back_label')}
            className="shrink-0"
          >
            <ChevronLeft size={22} strokeWidth={3} className="text-iron-dark" />
          </Button>
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-iron-dark leading-none">
              {t(`systems.${system.id}.name`)}
            </h2>
            <p className="text-sm font-mono font-bold uppercase tracking-widest text-primary-red mt-1">
              {t(`systems.${system.id}.type`).toUpperCase()}
            </p>
          </div>
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

      {/* Toggle Bar – hidden in child mode */}
      {!isChildMode && (
        <section
          className="bg-cement-sand border-b-[3px] border-iron-dark p-4 sticky top-0 z-10 flex justify-between items-center cursor-pointer"
          onClick={() => setShowTechDetails(!showTechDetails)}
        >
          <span className="text-sm font-black uppercase tracking-wider text-iron-dark flex items-center gap-1.5">
            <Info size={16} className="text-primary-red" />
            {t('detail.show_tech')}
          </span>

          <div className="relative inline-block w-16 h-8 align-middle select-none">
            <input
              type="checkbox"
              name="toggle"
              id="tech-toggle"
              checked={showTechDetails}
              onChange={(e) => setShowTechDetails(e.target.checked)}
              onClick={(e) => e.stopPropagation()}
              className="absolute block w-8 h-8 rounded-none border-[3px] border-iron-dark bg-cement-light appearance-none cursor-pointer z-20 checked:translate-x-6.5 transition-transform duration-100 ease-out"
            />
            <label
              htmlFor="tech-toggle"
              aria-label={t('detail.show_tech')}
              onClick={(e) => e.stopPropagation()}
              className={`block overflow-hidden h-8 rounded-none border-[3px] border-iron-dark cursor-pointer transition-colors duration-100 ${showTechDetails ? 'bg-ink' : 'bg-cement-light'
                }`}
            />
          </div>
        </section>
      )}

      {/* Content Area */}
      <main className="grow bg-cement-sand p-6">
        {(!showTechDetails || isChildMode) && (
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Child mode badge */}
            {isChildMode && (
              <Badge variant="pine" className="px-2.5 py-1 text-[11px]">
                {t('child_mode.badge')}
              </Badge>
            )}

            {/* Lead sentence */}
            <p className={`font-bold leading-[140%] text-iron-dark ${isChildMode ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
              {txt('explanationShort')}
            </p>

            {/* Visual Gefahr -> Lösung panel */}
            <div className="space-y-3">
              <div className="bg-cement-light border-[3px] border-iron-dark shadow-hard-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center justify-center h-8 w-8 bg-primary-red border-2 border-iron-dark shrink-0">
                    <AlertTriangle size={18} strokeWidth={2.5} className="text-white" />
                  </span>
                  <span className="text-sm font-black uppercase tracking-widest text-primary-red">
                    {isChildMode ? t('child_mode.detail_danger_label') : t('detail.danger_label')}
                  </span>
                </div>
                <p className={`font-medium leading-[145%] text-iron-dark ${isChildMode ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
                  {txt('steepDangerText')}
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
                    {isChildMode ? t('child_mode.detail_solution_label') : t('detail.solution_label')}
                  </span>
                </div>
                <p className={`font-medium leading-[145%] text-iron-dark ${isChildMode ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
                  {txt('solutionText')}
                </p>
              </div>
            </div>

            {/* Collapsible history – hidden in child mode */}
            {!isChildMode && (
              <div className="border-[3px] border-iron-dark bg-cement-light shadow-hard-sm">
                <button
                  type="button"
                  onClick={() => setShowHistory((v) => !v)}
                  aria-expanded={showHistory}
                  className="w-full flex items-center justify-between px-4 py-3 cursor-pointer"
                >
                  <span className="text-sm font-mono font-black uppercase text-primary-red tracking-wider">
                    {t('detail.history_label')}
                  </span>
                  <ChevronDown
                    size={18}
                    strokeWidth={3}
                    className={`text-iron-dark transition-transform duration-150 ${showHistory ? 'rotate-180' : ''}`}
                  />
                </button>
                {showHistory && (
                  <motion.p
                    id="history-details-container"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-4 pb-4 text-sm leading-relaxed text-neutral-600 font-normal border-t-2 border-iron-dark pt-3"
                  >
                    {t(`systems.${system.id}.historyAndPurpose`)}
                  </motion.p>
                )}
              </div>
            )}
          </motion.div>
        )}

        {showTechDetails && (
          <motion.div
            id="tech-details-container"
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            {system.techStats.map((stat, i) => {
              const statKey = STAT_KEYS[i] ?? 'max_gradient';
              const label = t(`systems.${system.id}.stats.${statKey}`);
              const value = t(`systems.${system.id}.stats.${statKey}_value`);
              return (
                <StatTile
                  key={stat.label}
                  icon={statIcon(label)}
                  label={label}
                  value={value}
                />
              );
            })}

            <div className="col-span-2 bg-cement-sand border-[3px] border-iron-dark p-4 text-sm font-mono tracking-wide leading-relaxed font-bold text-neutral-600">
              {t('detail.stats_note')}
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
            onClick={() => onStartQuiz(system.id)}
          >
            <HelpCircle size={22} strokeWidth={3} />
            {t('detail.quiz_cta')}
          </Button>
        </div>
      </div>

      {/* Hotspot Modal */}
      <Modal
        isOpen={!!selectedHotspot}
        onClose={() => setSelectedHotspot(null)}
        title={selectedHotspot ? t(`systems.${system.id}.hotspots.${selectedHotspot.id}_title`) : ''}
        subtitle="BUILT FOR STEEP ROUTES"
        footerAction={
          <button
            onClick={() => setSelectedHotspot(null)}
            className="px-5 py-2.5 bg-ink text-white font-mono text-sm uppercase font-extrabold tracking-wider transition-colors hover:bg-neutral-800"
          >
            {t('common.close')}
          </button>
        }
      >
        <p className="text-base sm:text-lg font-medium leading-[145%] text-iron-dark mb-4">
          {selectedHotspot ? t(`systems.${system.id}.hotspots.${selectedHotspot.id}_desc`) : ''}
        </p>
      </Modal>
    </ScreenContainer>
  );
}
