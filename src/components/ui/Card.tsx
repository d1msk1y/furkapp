import { ComponentProps, ReactNode } from 'react';

type CardProps = ComponentProps<'div'> & {
  children: ReactNode;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  border?: boolean;
};

const shadowStyles = {
  sm: '2px 2px 0px 0px #0D0D0D',
  md: '4px 4px 0px 0px #0D0D0D',
  lg: '6px 6px 0px 0px #0D0D0D',
  none: 'none',
};

export default function Card({
  children,
  shadow = 'md',
  border = true,
  className = '',
  style,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white ${border ? 'border-[3px] border-iron-dark' : ''} ${className}`}
      style={{ boxShadow: shadowStyles[shadow], ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
