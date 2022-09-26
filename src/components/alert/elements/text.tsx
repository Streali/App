import { Pixels } from '../../../types/types/custom';

export interface AlertTextProps {
  text: string;
  settings: any;
  width: Pixels;
  height: Pixels;
  posX: Pixels;
  posY: Pixels;
}

export const AlertText = (props: AlertTextProps) => {
  const { text, settings, width, height, posX, posY } = props;

  return (
    <p
      className="draggable-alert hover:outline hover:outline-1 hover:outline-white/30 transition-colors absolute"
      style={{
        width: width,
        height: height,
        transform: `translate(${posX}px, ${posY}px)`,
        ...settings,
      }}
      data-x={posX}
      data-y={posY}>
      {text}
    </p>
  );
};
