import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import Button from './Button';

interface ModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly subtitle?: string;
  readonly children: ReactNode;
  readonly footerAction?: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footerAction,
}: Readonly<ModalProps>) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/55 z-40 cursor-pointer"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-0 left-0 w-full bg-cement-light border-t-[6px] border-iron-dark z-50 p-6 flex flex-col shadow-[0px_-8px_0px_0px_rgba(0,0,0,0.15)] items-center"
          >
            <div className="w-full max-w-2xl flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  {subtitle && (
                    <span className="block text-xs font-mono tracking-widest uppercase font-extrabold text-primary-red mb-1">
                      {subtitle}
                    </span>
                  )}
                  <h3 className="text-2xl font-black uppercase tracking-tight text-iron-dark">
                    {title}
                  </h3>
                </div>

              </div>

              <div className="w-full h-0.75 bg-ink mb-4" />

              {children}

              {footerAction && <div className="text-right mt-4">{footerAction}</div>}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
