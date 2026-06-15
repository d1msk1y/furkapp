import { motion } from 'motion/react';
import { Trophy, ArrowRight, Lock, CheckCircle, Star } from 'lucide-react';
import { SYSTEM_DATA, PRIZES, QUESTIONS_PER_SYSTEM } from '../../data';
import { AchievementProgress, SystemId } from '../../types';
import ScreenContainer from '../layout/ScreenContainer';
import Header from '../layout/Header';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import IconBox from '../ui/IconBox';
import SystemIcon from '../ui/SystemIcon';
import Ridgeline from '../diagrams/Ridgeline';
import { useLanguage } from '../../features/i18n/useLanguage';

interface AchievementsScreenProps {
  readonly progress: AchievementProgress;
  readonly totalUnits: number;
  readonly onBack: () => void;
  readonly onStartQuiz: (systemId: SystemId) => void;
}

export default function AchievementsScreen({
  progress,
  totalUnits,
  onBack,
  onStartQuiz,
}: Readonly<AchievementsScreenProps>) {
  const { t } = useLanguage();

  return (
    <ScreenContainer className="pb-6">
      <Header title={t('achievements.title')} onBack={onBack} backLabel={t('achievements.back_label')} />

      <main className="flex-1 flex flex-col">
        {/* Hero unit counter */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-ink p-6 border-b-[3px] border-iron-dark flex flex-col items-center relative overflow-hidden"
        >
          <Ridgeline
            className={`${totalUnits >= 3 ? 'text-pine' : 'text-primary-red'} -mx-6 -mt-6 w-[calc(100%+3rem)] mb-4 opacity-40`}
            height={28}
            flip
          />

          <IconBox size="md" className="mb-4 border-2 border-neutral-700 bg-neutral-900">
            <Trophy size={32} className={totalUnits >= 5 ? 'text-amber-400 animate-pulse' : 'text-primary-red'} />
          </IconBox>

          <span className="text-5xl font-black text-white tracking-tighter">
            {totalUnits} / {SYSTEM_DATA.length}
          </span>

          <Badge variant="dark" className="mt-3 px-3 py-1.5 bg-neutral-800 border border-neutral-600 text-neutral-300">
            {t('achievements.total_units', { count: totalUnits, total: SYSTEM_DATA.length })}
          </Badge>

          {/* Mini progress dots */}
          <div className="flex gap-2 mt-4">
            {SYSTEM_DATA.map((sys) => (
              <div
                key={sys.id}
                className={`w-8 h-3 border-2 transition-colors ${
                  progress[sys.id].earned
                    ? 'bg-pine border-pine-light'
                    : 'bg-neutral-800 border-neutral-600'
                }`}
              />
            ))}
          </div>
        </motion.section>

        {/* Per-system progress cards */}
        <section className="flex flex-col">
          {SYSTEM_DATA.map((system, index) => {
            const sysProgress = progress[system.id];
            const hasAttempted = sysProgress.bestScore > 0;
            const isAlternateBg = index % 2 === 1;

            return (
              <button
                key={system.id}
                type="button"
                onClick={() => onStartQuiz(system.id)}
                className={`flex items-center w-full border-b-[3px] border-iron-dark px-4 sm:px-6 py-4 gap-3 transition-colors cursor-pointer ${
                  isAlternateBg ? 'bg-cement-sand hover:bg-cement-light' : 'bg-cement-light hover:bg-cement-sand'
                }`}
              >
                {/* System icon */}
                <div
                  className={`shrink-0 h-12 w-12 flex items-center justify-center border-heavy-sm rounded-sm ${
                    sysProgress.earned ? 'bg-pine text-white' : 'bg-cement-sand text-iron-dark'
                  }`}
                >
                  {sysProgress.earned ? (
                    <CheckCircle size={22} strokeWidth={2.5} className="text-white" />
                  ) : (
                    <SystemIcon iconKey={system.iconKey} size={22} strokeWidth={2.5} />
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 text-left min-w-0">
                  <h3 className="text-lg font-black uppercase tracking-tight leading-none truncate text-iron-dark">
                    {t(`systems.${system.id}.name`)}
                  </h3>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider mt-1 text-slate-stone">
                    {hasAttempted
                      ? t('achievements.best_score', { score: sysProgress.bestScore, total: QUESTIONS_PER_SYSTEM })
                      : t('achievements.not_attempted')}
                  </span>
                </div>

                {/* Status badge */}
                <div className="shrink-0">
                  {sysProgress.earned ? (
                    <Badge variant="pine" className="px-2 py-1">
                      <Star size={10} strokeWidth={2.5} />
                      {t('achievements.earned')}
                    </Badge>
                  ) : (
                    <Badge variant="light" className="px-2 py-1">
                      {t('achievements.start_quiz')}
                    </Badge>
                  )}
                </div>

                <div className="shrink-0 h-10 w-10 flex items-center justify-center border-heavy-sm rounded-sm bg-cement-light shadow-hard-sm">
                  <ArrowRight size={20} strokeWidth={3} className="text-primary-red" />
                </div>
              </button>
            );
          })}
        </section>

        {/* Prizes section */}
        <section className="p-6 bg-cement-sand">
          <h3 className="text-sm font-mono font-black uppercase tracking-widest text-primary-red mb-4 flex items-center gap-2">
            <Trophy size={14} strokeWidth={2.5} />
            {t('achievements.prizes_title')}
          </h3>

          <div className="flex flex-col gap-4">
            {PRIZES.map((prize) => {
              const isUnlocked = totalUnits >= prize.requiredUnits;

              return (
                <motion.div
                  key={prize.requiredUnits}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prize.requiredUnits * 0.08 }}
                >
                  <Card
                    shadow={isUnlocked ? 'md' : 'none'}
                    className={`p-4 flex items-center gap-4 transition-all ${
                      isUnlocked
                        ? 'border-pine bg-cement-light'
                        : 'opacity-50 border-neutral-300 bg-cement-sand'
                    }`}
                  >
                    {/* Prize icon */}
                    <div
                      className={`shrink-0 h-14 w-14 flex items-center justify-center border-heavy-sm rounded-sm text-2xl ${
                        isUnlocked ? 'bg-pine text-white' : 'bg-neutral-200 text-neutral-400'
                      }`}
                    >
                      {isUnlocked ? prize.icon : <Lock size={20} strokeWidth={2.5} />}
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-black text-base uppercase tracking-tight text-iron-dark leading-tight truncate">
                        {t(prize.nameKey)}
                      </span>
                      <span className="text-xs font-mono font-bold uppercase text-slate-stone mt-0.5">
                        {t('achievements.prize_units_required', { count: prize.requiredUnits })}
                      </span>
                      {isUnlocked && (
                        <p className="text-xs font-medium text-neutral-600 mt-1.5 leading-relaxed line-clamp-2">
                          {t(prize.descKey)}
                        </p>
                      )}
                    </div>

                    {isUnlocked && (
                      <Badge variant="pine" className="px-2 py-1 shrink-0">
                        <CheckCircle size={10} strokeWidth={2.5} />
                        {t('achievements.earned')}
                      </Badge>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
    </ScreenContainer>
  );
}
