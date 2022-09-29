import * as React from 'react';
import { hexToHsva, hsvaToHex } from '@uiw/color-convert';
import { ChangeEvent } from 'react';
import { TabsProps } from './tabs';
import { TabInput } from '../../tabs/tab-input';

export const TabHex = (props: TabsProps) => {
  const { color, onChange } = props;

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

  return (
    <div className="flex gap-4">
      <TabInput
        label="#"
        name="hex"
        value={hsvaToHex(color).replace('#', '').toUpperCase()}
        type="text"
        onChange={(e) => handleChange(e)}
        className="w-16"
        autoFocus
      />
      <TabInput
        label="%"
        name="a"
        value={Math.round(color.a * 100)}
        type="number"
        max="100"
        min="0"
        onChange={(e) => handleChange(e)}
        className="w-9"
      />
    </div>
  );
};
