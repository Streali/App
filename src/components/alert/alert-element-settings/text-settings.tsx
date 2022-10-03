import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { BorderRadius } from '~/components/forms/border-radius/border-radius';
import { Border } from '~/components/forms/border/border';
import { Color } from '~/components/forms/color/color';
import { Input } from '~/components/forms/input/input';
import { Select } from '~/components/forms/select/select';
import { Shadow } from '~/components/forms/shadow/shadow';
import { Spacing } from '~/components/forms/spacing/spacing';
import { Switch } from '~/components/forms/switch/switch';
import { TextStyle } from '~/components/forms/text-style/text-style';
import { dynamicAlertContentValues } from '~/utils/alert/dynamic-content-values';
import type { AlertElementTextSettings } from '~/types/schemas/alert';

export interface TextSettingsProps {
  settings: AlertElementTextSettings;
  onSettingsChange?: (key: string, settings: unknown) => void;
}

export const TextSettings = (props: TextSettingsProps) => {
  const { settings, onSettingsChange } = props;
  const [currentSettings, setCurrentSettings] = useState(settings);

  useEffect(() => {
    setCurrentSettings(settings);
  }, [settings]);

  return (
    <>
      <TabItem title="Content">
        <Switch
          className="mb-3"
          label="Dynamic content"
          onChange={(checked) => onSettingsChange?.('is_dynamic', checked)}
        />
        {currentSettings.is_dynamic ? (
          <Select
            defaultValue={dynamicAlertContentValues.find(
              (v) => v.value === currentSettings.dynamic_content
            )}
            options={dynamicAlertContentValues}
            className="mb-3"
          />
        ) : (
          <Input
            value={currentSettings.content}
            className="mb-3"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              onSettingsChange && onSettingsChange('content', target.value);
            }}
          />
        )}
      </TabItem>
      <TabItem title="Text style">
        <TextStyle
          settings={currentSettings.text}
          onChange={(settings) => onSettingsChange?.('text', settings)}
        />
      </TabItem>
      <TabItem title="Box background">
        <Color
          value={currentSettings.background}
          onColorChange={(value) => onSettingsChange?.('background', value)}
          containerClassName="mb-3"
        />
      </TabItem>
      <TabItem title="Box shadow">
        <Shadow
          settings={currentSettings.shadow}
          onChange={(settings) => onSettingsChange?.('shadow', settings)}
          className="mb-3"
        />
      </TabItem>
      <TabItem title="Box border">
        <Border
          settings={currentSettings.border}
          onChange={(settings) => onSettingsChange?.('border', settings)}
          className="mb-3"
        />
      </TabItem>
      <TabItem title="Border radius">
        <BorderRadius
          settings={currentSettings.radius}
          onChange={(settings) => onSettingsChange?.('radius', settings)}
          className="mb-3"
        />
      </TabItem>
      <TabItem title="Inner margin">
        <Spacing
          settings={currentSettings.padding}
          onChange={(settings) => onSettingsChange?.('padding', settings)}
        />
      </TabItem>
    </>
  );
};
