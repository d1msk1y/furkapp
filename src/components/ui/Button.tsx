import { ComponentProps, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'icon' | 'ghost' | 'cta';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  shadowColor?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-red text-white border-[3px] border-iron-dark font-bold uppercase tracking-wider hover:bg-swiss-orange active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
  secondary:
    'bg-white text-iron-dark border-[3px] border-iron-dark font-bold uppercase tracking-wider hover:bg-cement-light active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
  icon:
    'border-3 border-iron-dark bg-white hover:bg-cement-light active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center',
  ghost:
    'bg-iron-dark text-white font-bold uppercase hover:bg-neutral-800 transition-colors',
  cta:
    'w-full h-16 border-[3px] border-iron-dark font-bold uppercase tracking-wider text-xl flex items-center justify-between px-6 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'w-11 h-11',
  md: 'w-12 h-12',
  lg: 'h-14 px-5',
};

const shadowMap: Record<ButtonVariant, string> = {
  primary: '4px 4px 0px #0D0D0D',
  secondary: '4px 4px 0px #0D0D0D',
  icon: '2px 2px 0px #0D0D0D',
  ghost: 'none',
  cta: '4px 4px 0px #0D0D0D',
};

export default function Button({
  variant = 'secondary',
  size,
  children,
  className = '',
  shadowColor,
  style,
  ...props
}: ButtonProps) {
  const shadow = shadowColor
    ? `4px 4px 0px ${shadowColor}`
    : shadowMap[variant];

  return (
    <button
      className={`transition-all duration-75 cursor-pointer active:![box-shadow:none] ${variantStyles[variant]} ${size ? sizeStyles[size] : ''} ${className}`}
      style={{ boxShadow: shadow, ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
