import * as TooltipLib from '@radix-ui/react-tooltip';

export interface TooltipProps {
  children: React.ReactNode;
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
          <TooltipLib.Content align="center" className="px-3 py-2 bg-black rounded-md text-xs">
            {content}
          </TooltipLib.Content>
        </TooltipLib.Portal>
      </TooltipLib.Root>
    </TooltipLib.Provider>
  );
};
