import { Color } from '../forms/color/color';

export type DemoContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const DemoContainer = (props: DemoContainerProps) => {
  const { children } = props;
  const [color, setColor] = useState<string>('#ff0000');

  return (
    <div
      style={{ backgroundColor: color }}
      className="relative flex h-[calc(100vh_-_80px)] flex-1 flex-col items-end justify-end overflow-hidden rounded-2xl bg-dark-600 p-10"
    >
      {children}
      <div className="absolute inset-0  flex h-14 w-full items-center justify-end bg-dark-600/40 px-2 backdrop-blur-sm">
        <Color haveInput={false} color={color} onColorChange={setColor} />
      </div>
    </div>
  );
};

export default DemoContainer;
