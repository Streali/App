import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { PointerProps } from '@uiw/react-color-alpha/cjs/Pointer';

export const Pointer = (props: PointerProps) => {
  return (
    <div
      className="absolute -translate-x-[2px] -translate-y-1/2"
      style={{ top: props.top, left: props.left }}
    >
      <div className={`${props.prefixCls} w-2.5 h-2.5 rounded-full ring-2 ring-white ring-inset`} />
    </div>
  );
};
