import * as React from 'react';
import { HsvaColor, hsvaToRgbaString } from '@uiw/color-convert';
import { TabHex } from './tab-hex';
import { TabRGB } from './tab-rgb';
import { TabHSL } from './tab-hsl';

export interface TabsProps {
  color: HsvaColor;
  onChange: (value: HsvaColor) => void;
}

export const Tabs = (props: TabsProps) => {
  const { color, onChange } = props;
  const [tab, setTab] = React.useState<'hex' | 'rgba' | 'hsla'>('hex');

  const buttonStyle = 'text-xs text-dark-100 font-bold';
  const buttonActiveStyle = 'text-white border-primary-400 border-solid border-b';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full items-center gap-2 px-2">
        <div
          className="h-4 w-4 shrink-0 overflow-hidden rounded"
          style={{
            backgroundColor: `${hsvaToRgbaString(color)}`,
          }}
        ></div>

        {tab === 'hex' && <TabHex color={color} onChange={(e: HsvaColor) => onChange(e)} />}
        {tab === 'rgba' && <TabRGB color={color} onChange={(e: HsvaColor) => onChange(e)} />}
        {tab === 'hsla' && <TabHSL color={color} onChange={(e: HsvaColor) => onChange(e)} />}
      </div>

      <div className="flex gap-4">
        <button
          className={`${buttonStyle} ${tab === 'rgba' && buttonActiveStyle}`}
          onClick={() => setTab('rgba')}
        >
          RGBA
        </button>
        <button
          className={`${buttonStyle} ${tab === 'hex' && buttonActiveStyle}`}
          onClick={() => setTab('hex')}
        >
          HEX
        </button>
        <button
          className={`${buttonStyle} ${tab === 'hsla' && buttonActiveStyle}`}
          onClick={() => setTab('hsla')}
        >
          HSLA
        </button>
      </div>
    </div>
  );
};
