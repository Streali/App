import { Button, ButtonColor } from '~/components/button/button';
import { Input, InputState } from '~/components/forms/input/input';
import { Modal } from '~/components/modal/modal';
import type { ChangeEvent, ReactNode } from 'react';

export interface ConfirmationProps {
  trigger: ReactNode;
  title: string;
  text: string;
  word: string;
  confirmText: string;
  textButton?: string;
  onConfirm?: () => void;
  onConfirmationClose?: () => void;
}

export const Confirmation = (props: ConfirmationProps) => {
  const {
    trigger,
    title,
    text,
    word,
    confirmText,
    textButton = 'Confirm',
    onConfirm,
    onConfirmationClose,
  } = props;
  const [confirm, setConfirm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: ChangeEvent) => {
    setConfirm((e.target as HTMLInputElement).value);
  };

  const handleConfirm = () => {
    if (confirm === word) {
      onConfirm && onConfirm();
      setIsOpen(false);
    }
  };

  return (
    <Modal
      trigger={trigger}
      title={title}
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) onConfirmationClose && onConfirmationClose();
      }}
    >
      <p>{text}</p>
      <p className="mb-3">
        {confirmText}
        <span className="ml-2 inline-flex items-center rounded-sm border border-dark-300 bg-dark-500 px-2 py-1 text-sm leading-none">
          {word}
        </span>
      </p>
      <Input
        type="text"
        label="Word to confirm"
        onChange={handleInputChange}
        state={word === confirm ? InputState.Success : InputState.Error}
      />
      <div className="mt-5 flex w-full justify-end">
        <Button color={ButtonColor.Error} disabled={word !== confirm} onClick={handleConfirm}>
          {textButton}
        </Button>
      </div>
    </Modal>
  );
};
