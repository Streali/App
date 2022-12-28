import { Color } from '../forms/color/color';

export type DemoContainerProps = {
  children: React.ReactNode;
  className?: string;
  isDeveloperMode?: boolean;
};

const DemoContainer = (props: DemoContainerProps) => {
  const { children, isDeveloperMode } = props;
  const [color, setColor] = useState<string>('#040508');

  return (
    <div
      style={{ backgroundColor: color }}
      className={`relative flex flex-1 flex-col items-end justify-end overflow-hidden rounded-2xl bg-dark-600 p-10 ${
        isDeveloperMode ? 'h-[calc(100vh_-_470px)]' : 'h-[calc(100vh_-_80px)]'
      }`}
    >
      {children}
      <div className="absolute inset-0  flex h-14 w-full items-center justify-end bg-dark-600/40 px-2 backdrop-blur-sm">
        <Color haveInput={false} value={color} onColorChange={setColor} />
      </div>
    </div>
  );
};

export default DemoContainer;
