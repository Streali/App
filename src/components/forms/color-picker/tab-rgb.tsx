import { RgbaColor, rgbaToHsva, hsvaToRgba } from '@uiw/color-convert';
import { TabInput } from '~/components/tabs/tab-input';
import { TabsProps } from './tabs';
import type { ChangeEvent } from 'react';

export const TabRGB = (props: TabsProps) => {
  const { color, onChange } = props;
  const [rgba, setRgba] = useState<RgbaColor>(hsvaToRgba(color));

  const inputStyle = 'w-8';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name !== 'a') {
      const value = e.target.value !== '' ? parseInt(e.target.value) : 0;
      const newHsla: RgbaColor = {
        ...rgba,
        [e.target.name]: Math.round(value),
      };
      onChange(rgbaToHsva(newHsla));
    }
    if (e.target.name === 'a') {
      const value = e.target.value !== '' ? parseInt(e.target.value) / 100 : 0;
      onChange({ ...color, a: value });
    }
  };

  useEffect(() => {
    setRgba(hsvaToRgba(color));
  }, [color]);

  return (
    <div className="flex gap-1">
      <TabInput
        label="r"
        name="r"
        value={Math.round(rgba.r)}
        type="number"
        max="255"
        min="0"
        onChange={(e) => handleChange(e)}
        className={`${inputStyle}`}
        autoFocus
      />
      <TabInput
        label="g"
        name="g"
        value={Math.round(rgba.g)}
        type="number"
        max="255"
        min="0"
        onChange={(e) => handleChange(e)}
        className={`${inputStyle}`}
      />
      <TabInput
        label="b"
        name="b"
        value={Math.round(rgba.b)}
        type="number"
        max="255"
        min="0"
        onChange={(e) => handleChange(e)}
        className={`${inputStyle}`}
      />
      <TabInput
        label="a"
        name="a"
        value={Math.round(rgba.a * 100)}
        type="number"
        max="100"
        min="0"
        onChange={(e) => handleChange(e)}
        className={`${inputStyle}`}
      />
    </div>
  );
};
