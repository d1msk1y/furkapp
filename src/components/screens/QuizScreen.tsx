import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, AlertTriangle, RotateCcw, Award } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data';
import { QuizQuestion } from '../../types';
import ScreenContainer from '../layout/ScreenContainer';
import Header from '../layout/Header';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import IconBox from '../ui/IconBox';
import ProgressBar from '../ui/ProgressBar';

interface QuizScreenProps {
  readonly onGoBackToDashboard: () => void;
  readonly onQuizFinished: (score: number) => void;
}

export default function QuizScreen({ onGoBackToDashboard, onQuizFinished }: Readonly<QuizScreenProps>) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isFrozen, setIsFrozen] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [flashScreen, setFlashScreen] = useState(false);

  const currentQuestion: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleOptionClick = (optionIndex: number) => {
    if (isFrozen || quizComplete) return;

    setSelectedOptionIndex(optionIndex);
    setIsFrozen(true);

    const isCorrect = optionIndex === currentQuestion.correctOptionIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      setFlashScreen(true);
      setTimeout(() => {
        setFlashScreen(false);

        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < QUIZ_QUESTIONS.length) {
          setCurrentQuestionIndex(nextIndex);
          setSelectedOptionIndex(null);
          setIsFrozen(false);
        } else {
          setQuizComplete(true);
          onQuizFinished(score + (isCorrect ? 1 : 0));
        }
      }, 150);
    }, 900);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsFrozen(false);
    setScore(0);
    setQuizComplete(false);
  };

  const getOptionStyles = (index: number) => {
    const isSelected = selectedOptionIndex === index;
    const isCorrectTarget = index === currentQuestion.correctOptionIndex;

    let blockStyle = 'bg-white text-iron-dark border-iron-dark';
    let numStyle = 'text-neutral-400 group-hover:text-primary-red';

    if (isFrozen) {
      if (isSelected) {
        if (isCorrectTarget) {
          blockStyle = 'bg-iron-dark text-white border-2 border-white translate-x-[4px] translate-y-[4px] shadow-none';
          numStyle = 'text-primary-red';
        } else {
          blockStyle = 'bg-primary-red text-iron-dark translate-x-[4px] translate-y-[4px] shadow-none';
          numStyle = 'text-black';
        }
      } else if (isCorrectTarget) {
        blockStyle = 'bg-[#EBF7EE] text-green-800 border-green-700 animate-pulse border-dashed';
        numStyle = 'text-green-700';
      } else {
        blockStyle = 'bg-white text-neutral-400 border-neutral-300 shadow-none opacity-40';
        numStyle = 'text-neutral-300';
      }
    }

    return { blockStyle, numStyle };
  };

  return (
    <ScreenContainer
      className={`overflow-hidden transition-opacity duration-150 ${flashScreen ? 'opacity-20' : 'opacity-100'}`}
    >
      <Header title="WISSENS-CHECK" onBack={onGoBackToDashboard} backLabel="Zurück zur Übersicht" />

      {quizComplete ? (
        /* Results screen */
        <main className="flex-1 flex flex-col p-6 justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white border-heavy p-6 sm:p-8 shadow-hard text-center flex flex-col items-center relative"
          >
            <IconBox size="md" className="mb-6 border-2 border-white">
              <Award size={32} className="text-primary-red animate-pulse" />
            </IconBox>

            <h2 className="text-3xl font-black uppercase tracking-tight text-iron-dark mb-2 leading-none">
              PRÜFUNG BEENDET
            </h2>

            <Badge variant="light" className="mb-6 text-[10px] px-2.5 py-1">
              EXP_RESULT_LOG_M322
            </Badge>

            {/* Score block */}
            <div className="border-heavy-double bg-cement-light p-6 w-full max-w-xs shadow-hard-sm mb-6 flex flex-col items-center justify-center">
              <span className="block text-xs font-mono font-black text-neutral-500 uppercase">
                IHRE PUNKTZAHL
              </span>
              <span className="block text-6xl font-black text-primary-red tracking-tighter mt-1 mb-1">
                {score} / 5
              </span>
              <span
                className="block text-[11px] font-black text-iron-dark tracking-widest uppercase font-mono bg-white border-2 border-iron-dark px-3 py-1 mt-2"
                style={{ boxShadow: '2px 2px 0px #0D0D0D' }}
              >
                {Math.round((score / 5) * 100)}% RICHTIG
              </span>
            </div>

            <p className="text-sm font-bold tracking-tight uppercase leading-[140%] text-neutral-700 mb-8 max-w-xs">
              {score === 5 && 'AUSGEZEICHNET! SIE SIND EIN GESTANDENER EXPERTE DER SCHWEIZERISCHEN BERGBAHNMECHANIK.'}
              {score >= 3 && score < 5 && 'GUT BESTANDEN! SOLIDES TECHNISCHES FACHWISSEN IST EINDEUTIG VORHANDEN.'}
              {score < 3 && 'PRÜFUNG LEIDER NICHT BESTANDEN. TEXTE UND COGWHEEL-SCHEMATA ERNEUT DURCHLESEN!'}
            </p>

            {/* Action buttons */}
            <div className="w-full flex flex-col gap-3">
              <Button variant="secondary" className="w-full h-14 text-lg flex items-center justify-center gap-2" onClick={handleRestart}>
                <RotateCcw size={18} strokeWidth={3} />
                PRÜFUNG ERNEUT VERSUCHEN
              </Button>

              <Button variant="ghost" className="w-full h-14 text-lg flex items-center justify-center" onClick={onGoBackToDashboard}>
                ZUR SYSTEM-AUSWAHL
              </Button>
            </div>
          </motion.div>
        </main>
      ) : (
        <main className="flex-1 flex flex-col w-full relative pb-6 justify-between">
          {/* Progress + Question */}
          <div className="flex flex-col p-6 pb-2">
            <ProgressBar total={QUIZ_QUESTIONS.length} current={currentQuestionIndex} />

            <div className="text-right font-mono text-[9px] font-black uppercase text-neutral-400 mb-2 mt-8">
              PRÜFUNGSFRAGE {currentQuestionIndex + 1} VON {QUIZ_QUESTIONS.length}
            </div>

            {/* Question banner */}
            <Card shadow="sm" className="flex items-center justify-center min-h-40 p-5 relative bg-cement-light">
              <h2 className="font-sans font-black text-2xl sm:text-3xl leading-[1.1] text-center uppercase tracking-tight text-iron-dark overflow-wrap-break-word">
                {currentQuestion.question}
              </h2>
              <div className="absolute -top-3.5 -left-3 px-2 py-0.5 bg-iron-dark text-white font-mono text-[8px] tracking-wider uppercase border border-white">
                EXAM_SYS_M322
              </div>
            </Card>
          </div>

          {/* Answer options */}
          <div className={`flex flex-col gap-4 px-6 pb-6 w-full ${isFrozen ? 'pointer-events-none' : ''}`}>
            {currentQuestion.options.map((option, index) => {
              const labelNum = `0${index + 1}`;
              const { blockStyle, numStyle } = getOptionStyles(index);
              const isSelected = selectedOptionIndex === index;
              const isCorrectTarget = index === currentQuestion.correctOptionIndex;

              return (
                <button
                  key={option}
                  onClick={() => handleOptionClick(index)}
                  disabled={isFrozen}
                  aria-label={`Auswahl ${index + 1}: ${option}`}
                  className={`group relative flex items-center w-full h-19 sm:h-21 text-left px-5 cursor-pointer border-[3px] transition-all duration-75 ${blockStyle} ${
                    isFrozen ? '' : 'shadow-hard active:translate-x-1 active:translate-y-1 active:shadow-none bg-white hover:border-primary-red'
                  }`}
                >
                  <span className={`font-mono font-black text-lg sm:text-xl mr-5 shrink-0 transition-colors ${numStyle}`}>
                    {labelNum}
                  </span>
                  <span className="font-sans font-black text-sm sm:text-base tracking-wide uppercase truncate">
                    {option}
                  </span>

                  {isFrozen && isSelected && (
                    <div className="absolute right-5 shrink-0">
                      {isCorrectTarget ? (
                        <div className="bg-white text-iron-dark border-2 border-iron-dark p-1 rounded-sm">
                          <Check size={16} strokeWidth={3} className="text-green-600" />
                        </div>
                      ) : (
                        <div className="bg-white border-2 border-iron-dark p-1 rounded-sm">
                          <AlertTriangle size={16} strokeWidth={3} className="text-primary-red animate-bounce" />
                        </div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Evaluation hint */}
          <div className="h-6 px-6 font-mono text-center text-[10px] text-neutral-400 uppercase font-bold">
            {isFrozen && 'Evaluierung läuft... Bereite Folgeschritt vor.'}
          </div>
        </main>
      )}
    </ScreenContainer>
  );
}
