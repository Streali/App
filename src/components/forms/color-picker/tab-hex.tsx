import { hexToHsva, hsvaToHex } from '@uiw/color-convert';
import { HsvaColor } from '@uiw/react-color';
import { TabInput } from '~/components/tabs/tab-input';
import { InputState } from '../input/input';
import { TabsProps } from './tabs';
import type { ChangeEvent } from 'react';

export interface HexaColor {
  hex: string;
  a: number;
}

export const TabHex = (props: TabsProps) => {
  const { color, onChange } = props;
  const [hexa, setHexa] = useState<HexaColor>({ hex: hsvaToHex(color), a: color.a });
  const [hsva, setHsva] = useState<HsvaColor>(color);
  const [hexaState, setHexaState] = useState<InputState>(InputState.Normal);
  const hexRegex = /^(?:[0-9a-fA-F]{3}){1,2}$/;

  useMemo(() => {
    if (JSON.stringify(color) !== JSON.stringify(hsva)) {
      const newColor = { hex: hsvaToHex(color), a: color.a };
      setHexa(newColor);
    }
  }, [color]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (e.target.name === 'hex' && hexRegex.test(newValue)) {
      setHexaState(InputState.Normal);

      const value = `#${newValue}`;
      const { h, s, v } = hexToHsva(value);
      setHexa({ hex: value, a: color.a });
      setHsva({ h, s, v, a: color.a });
      onChange({ ...color, h, s, v });
    }

    if (!hexRegex.test(newValue)) {
      setHexaState(InputState.Error);
      setHexa({ hex: `#${newValue}`, a: color.a });
    }

    if (e.target.name === 'a') {
      const value = newValue !== '' ? parseInt(newValue) / 100 : 0;
      setHexa({ ...hexa, a: value });
      setHsva({ ...hsva, a: value });
      onChange({ ...color, a: value });
    }
  };

  return (
    <div className="flex gap-4">
      <TabInput
        label="#"
        name="hex"
        value={hexa.hex.replace('#', '').toUpperCase()}
        type="text"
        onChange={(e) => handleChange(e)}
        className="w-16"
        state={hexaState}
        autoFocus
      />
      <TabInput
        label="a"
        name="a"
        value={Math.round(hexa.a * 100)}
        type="number"
        max="100"
        min="1"
        onChange={(e) => handleChange(e)}
        className={`w-9`}
      />
    </div>
  );
};
