import { useEffect, useState } from 'react';
import { ShadowType } from '../../../types/schemas/components';
import { Color } from '../color/color';
import { Input } from '../input/input';

export interface ShadowProps {
  onChange?: (settings: ShadowType) => void;
  settings?: ShadowType;
  className?: string;
}

export const Shadow = (props: ShadowProps) => {
  const { onChange, settings, className = '' } = props;

  const [shadowSettings, setShadowSettings] = useState<ShadowType>({
    shadowColor: '#000000',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
  });

  const handleSettingsChange = (
    key: 'shadowColor' | 'shadowOffsetX' | 'shadowOffsetY' | 'shadowBlur',
    value: string | number
  ) => {
    const currentSettings: ShadowType = { ...shadowSettings };
    switch (key) {
      case 'shadowColor':
        currentSettings.shadowColor = value as string;
        break;
      case 'shadowOffsetX':
        currentSettings.shadowOffsetX = value as number;
        break;
      case 'shadowOffsetY':
        currentSettings.shadowOffsetY = value as number;
        break;
      case 'shadowBlur':
        currentSettings.shadowBlur = value as number;
        break;
    }
    setShadowSettings(currentSettings);
    onChange && onChange(currentSettings);
  };

  useEffect(() => {
    if (settings) {
      setShadowSettings(settings);
    }
  }, [settings]);

  return (
    <div className={`flex gap-2 w-full flex-1 min-w-full ${className}`}>
      <Color
        haveInput={false}
        value={shadowSettings.shadowColor}
        onColorChange={(value) => handleSettingsChange('shadowColor', value)}
      />
      <Input
        type="number"
        defaultValue={0}
        suffix="px"
        className="flex-1 w-full"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          handleSettingsChange('shadowOffsetX', target.valueAsNumber);
        }}
      />
      <Input
        type="number"
        defaultValue={0}
        suffix="px"
        className="flex-1 w-full"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          handleSettingsChange('shadowOffsetY', target.valueAsNumber);
        }}
      />
      <Input
        type="number"
        defaultValue={0}
        suffix="px"
        className="flex-1 w-full"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          handleSettingsChange('shadowBlur', target.valueAsNumber);
        }}
      />
    </div>
  );
};
