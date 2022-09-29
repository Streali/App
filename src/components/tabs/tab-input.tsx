export interface TabInputProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  className?: string;
}

export const TabInput = (props: TabInputProps) => {
  const { label, className = '', ...InputProps } = props;

  const resetInputStyle =
    'bg-transparent border-transparent appareance-none focus:outline-none focus:shadow-outline ';

  const focusInputStyle =
    'focus:text-white border-b border-transparent focus:border-primary-400 focus:border-solid focus:border-b';

  return (
    <label className="flex gap-0.5 text-xs">
      <label className="text-light-200">{label?.toUpperCase()}</label>
      <input
        className={`appearance-none text-left font-bold text-dark-100 focus:text-white ${focusInputStyle} ${resetInputStyle} ${className}`}
        {...InputProps}
      />
    </label>
  );
};
