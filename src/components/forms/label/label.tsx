import type { ReactNode } from 'react';

export interface LabelProps {
  children: ReactNode;
  className?: string;
  optional?: boolean;
}

export const Label = (props: LabelProps) => {
  const { children, className = '', optional = false } = props;

  return (
    <div className="flex gap-2">
      <span className={`mb-1.5 block text-xs font-bold ${className}`} data-testid="label">
        {children}
      </span>
      {optional && <span className="text-xxs font-bold italic text-dark-100">(optional)</span>}
    </div>
  );
};
