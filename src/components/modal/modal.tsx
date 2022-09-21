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
        <Dialog.Overlay className="w-full h-full bg-dark-500 opacity-70 fixed top-0 left-0 z-10" />
        <Dialog.Content
          className={`p-5 w-[calc(600px-48px)] max-w-[calc(100vw-48px)] bg-dark-400 rounded-md min-w-40 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-dialogFadeIn`}>
          <div className="flex items-center justify-between w-full mb-3">
            <Dialog.Title className="font-title font-semibold text-3xl">{title}</Dialog.Title>
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
