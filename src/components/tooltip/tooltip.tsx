import * as TooltipLib from '@radix-ui/react-tooltip';
import type { ReactNode } from 'react';

export interface TooltipProps {
  children: ReactNode;
  content: string;
  triggerClassName?: string;
}

export const Tooltip = (props: TooltipProps) => {
  const { children, content, triggerClassName } = props;

  return (
    <TooltipLib.Provider>
      <TooltipLib.Root>
        <TooltipLib.Trigger className={triggerClassName}>{children}</TooltipLib.Trigger>
        <TooltipLib.Portal>
          <TooltipLib.Content align="center" className="rounded-md bg-black px-3 py-2 text-xs">
            {content}
          </TooltipLib.Content>
        </TooltipLib.Portal>
      </TooltipLib.Root>
    </TooltipLib.Provider>
  );
};
