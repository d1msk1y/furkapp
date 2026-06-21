import { ReactNode, useRef, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // Move focus into the modal on open; restore it on close
  useEffect(() => {
    if (isOpen) {
      prevFocusRef.current = document.activeElement as HTMLElement;
      const timer = setTimeout(() => {
        const focusables = (modalRef.current as HTMLDivElement | null)?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        (focusables?.[0] as HTMLElement | undefined)?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      (prevFocusRef.current as HTMLElement | null)?.focus();
    }
  }, [isOpen]);

  // Focus trap + Escape to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = Array.from(
          (modalRef.current as HTMLDivElement | null)?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          ) ?? []
        );
        if (focusable.length === 0) return;
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-ink/55 z-40 cursor-pointer"
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
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
                  <h3 id={titleId} className="text-2xl font-black uppercase tracking-tight text-iron-dark">
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
