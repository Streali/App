import * as React from 'react';
import { HslaColor, hslaToHsva, hsvaToHsla } from '@uiw/color-convert';
import { TabsProps } from './tabs';
import { TabInput } from './tab-input';

export const TabHSL = (props: TabsProps) => {
  const { color, onChange } = props;
  const [hsla, setHsla] = React.useState<HslaColor>(hsvaToHsla(color));

  const inputStyle = 'w-8';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name !== 'a') {
      const value = e.target.value !== '' ? parseInt(e.target.value) : 0;
      const newHsla: HslaColor = {
        ...hsla,
        [e.target.name]: Math.round(value),
      };
      onChange(hslaToHsva(newHsla));
    }
    if (e.target.name === 'a') {
      const value = e.target.value !== '' ? parseInt(e.target.value) / 100 : 0;
      onChange({ ...color, a: value });
    }
  };

  React.useEffect(() => {
    setHsla(hsvaToHsla(color));
  }, [color]);

  return (
    <div className="flex gap-1">
      <TabInput
        label="h"
        name="h"
        value={Math.round(hsla.h)}
        type="number"
        max="360"
        min="0"
        onChange={(e) => handleChange(e)}
        className={`${inputStyle}`}
        autoFocus
      />
      <TabInput
        label="s"
        name="s"
        value={Math.round(hsla.s)}
        type="number"
        max="100"
        min="0"
        onChange={(e) => handleChange(e)}
        className={`${inputStyle}`}
      />
      <TabInput
        label="l"
        name="l"
        value={Math.round(hsla.l)}
        type="number"
        max="100"
        min="0"
        onChange={(e) => handleChange(e)}
        className={`${inputStyle}`}
      />
      <TabInput
        label="a"
        name="a"
        value={Math.round(hsla.a * 100)}
        type="number"
        max="100"
        min="0"
        onChange={(e) => handleChange(e)}
        className={`${inputStyle}`}
      />
    </div>
  );
};
