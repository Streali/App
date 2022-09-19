export interface IconProps {
  name: string;
  className?: string;
}

export const Icon = (props: IconProps) => {
  const { name, className = '' } = props;

  return <i className={`ri-${name} ${className}`} role="img"></i>;
};
