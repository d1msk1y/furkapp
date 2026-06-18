import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, AlertTriangle, RotateCcw, Award } from 'lucide-react';
import { SYSTEM_QUIZ_QUESTIONS, QUESTIONS_PER_SYSTEM, ACHIEVEMENT_THRESHOLD } from '../../data';
import { QuizQuestion, SystemId } from '../../types';
import ScreenContainer from '../layout/ScreenContainer';
import Header from '../layout/Header';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import IconBox from '../ui/IconBox';
import ProgressBar from '../ui/ProgressBar';
import Ridgeline from '../diagrams/Ridgeline';
import { useLanguage } from '../../features/i18n/useLanguage';
import { useChildMode } from '../../features/childMode/useChildMode';

interface QuizScreenProps {
  readonly systemId: SystemId;
  readonly onGoBackToDashboard: () => void;
  readonly onQuizFinished: (systemId: SystemId, score: number) => void;
}

export default function QuizScreen({ systemId, onGoBackToDashboard, onQuizFinished }: Readonly<QuizScreenProps>) {
  const questions = SYSTEM_QUIZ_QUESTIONS[systemId];
  const totalQuestions = questions.length;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isFrozen, setIsFrozen] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [flashScreen, setFlashScreen] = useState(false);
  const { t } = useLanguage();
  const { isChildMode } = useChildMode();

  const rawQuestion: QuizQuestion = questions[currentQuestionIndex];
  const qKey = `q${rawQuestion.id}`;
  const quizNs = isChildMode ? `child_mode.system_quiz.${systemId}` : `system_quiz.${systemId}`;
  const currentQuestion = {
    ...rawQuestion,
    question: t(`${quizNs}.${qKey}.question`),
    options: (t(`${quizNs}.${qKey}.options`, { returnObjects: true }) as string[]),
    explanation: t(`${quizNs}.${qKey}.explanation`),
  };

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
        if (nextIndex < totalQuestions) {
          setCurrentQuestionIndex(nextIndex);
          setSelectedOptionIndex(null);
          setIsFrozen(false);
        } else {
          setQuizComplete(true);
          onQuizFinished(systemId, score + (isCorrect ? 1 : 0));
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

    let blockStyle = 'bg-cement-light text-iron-dark border-iron-dark';
    let numStyle = 'text-neutral-400 group-hover:text-primary-red';

    if (isFrozen) {
      if (isSelected) {
        if (isCorrectTarget) {
          blockStyle = 'bg-ink text-white border-2 border-cement-light translate-x-[4px] translate-y-[4px] shadow-none';
          numStyle = 'text-primary-red';
        } else {
          blockStyle = 'bg-primary-red text-iron-dark translate-x-[4px] translate-y-[4px] shadow-none';
          numStyle = 'text-black';
        }
      } else if (isCorrectTarget) {
        blockStyle = 'bg-[#EBF7EE] text-green-800 border-green-700 animate-pulse border-dashed';
        numStyle = 'text-green-700';
      } else {
        blockStyle = 'bg-cement-light text-neutral-400 border-neutral-300 shadow-none opacity-40';
        numStyle = 'text-neutral-300';
      }
    }

    return { blockStyle, numStyle };
  };

  const earnedUnit = score >= ACHIEVEMENT_THRESHOLD;

  return (
    <ScreenContainer
      className={`overflow-hidden transition-opacity duration-150 ${flashScreen ? 'opacity-20' : 'opacity-100'}`}
    >
      <Header
        title={`${t(`systems.${systemId}.name`).toUpperCase()} — ${t('quiz.title')}`}
        onBack={onGoBackToDashboard}
        backLabel={t('quiz.back_label')}
      />

      {quizComplete ? (
        /* Results screen */
        <main className="flex-1 flex flex-col p-6 justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-cement-light border-heavy p-6 sm:p-8 shadow-hard text-center flex flex-col items-center relative overflow-hidden"
          >
            {/* Alpine summit accent */}
            <Ridgeline
              className={`${score >= ACHIEVEMENT_THRESHOLD ? 'text-pine' : 'text-primary-red'} -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 w-[calc(100%+3rem)] sm:w-[calc(100%+4rem)] mb-6`}
              height={36}
              flip
            />

            <IconBox size="md" className="mb-6 border-2 border-cement-sand">
              <Award size={32} className="text-primary-red animate-pulse" />
            </IconBox>

            <h2 className="text-3xl font-black uppercase tracking-tight text-iron-dark mb-2 leading-none">
              {t('quiz.result_title')}
            </h2>

            <Badge variant="light" className="mb-6 px-2.5 py-1">
              {t(`systems.${systemId}.name`).toUpperCase()}
            </Badge>

            {/* Score block */}
            <div className="border-heavy-double bg-cement-light p-6 w-full max-w-xs shadow-hard-sm mb-4 flex flex-col items-center justify-center">
              <span className="block text-sm font-mono font-black text-neutral-500 uppercase">
                {t('quiz.result_score', { score, total: QUESTIONS_PER_SYSTEM })}
              </span>
              <span className="block text-6xl font-black text-primary-red tracking-tighter mt-1 mb-1">
                {score} / {QUESTIONS_PER_SYSTEM}
              </span>
              <span
                className="block text-sm font-black text-iron-dark tracking-widest uppercase font-mono bg-cement-sand border-2 border-iron-dark px-3 py-1 mt-2"
                style={{ boxShadow: '2px 2px 0px var(--app-shadow-color)' }}
              >
                {Math.round((score / QUESTIONS_PER_SYSTEM) * 100)}%
              </span>
            </div>

            {/* Achievement feedback */}
            <div className={`w-full max-w-xs px-4 py-2.5 mb-4 text-center font-mono text-sm font-black uppercase border-2 ${
              earnedUnit
                ? 'bg-pine text-white border-pine-light'
                : 'bg-cement-sand text-neutral-500 border-neutral-300'
            }`}>
              {earnedUnit ? t('quiz.result_achievement_earned') : t('quiz.result_achievement_missed')}
            </div>

            <p className="text-sm font-bold tracking-tight uppercase leading-[140%] text-neutral-700 mb-8 max-w-xs">
              {score === QUESTIONS_PER_SYSTEM && t('quiz.result_perfect')}
              {score >= ACHIEVEMENT_THRESHOLD && score < QUESTIONS_PER_SYSTEM && t('quiz.result_good')}
              {score < ACHIEVEMENT_THRESHOLD && t('quiz.result_ok')}
            </p>

            {/* Action buttons */}
            <div className="w-full flex flex-col gap-3">
              <Button variant="secondary" className="w-full h-14 text-lg flex items-center justify-center gap-2" onClick={handleRestart}>
                <RotateCcw size={18} strokeWidth={3} />
                {t('quiz.restart_button')}
              </Button>

              <Button variant="ghost" className="w-full h-14 text-lg flex items-center justify-center" onClick={onGoBackToDashboard}>
                {t('quiz.back_to_dashboard')}
              </Button>
            </div>
          </motion.div>
        </main>
      ) : (
        <main className="flex-1 flex flex-col w-full relative pb-6 justify-between">
          {/* Progress + Question */}
          <div className="flex flex-col p-6 pb-2">
            <ProgressBar total={totalQuestions} current={currentQuestionIndex} />

            <div className="text-right font-mono text-xs font-black uppercase text-neutral-400 mb-2 mt-8">
              {t('quiz.question_label', { current: currentQuestionIndex + 1, total: totalQuestions })}
            </div>

            {/* Question banner */}
            <Card shadow="sm" className="flex items-center justify-center min-h-40 p-5 relative bg-cement-light">
              <h2 className="font-heading font-black text-2xl sm:text-3xl leading-[1.1] text-center uppercase tracking-tight text-iron-dark overflow-wrap-break-word">
                {currentQuestion.question}
              </h2>
              <div className="absolute -top-3.5 -left-3 px-2 py-0.5 bg-ink text-white font-mono text-[11px] tracking-wider uppercase border border-white">
                {t(`systems.${systemId}.name`).toUpperCase()}
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
                  className={`group relative flex items-center w-full min-h-[4.75rem] sm:min-h-[5.25rem] py-3 text-left px-5 cursor-pointer border-[3px] transition-all duration-75 ${blockStyle} ${
                    isFrozen ? '' : 'shadow-hard active:translate-x-1 active:translate-y-1 active:shadow-none bg-cement-light hover:border-primary-red'
                  }`}
                >
                  <span className={`font-mono font-black text-lg sm:text-xl mr-5 shrink-0 transition-colors ${numStyle}`}>
                    {labelNum}
                  </span>
                  <span className="font-heading font-black text-base tracking-wide uppercase pr-10">
                    {option}
                  </span>

                  {isFrozen && isSelected && (
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 shrink-0">
                      {isCorrectTarget ? (
                        <div className="bg-cement-light text-iron-dark border-2 border-iron-dark p-1 rounded-sm">
                          <Check size={16} strokeWidth={3} className="text-green-600" />
                        </div>
                      ) : (
                        <div className="bg-cement-light border-2 border-iron-dark p-1 rounded-sm">
                          <AlertTriangle size={16} strokeWidth={3} className="text-primary-red animate-bounce" />
                        </div>
                      )}
                    </div>
                  )}                </button>
              );
            })}
          </div>

          {/* Evaluation hint */}
          <div className="h-8 px-6 font-mono text-center text-sm text-neutral-400 uppercase font-bold flex items-center justify-center">
            {isFrozen && t('quiz.evaluating')}
          </div>
        </main>
      )}
    </ScreenContainer>
  );
}
