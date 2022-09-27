export interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

export const Label = (props: LabelProps) => {
  const { children, className = '' } = props;

  return (
    <span className={`mb-1.5 block text-xs font-bold ${className}`} data-testid="label">
      {children}
    </span>
  );
};
