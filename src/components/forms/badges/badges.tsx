import { useEffect, useState } from 'react';
import { Input } from '../input/input';
import { Select } from '../select/select';
import { Switch } from '../switch/switch';

export interface BadgesSettings {
  enabled: boolean;
  position: 'left' | 'right';
  style: 'twitch';
  size: number;
  space: number;
  spaceBetween: number;
}

export interface BadgesProps {
  className?: string;
  settings?: BadgesSettings;
  onChange?: (settings: BadgesSettings) => void;
}

export const defaultBadgesSettings: BadgesSettings = {
  enabled: true,
  position: 'left',
  style: 'twitch',
  size: 0,
  space: 0,
  spaceBetween: 0,
};

export const Badges = (props: BadgesProps) => {
  const { className, settings, onChange } = props;

  const [badgesSettings, setBadgesSettings] = useState<BadgesSettings>(defaultBadgesSettings);

  const badgesPositionOptions = [
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
  ];

  const badgesStyleOptions = [{ label: 'Twitch', value: 'twitch' }];

  const handleSettingsChange = (key: keyof BadgesSettings, value: boolean | string | number) => {
    const newSettings = { ...badgesSettings, [key]: value };
    setBadgesSettings(newSettings);
    onChange?.(newSettings);
  };

  useEffect(() => {
    if (settings) {
      setBadgesSettings(settings);
    }
  }, []);

  return (
    <div className={className}>
      <div className="flex gap-2 mb-2">
        <Switch onChange={(checked) => handleSettingsChange('enabled', checked)} />
        <div className="flex-1">
          <Select
            options={badgesPositionOptions}
            className="w-full"
            defaultValue={badgesPositionOptions.find(
              (pos) => pos.value === badgesSettings.position
            )}
            onChange={(option) => handleSettingsChange('position', option?.value || 'left')}
          />
        </div>
        <div className="flex-1">
          <Select
            options={badgesStyleOptions}
            className="w-full"
            defaultValue={badgesStyleOptions.find((style) => style.value === badgesSettings.style)}
            onChange={(option) => handleSettingsChange('style', option?.value || 'twitch')}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            label="Badge size"
            type="number"
            suffix="px"
            defaultValue={badgesSettings.size}
            className="w-full"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleSettingsChange('size', target.valueAsNumber);
            }}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Space"
            type="number"
            suffix="px"
            defaultValue={badgesSettings.space}
            className="w-full"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleSettingsChange('space', target.valueAsNumber);
            }}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Space between"
            type="number"
            suffix="px"
            defaultValue={badgesSettings.spaceBetween}
            className="w-full"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleSettingsChange('spaceBetween', target.valueAsNumber);
            }}
          />
        </div>
      </div>
    </div>
  );
};
