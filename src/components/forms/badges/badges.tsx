import { Input } from '~/components/forms/input/input';
import { Select } from '~/components/forms/select/select';
import { Switch } from '~/components/forms/switch/switch';
import type { BadgesType } from '~/types/schemas/components';

export interface BadgesProps {
  className?: string;
  settings?: BadgesType;
  onChange?: (settings: BadgesType) => void;
}

export const defaultBadgesSettings: BadgesType = {
  enabled: true,
  position: 'left',
  style: 'twitch',
  size: 0,
  space: 0,
  space_between: 0,
};

export const Badges = (props: BadgesProps) => {
  const { className, settings, onChange } = props;

  const [badgesSettings, setBadgesSettings] = useState<BadgesType>(defaultBadgesSettings);

  const badgesPositionOptions = [
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
  ];

  const badgesStyleOptions = [{ label: 'Twitch', value: 'twitch' }];

  const handleSettingsChange = (key: keyof BadgesType, value: boolean | string | number) => {
    const newSettings = { ...badgesSettings, [key]: value };
    setBadgesSettings(newSettings);
    onChange?.(newSettings);
  };

  useEffect(() => {
    if (settings) {
      setBadgesSettings(settings);
    }
  }, [settings]);

  return (
    <div className={className}>
      <div className="mb-2 flex gap-2">
        <Switch
          onChange={(checked) => handleSettingsChange('enabled', checked)}
          checked={settings?.enabled}
        />
        <div className="flex-1">
          <Select
            options={badgesPositionOptions}
            className="w-full"
            defaultValue={badgesPositionOptions.find((pos) => pos.value === settings?.position)}
            onChange={(option) => handleSettingsChange('position', option?.value || 'left')}
          />
        </div>
        <div className="flex-1">
          <Select
            options={badgesStyleOptions}
            className="w-full"
            defaultValue={badgesStyleOptions.find((style) => style.value === settings?.style)}
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
            defaultValue={settings?.size}
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
            defaultValue={settings?.space}
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
            defaultValue={settings?.space_between}
            className="w-full"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleSettingsChange('space_between', target.valueAsNumber);
            }}
          />
        </div>
      </div>
    </div>
  );
};
