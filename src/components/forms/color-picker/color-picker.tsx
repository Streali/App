import * as React from 'react';
import Saturation from '@uiw/react-color-saturation';
import Hue from '@uiw/react-color-hue';
import { HsvaColor } from '@uiw/color-convert';
import { Tabs } from './tabs';
import { Pointer } from './pointer';
import { rgbaStringToHsva, color as colorResult } from '@uiw/color-convert';
import * as Portal from '@radix-ui/react-portal';
import './color-picker.scss';

export interface ColorPickerProps {
  color?: HsvaColor;
  onChange: (value: string) => void;
  className?: string;
  top: number;
  left: number;
}

export const ColorPicker = (props: ColorPickerProps) => {
  const { color = rgbaStringToHsva('rgba(255,0,0,1)'), onChange, className, top, left } = props;
  const [hsva, setHsva] = React.useState<HsvaColor>(color);

  React.useEffect(() => {
    onChange(colorResult(hsva).hexa);
  }, [hsva, onChange]);

  return (
    <Portal.Root className="absolute z-50" style={{ top: `${top + 48}px`, left }}>
      <div
        className={`color-picker flex w-56 rounded-md bg-dark-500 border-dark-300 border-2 box-border  ${className}`}
      >
        <Hue
          hue={hsva.h}
          onChange={(newHue) => {
            setHsva({ ...hsva, ...newHue });
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
            onChange={(newColor) => setHsva({ ...hsva, ...newColor, a: hsva.a })}
            radius="0 4px 0 0"
            style={{ height: '240px', width: '100%' }}
            pointer={Pointer}
          />
          <Tabs color={hsva} onChange={(newColor) => setHsva(newColor)} />
        </div>
      </div>
    </Portal.Root>
  );
};
