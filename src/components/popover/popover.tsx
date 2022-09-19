import * as PopoverLib from '@radix-ui/react-popover';
import { useEffect, useState } from 'react';

export interface PopoverProps {
  trigger: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Popover = (props: PopoverProps) => {
  const {
    trigger,
    align = 'center',
    side = 'bottom',
    children,
    open = false,
    onOpenChange,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const animationClassName = {
    top: 'slide-down-fade',
    right: 'slide-left-fade',
    bottom: 'slide-up-fade',
    left: 'slide-right-fade',
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <PopoverLib.Root open={isOpen} onOpenChange={onOpenChange}>
      <PopoverLib.Trigger asChild>
        <div>{trigger}</div>
      </PopoverLib.Trigger>
      <PopoverLib.Portal>
        <PopoverLib.Content
          className={`w-[300px] p-3 rounded-xl bg-dark-500 ${animationClassName[side]} outline-none`}
          align={align}
          side={side}
          sideOffset={5}
        >
          {children}
        </PopoverLib.Content>
      </PopoverLib.Portal>
    </PopoverLib.Root>
  );
};
