import * as PopoverLib from '@radix-ui/react-popover';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export interface PopoverProps {
  trigger: ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  children: ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  width?: string;
  color?: 'normal' | 'black' | 'dark';
  className?: string;
}

export const Popover = (props: PopoverProps) => {
  const {
    trigger,
    align = 'center',
    side = 'bottom',
    children,
    open = false,
    width = '300px',
    onOpenChange,
    color = 'normal',
    className = '',
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
          className={`rounded-xl p-3 ${
            color === 'normal' ? 'bg-dark-400' : color === 'dark' ? 'bg-dark-500' : 'bg-black'
          } ${animationClassName[side]} outline-none ${className}`}
          style={{ width }}
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
