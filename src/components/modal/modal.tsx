import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { Button, ButtonColor, ButtonSize } from '../button/button';

export interface ModalProps {
  trigger: React.ReactNode;
  triggerContainerClassName?: string;
  title: string;
  children: React.ReactNode;
  buttons?: React.ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Modal = (props: ModalProps) => {
  const {
    trigger,
    title,
    children,
    buttons,
    open,
    triggerContainerClassName = '',
    onOpenChange,
  } = props;
  const [isOpen, setIsOpen] = useState(open);

  const handleOpenChange = (open: boolean) => {
    onOpenChange && onOpenChange(open);
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <div className={triggerContainerClassName}>{trigger}</div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed top-0 left-0 z-10 h-full w-full bg-dark-500 opacity-70" />
        <Dialog.Content
          className={`min-w-40 fixed top-1/2 left-1/2 z-20 w-[calc(600px-48px)] max-w-[calc(100vw-48px)] -translate-x-1/2 -translate-y-1/2 animate-dialogFadeIn rounded-md bg-dark-400 p-5`}
        >
          <div className="mb-3 flex w-full items-center justify-between">
            <Dialog.Title className="font-title text-3xl font-semibold">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <div>
                <Button buttonIcon="close-line" size={ButtonSize.Small} color={ButtonColor.Black} />
              </div>
            </Dialog.Close>
          </div>
          <div className="mb-3">{children}</div>
          <div className="flex justify-end gap-3">{buttons}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
