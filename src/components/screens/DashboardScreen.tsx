import { ReactNode, useState } from 'react';
import { ArrowRight, Trophy, Mountain, Calendar } from 'lucide-react';
import { SYSTEM_DATA } from '../../data';
import { ZahnradSystem } from '../../types';
import ScreenContainer from '../layout/ScreenContainer';
import Header from '../layout/Header';
import Button from '../ui/Button';
import SystemIcon from '../ui/SystemIcon';
import InclineGauge from '../ui/InclineGauge';
import { useLanguage } from '../../features/i18n/useLanguage';
import { useChildMode } from '../../features/childMode/useChildMode';
import { AchievementProgress } from '../../types';

interface DashboardScreenProps {
  readonly onSelectSystem: (id: ZahnradSystem['id']) => void;
  readonly onGoBackToIntro: () => void;
  readonly onOpenAchievements: () => void;
  readonly totalUnits: number;
  readonly progress: AchievementProgress;
  readonly headerRightAction?: ReactNode;
}

export default function DashboardScreen({
  onSelectSystem,
  onGoBackToIntro,
  onOpenAchievements,
  totalUnits,
  progress,
  headerRightAction,
}: Readonly<DashboardScreenProps>) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const { t } = useLanguage();
  const { isChildMode } = useChildMode();

  const handleCardClick = (systemId: ZahnradSystem['id']) => {
    setActiveCardId(systemId);
    setTimeout(() => {
      setActiveCardId(null);
      onSelectSystem(systemId);
    }, 250);
  };

  return (
    <ScreenContainer>
      <div className="flex flex-col">
        {/* Header with optional right action */}
        <Header
          title={t('dashboard.title')}
          onBack={onGoBackToIntro}
          backLabel={t('dashboard.back_label')}
          rightAction={headerRightAction}
          className="p-5"
        />

        {/* System cards */}
        <main className="flex-1 w-full flex flex-col">
          {SYSTEM_DATA.map((system, index) => {
            const isAlternateBg = index % 2 === 1;
            const isFlashing = activeCardId === system.id;

            const getCardBg = () => {
              if (isFlashing) return 'bg-primary-red text-white';
              if (isAlternateBg) return 'bg-cement-sand hover:bg-cement-light';
              return 'bg-cement-light hover:bg-cement-sand';
            };

            return (
              <button
                key={system.id}
                type="button"
                onClick={() => handleCardClick(system.id)}
                className={`flex items-center justify-between w-full h-30 transition-all duration-75 select-none cursor-pointer border-b-[3px] border-iron-dark px-4 sm:px-6 gap-3 ${getCardBg()}`}
              >
                {/* Identity icon */}
                <div
                  className={`shrink-0 h-14 w-14 flex items-center justify-center border-heavy-sm rounded-sm transition-colors ${isFlashing ? 'bg-cement-light text-iron-dark' : 'bg-cement-sand text-iron-dark'
                    }`}
                >
                  <SystemIcon iconKey={system.iconKey} size={26} strokeWidth={2.5} />
                </div>

                {/* Name + tagline + line */}
                <div className="flex flex-col truncate flex-1 text-left">
                  <h3 className="text-[26px] sm:text-[32px] font-black uppercase tracking-tight leading-none truncate">
                    {system.id === 'von_roll' ? 'VON ROLL' : system.id.toUpperCase()}
                  </h3>
                  <span
                    className={`text-sm font-bold tracking-tight leading-tight truncate mt-1 ${isFlashing ? 'text-white' : 'text-iron-dark'
                      }`}
                  >
                    {isChildMode ? t(`child_mode.systems.${system.id}.tagline`) : t(`systems.${system.id}.tagline`)}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`text-xs font-mono uppercase tracking-wider font-extrabold mt-1 flex items-center gap-1 truncate ${isFlashing ? 'text-white/85' : 'text-slate-stone'
                      }`}
                  >
                    <Calendar size={10} strokeWidth={2.5} className={isFlashing ? 'text-white' : 'text-primary-red'} />
                    {system.developed}
                  </span>
                </div>

                {/* Incline gauge + gradient */}
                <div aria-hidden="true" className="flex flex-col items-center shrink-0">
                  <InclineGauge percent={system.maxGradientPercent} compact />
                  <span className={`text-sm font-black tracking-tight leading-none mt-0.5 ${isFlashing ? 'text-white' : 'text-primary-red'}`}>
                    {system.maxGradientPercent}%
                  </span>
                </div>

                <div
                  className={`shrink-0 h-12 w-12 flex items-center justify-center border-heavy rounded-sm transition-all duration-75 ${isFlashing
                    ? 'bg-cement-light shadow-none translate-x-1 translate-y-1'
                    : 'bg-cement-light shadow-hard'
                    }`}
                >
                  <ArrowRight size={26} strokeWidth={3} className="text-primary-red" />
                </div>
              </button>
            );
          })}
        </main>
      </div>

      {/* Achievements footer */}
      <footer className="p-6 bg-ink border-t-[3px] border-iron-dark flex flex-col gap-4">

        <Button
          variant="cta"
          className="bg-cement-light text-iron-dark hover:bg-cement-sand border-iron-dark"
          shadowColor="#f22b0d"
          onClick={onOpenAchievements}
        >
          <span className="flex items-center gap-2">
            <Trophy size={24} strokeWidth={3} className="text-primary-red" />
            {t('dashboard.achievements_cta')}
          </span>
          <ArrowRight size={26} strokeWidth={3} />
        </Button>
      </footer>
    </ScreenContainer>
  );
}
