import { Button, ButtonColor } from '~/components/button/button';

export interface AlignmentProps {
  className?: string;
  onChange?: (value: 'left' | 'center' | 'right') => void;
  value?: 'left' | 'center' | 'right';
}

export const Alignment = (props: AlignmentProps) => {
  const { className, onChange, value = 'left' } = props;
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');

  const handleChange = (value: 'left' | 'center' | 'right') => {
    setAlignment(value);
    onChange && onChange(value);
  };

  useEffect(() => {
    setAlignment(value);
  }, [value]);

  return (
    <div className={`flex h-10 gap-2 rounded-lg bg-dark-400 p-2 ${className}`}>
      <Button
        buttonIcon="align-left"
        className="!h-6 flex-1 justify-center rounded"
        onClick={() => handleChange('left')}
        color={alignment === 'left' ? ButtonColor.Primary : ButtonColor.Black}
      />
      <Button
        buttonIcon="align-center"
        className="!h-6 flex-1 justify-center rounded"
        onClick={() => handleChange('center')}
        color={alignment === 'center' ? ButtonColor.Primary : ButtonColor.Black}
      />
      <Button
        buttonIcon="align-right"
        className="!h-6 flex-1 justify-center rounded"
        onClick={() => handleChange('right')}
        color={alignment === 'right' ? ButtonColor.Primary : ButtonColor.Black}
      />
    </div>
  );
};
