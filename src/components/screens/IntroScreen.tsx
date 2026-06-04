import { motion } from 'motion/react';
import { ArrowRight, Train, HardHat } from 'lucide-react';
import ScreenContainer from '../layout/ScreenContainer';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface IntroScreenProps {
  readonly onExplore: () => void;
  readonly onSimulateError: () => void;
}

export default function IntroScreen({ onExplore, onSimulateError }: Readonly<IntroScreenProps>) {
  return (
    <ScreenContainer className="overflow-x-hidden relative">
      {/* Error simulation button */}
      <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={onSimulateError}
          title="Netzabfall im Hochgebirge simulieren"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-cement-light border-2 border-iron-dark text-xs font-mono font-bold uppercase cursor-pointer hover:bg-primary-red hover:text-white transition-colors"
          style={{ boxShadow: '3px 3px 0px #0D0D0D' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-primary-red animate-pulse" />{' '}
          OFFLINE SIMULIEREN
        </button>
      </div>

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

          {/* Catalog plate overlay */}
          <div className="absolute top-6 left-6 z-10 flex flex-col bg-iron-dark border-2 border-white text-white p-3 font-mono text-[9px] uppercase tracking-wider shadow-hard gap-0.5">
            <div className="flex items-center gap-1.5 font-bold text-primary-red">
              <Train size={12} />
              <span>FURKA-OBERALP-BAHN M322</span>
            </div>
            <span>PLATTE: EXPOSITION ALPHA 1.0</span>
            <span className="text-gray-400">KOORDINATEN: 46°35&apos;N 8°25&apos;E</span>
            <span className="text-gray-400">NETZBANDBREITE: SEHR SCHWACH</span>
          </div>

          <div className="w-full h-1/4 bg-linear-to-t from-black to-transparent absolute bottom-0 left-0" />
        </div>

        {/* Text Area */}
        <div className="p-8 bg-white flex-1 flex flex-col justify-center">
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
              DIES 5 <br />
              <span className="text-primary-red">ZAHNRADSYSTEME</span>
            </h1>
          </motion.div>

          <motion.div
            className="space-y-4 text-base md:text-lg text-neutral-800 font-medium leading-[140%]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <p>
              Analysieren Sie die fünf bahnbrechenden Zahnradsysteme, welche die alpine Erschliessung ermöglichten. Von der Riggenbach-Leiter bis zum modernen Von Roll System – entdecken Sie die präzise Mechanik hinter den steilsten Strecken der Welt.
            </p>
            <p className="text-neutral-500 text-sm xs:text-base border-l-4 border-iron-dark pl-3 py-1 font-sans">
              Diese Dokumentation konzentriert sich auf die spezifischen Toleranzen, Profile und Antriebstechnologien dieser fünf historischen Meisterwerke der Ingenieurskunst. Bereit für die technische Inspektion?
            </p>
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
