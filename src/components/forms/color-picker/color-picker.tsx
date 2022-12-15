import './color-picker.scss';
import { HsvaColor, rgbaStringToHsva, color as colorResult } from '@uiw/color-convert';
import Hue from '@uiw/react-color-hue';
import Saturation from '@uiw/react-color-saturation';
import { Pointer } from './pointer';
import { Tabs } from './tabs';

export interface ColorPickerProps {
  color?: HsvaColor;
  onChange: (value: string) => void;
  className?: string;
}

export const ColorPicker = (props: ColorPickerProps) => {
  const { color = rgbaStringToHsva('rgba(255,0,0,1)'), onChange, className } = props;
  const [hsva, setHsva] = useState<HsvaColor>(color);

  const handleChange = (newColor: HsvaColor) => {
    setHsva(newColor);
    onChange(colorResult(newColor).hexa);
  };

  return (
    <div
      className={`color-picker box-border flex w-56 rounded-md border-2 border-dark-300 bg-dark-500  ${className}`}
    >
      <Hue
        hue={hsva.h}
        onChange={(newHue) => {
          handleChange({ ...hsva, ...newHue });
        }}
        pointer={Pointer}
        radius="4px 0 0 4px"
        direction="vertical"
        width="6px"
        height="320px"
      />
      <div className="flex flex-col gap-4" style={{ width: '214px' }}>
        <Saturation
          hsva={hsva}
          onChange={(newColor) => handleChange({ ...hsva, ...newColor, a: hsva.a })}
          radius="0 4px 0 0"
          style={{ height: '240px', width: '100%' }}
          pointer={Pointer}
        />
        <Tabs color={hsva} onChange={(newColor) => handleChange(newColor)} />
      </div>
    </div>
  );
};
