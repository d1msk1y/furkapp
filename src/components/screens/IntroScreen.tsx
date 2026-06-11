import { motion } from 'motion/react';
import { ArrowRight, HardHat, Layers, TrendingUp, History } from 'lucide-react';
import ScreenContainer from '../layout/ScreenContainer';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Ridgeline from '../diagrams/Ridgeline';

interface IntroScreenProps {
  readonly onExplore: () => void;
  readonly onSimulateError: () => void;
}

export default function IntroScreen({ onExplore, onSimulateError }: Readonly<IntroScreenProps>) {
  return (
    <ScreenContainer className="overflow-x-hidden relative">

      <div className="flex-1 flex flex-col">
        {/* Hero Image */}
        <div className="w-full h-[40vh] bg-neutral-900 overflow-hidden relative border-b-[3px] border-iron-dark flex flex-col justify-end">
          <svg className="absolute inset-0 w-full h-full object-cover select-none" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#2c2c2a" />
            <path d="M-50 300 L250 120 L320 20 L450 0 L450 300 Z" fill="#141413" />
            <path d="M0 300 L300 120" stroke="#f22b0d" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" />
            <path d="M0 280 L320 100" stroke="#f8f6f5" strokeWidth="1" strokeDasharray="3,3" opacity="0.2" />
            <path d="M0 260 L340 80" stroke="#f8f6f5" strokeWidth="1" strokeDasharray="3,3" opacity="0.1" />
            <circle cx="280" cy="80" r="50" stroke="#f22b0d" strokeWidth="1.5" strokeDasharray="10,5" opacity="0.3" fill="none" />
            <line x1="280" y1="30" x2="280" y2="135" stroke="#f22b0d" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.3" />
            <line x1="230" y1="80" x2="330" y2="80" stroke="#f22b0d" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.3" />
            <g transform="translate(10, -10)">
              <line x1="-20" y1="280" x2="350" y2="90" stroke="#ffffff" strokeWidth="4" />
              <line x1="-15" y1="275" x2="355" y2="85" stroke="#ffffff" strokeWidth="4" />
              {Array.from({ length: 25 }).map((_, i) => {
                const x1 = i * 15;
                const y1 = 280 - i * 7.7;
                const x2 = x1 + 5;
                const y2 = y1 - 9;
                return <line key={`track-rung-${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f22b0d" strokeWidth="3.5" />;
              })}
            </g>
            <g transform="translate(120, 160) rotate(-27)">
              <rect x="0" y="-35" width="85" height="30" fill="#f22b0d" stroke="#ffffff" strokeWidth="2" />
              <rect x="5" y="-55" width="40" height="20" fill="#141413" stroke="#ffffff" strokeWidth="2" />
              <rect x="50" y="-55" width="28" height="20" fill="#141413" stroke="#ffffff" strokeWidth="2" />
              <line x1="15" y1="-55" x2="25" y2="-75" stroke="#ffffff" strokeWidth="2.5" />
              <circle cx="20" cy="-5" r="9" fill="#141413" stroke="#ffffff" strokeWidth="2" />
              <circle cx="55" cy="-5" r="9" fill="#141413" stroke="#ffffff" strokeWidth="2" />
              <line x1="20" y1="-5" x2="55" y2="-5" stroke="#f22b0d" strokeWidth="3" />
            </g>
          </svg>

          <div className="w-full h-1/4 bg-linear-to-t from-black to-transparent absolute bottom-0 left-0" />
        </div>

        {/* Alpine ridgeline divider */}
        <Ridgeline className="text-iron-dark -mt-px" height={40} withTrack />

        {/* Text Area */}
        <div className="p-8 pt-4 bg-white flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="dark" className="mb-4 text-[11px] px-2 py-1">
              <HardHat size={12} className="text-primary-red" />
              100-JAHRE-FEST JUBILÄUMSEXPOSITION
            </Badge>

            <h1 className="text-4xl xs:text-5xl font-extrabold tracking-tighter uppercase leading-[0.95] text-iron-dark mb-6">
              DIE 5 <br />
              <span className="text-primary-red">ZAHNRADSYSTEME</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-base md:text-lg text-neutral-800 font-medium leading-[140%] mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            Die präzise Mechanik hinter den steilsten Strecken der Welt – von der
            Riggenbach-Leiter bis zum modernen Von Roll System.
          </motion.p>

          {/* Visual stat tiles */}
          <motion.div
            className="grid grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            {[
              { icon: Layers, value: '5', label: 'Systeme' },
              { icon: TrendingUp, value: '48%', label: 'steilste' },
              { icon: History, value: "1863\u2013heute", label: 'Epoche' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center bg-cement-light border-[3px] border-iron-dark shadow-hard-sm p-3"
              >
                <stat.icon size={20} strokeWidth={2.5} className="text-primary-red mb-2" />
                <span className="text-xl xs:text-2xl font-black tracking-tighter leading-none text-iron-dark">
                  {stat.value}
                </span>
                <span className="text-xs font-mono font-black uppercase tracking-widest text-slate-stone mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="p-6 bg-cement-light border-t-[3px] border-iron-dark sticky bottom-0 z-10">
        <Button variant="cta" className="bg-primary-red text-white hover:bg-swiss-orange" onClick={onExplore}>
          <span>SYSTEME ERKUNDEN</span>
          <ArrowRight size={28} strokeWidth={3} className="animate-pulse" />
        </Button>
      </div>
    </ScreenContainer>
  );
}
