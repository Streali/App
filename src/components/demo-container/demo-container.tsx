import { Color } from '../forms/color/color';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

export type DemoContainerProps = {
  children: (demoData: Record<string, unknown>) => ReactNode;
  className?: string;
  isDeveloperMode?: boolean;
  tools?: (
    demoData: Record<string, unknown>,
    setDemoDat: Dispatch<SetStateAction<Record<string, unknown>>>
  ) => void;
};

const DemoContainer = (props: DemoContainerProps) => {
  const { children, isDeveloperMode } = props;
  const [color, setColor] = useState<string>('#040508');
  const [demoData, setDemoData] = useState<Record<string, unknown>>({});

  return (
    <div
      style={{ backgroundColor: color }}
      className={`relative flex flex-1 flex-col items-end justify-end overflow-hidden rounded-2xl bg-dark-600 p-10 ${
        isDeveloperMode ? 'h-[calc(100vh_-_470px)]' : 'h-[calc(100vh_-_80px)]'
      }`}
    >
      {typeof children === 'function' ? children(demoData) : children}
      <div className="absolute inset-0 flex  h-14 w-full items-center justify-end space-x-4 bg-dark-600/40 px-2 backdrop-blur-sm">
        <Color haveInput={false} value={color} onColorChange={setColor} />
        <>{props.tools && props.tools(demoData, setDemoData)}</>
      </div>
    </div>
  );
};

export default DemoContainer;
