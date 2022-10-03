import { hexToHsva, hsvaToHex } from '@uiw/color-convert';
import { TabInput } from '~/components/tabs/tab-input';
import { TabsProps } from './tabs';
import type { ChangeEvent } from 'react';

export interface HexaColor {
  hex: string;
  a: number;
}

export const TabHex = (props: TabsProps) => {
  const { color, onChange } = props;
  const [hexa, setHexa] = useState<HexaColor>({ hex: hsvaToHex(color), a: color.a });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'hex') {
      const value = `#${e.target.value}`;
      const { h, s, v } = hexToHsva(value);
      onChange({ ...color, h, s, v });
    }
    if (e.target.name === 'a') {
      const value = e.target.value !== '' ? parseInt(e.target.value) / 100 : 0;
      onChange({ ...color, a: value });
    }
  };

  useEffect(() => {
    setHexa({ hex: hsvaToHex(color), a: color.a });
  }, [color]);

  return (
    <div className="flex gap-4">
      <TabInput
        label="#"
        name="hex"
        value={hexa.hex.replace('#', '').toUpperCase()}
        type="text"
        onChange={(e) => handleChange(e)}
        className="w-16"
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
