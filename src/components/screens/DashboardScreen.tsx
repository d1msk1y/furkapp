import { useState } from 'react';
import { ArrowRight, BookOpen, Trophy, RefreshCw } from 'lucide-react';
import { SYSTEM_DATA } from '../../data';
import { ZahnradSystem } from '../../types';
import ScreenContainer from '../layout/ScreenContainer';
import Header from '../layout/Header';
import StatusBar from '../layout/StatusBar';
import Button from '../ui/Button';

interface DashboardScreenProps {
  readonly onSelectSystem: (id: ZahnradSystem['id']) => void;
  readonly onGoBackToIntro: () => void;
  readonly onStartQuiz: () => void;
  readonly onSimulateError: () => void;
  readonly quizHighScore: number | null;
}

export default function DashboardScreen({
  onSelectSystem,
  onGoBackToIntro,
  onStartQuiz,
  onSimulateError,
  quizHighScore,
}: Readonly<DashboardScreenProps>) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

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
        {/* Header with error simulation button */}
        <Header
          title="DIE 5 ZAHNRADSYSTEME"
          onBack={onGoBackToIntro}
          backLabel="Zurück zur Startseite"
          rightAction={
            <Button
              variant="icon"
              size="sm"
              onClick={onSimulateError}
              title="Signalunterbruch simulieren"
              className="text-primary-red"
            >
              <RefreshCw size={18} strokeWidth={3} className="animate-spin" style={{ animationDuration: '4s' }} />
            </Button>
          }
          className="p-5"
        />

        {/* Status bar */}
        <StatusBar
          label="EXPOSITION FURKA-OBERALP-BAHN"
          status={
            <>
              <span className="w-2 h-2 rounded-full bg-green-600 animate-ping" />{' '}
              SYS: VERBUNDEN
            </>
          }
        />

        {/* System cards */}
        <main className="flex-1 w-full flex flex-col">
          {SYSTEM_DATA.map((system, index) => {
            const isAlternateBg = index % 2 === 1;
            const isFlashing = activeCardId === system.id;

            const getCardBg = () => {
              if (isFlashing) return 'bg-primary-red text-white';
              if (isAlternateBg) return 'bg-[#F2F2ED] hover:bg-[#eaeae4]';
              return 'bg-white hover:bg-[#F9F9F7]';
            };

            return (
              <button
                key={system.id}
                type="button"
                onClick={() => handleCardClick(system.id)}
                className={`flex items-center justify-between w-full h-30 transition-all duration-75 select-none cursor-pointer border-b-[3px] border-iron-dark px-6 sm:px-8 ${getCardBg()}`}
              >
                <div className="flex flex-col truncate mr-4 text-left">
                  <h3 className="text-[32px] sm:text-[38px] font-black uppercase tracking-tight leading-none">
                    {system.id === 'von_roll' ? 'VON ROLL' : system.id.toUpperCase()}
                  </h3>
                  <span
                    className={`text-[10px] sm:text-xs font-mono uppercase tracking-wider font-extrabold mt-1.5 ${
                      isFlashing ? 'text-white/85' : 'text-neutral-500'
                    }`}
                  >
                    {system.type} • {system.developed}
                  </span>
                </div>

                <div
                  className={`shrink-0 h-16 w-16 flex items-center justify-center border-heavy rounded-sm transition-all duration-75 ${
                    isFlashing
                      ? 'bg-white shadow-none translate-x-1 translate-y-1'
                      : 'bg-white shadow-[4px_4px_0px_#0D0D0D]'
                  }`}
                >
                  <ArrowRight size={32} strokeWidth={3} className="text-primary-red" />
                </div>
              </button>
            );
          })}
        </main>
      </div>

      {/* Quiz launch footer */}
      <footer className="p-6 bg-iron-dark border-t-[3px] border-iron-dark flex flex-col gap-4">
        {quizHighScore !== null && (
          <div className="flex items-center justify-between border-2 border-primary-red bg-neutral-900 px-4 py-2 text-white font-mono text-xs uppercase">
            <span className="flex items-center gap-2">
              <Trophy size={14} className="text-primary-red" />
              Letzte Prüfung
            </span>
            <span className="font-extrabold">{quizHighScore} / 5 RICHTIG</span>
          </div>
        )}

        <Button
          variant="cta"
          className="bg-white text-iron-dark hover:bg-cement-light border-white"
          shadowColor="#f22b0d"
          onClick={onStartQuiz}
        >
          <span className="flex items-center gap-2">
            <BookOpen size={24} strokeWidth={3} className="text-primary-red" />
            WISSENS-CHECK
          </span>
          <ArrowRight size={26} strokeWidth={3} />
        </Button>
      </footer>
    </ScreenContainer>
  );
}
