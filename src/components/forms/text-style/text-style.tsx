import { useState, useEffect } from 'react';
import { Button, ButtonColor, ButtonSize } from '../../button/button';
import { Icon } from '../../icon/icon';
import { Popover } from '../../popover/popover';
import Color from '../color/color';
import { FontSelect, FontVariants } from '../font-select/font-select';
import { Input } from '../input/input';
import { Select } from '../select/select';
import { Shadow } from '../shadow/shadow';

export interface TextStyleSettings {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  textAlign: string;
  textDecoration: string;
  fontStyle: string;
  letterSpacing: number;
  lineHeight: number;
  textShadow: { x: number; y: number; blur: number; color: string };
}

export interface TextStyleProps {
  onChange?: (settings: TextStyleSettings) => void;
  settings?: TextStyleSettings;
}

export const TextStyle = (props: TextStyleProps) => {
  const { onChange, settings } = props;

  const [fontVariants, setFontVariants] = useState<FontVariants[]>([
    { label: 'Thin', value: '100' },
    { label: 'Light', value: '300' },
    { label: 'Regular', value: 'regular' },
    { label: 'Medium', value: '500' },
    { label: 'Bold', value: '700' },
    { label: 'Black', value: '900' },
  ]);

  const [fontSettings, setFontSettings] = useState<TextStyleSettings>({
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '700',
    color: '#ff0000',
    textAlign: 'left',
    textDecoration: 'none',
    fontStyle: 'normal',
    letterSpacing: 0,
    lineHeight: 100,
    textShadow: { x: 0, y: 0, blur: 0, color: '#00000000' },
  });

  const [moreOpen, setMoreOpen] = useState<boolean>(false);

  const handleSettingsChange = (
    key:
      | 'fontFamily'
      | 'fontSize'
      | 'fontWeight'
      | 'color'
      | 'textAlign'
      | 'textDecoration'
      | 'fontStyle'
      | 'letterSpacing'
      | 'lineHeight'
      | 'textShadow',
    value: string | number | FontVariants[] | TextStyleSettings['textShadow']
  ) => {
    const currentSettings: TextStyleSettings = { ...fontSettings };
    switch (key) {
      case 'fontFamily':
        currentSettings.fontFamily = value as string;
        break;
      case 'fontSize':
        currentSettings.fontSize = value as number;
        break;
      case 'fontWeight':
        currentSettings.fontWeight = value as string;
        break;
      case 'color':
        currentSettings.color = value as string;
        break;
      case 'textAlign':
        currentSettings.textAlign = value as string;
        break;
      case 'textDecoration':
        currentSettings.textDecoration = value as string;
        break;
      case 'fontStyle':
        currentSettings.fontStyle = value as string;
        break;
      case 'letterSpacing':
        currentSettings.letterSpacing = value as number;
        break;
      case 'lineHeight':
        currentSettings.lineHeight = value as number;
        break;
      case 'textShadow':
        currentSettings.textShadow = value as TextStyleSettings['textShadow'];
        break;
    }

    setFontSettings(currentSettings);
    onChange && onChange(currentSettings);
  };

  useEffect(() => {
    if (settings) {
      setFontSettings(settings);
    }
  }, [settings]);

  return (
    <div className="w-full">
      <div className="flex w-full gap-2 flex-1 mb-2 min-w-full">
        <div className="w-2/3">
          <FontSelect
            value="Roboto"
            className="w-full"
            onChange={(font, variants) => {
              handleSettingsChange('fontFamily', font);
              setFontVariants(variants);
            }}
          />
        </div>
        <div className="flex gap-2 w-1/3">
          <div className="w-full">
            <Input
              type="number"
              defaultValue="16"
              className="w-full"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                handleSettingsChange('fontSize', target.valueAsNumber);
              }}
            />
          </div>
          <Color
            haveInput={false}
            className="shrink-0"
            onColorChange={(value) => handleSettingsChange('color', value)}
          />
        </div>
      </div>
      <div className="flex gap-2 mb-2">
        <div className="p-2 bg-dark-400 rounded-lg gap-2 flex h-10 w-1/3">
          <Button
            iconLeft="underline"
            className="h-full w-full justify-center"
            color={
              fontSettings.textDecoration === 'underline' ? ButtonColor.Primary : ButtonColor.Black
            }
            onClick={() => {
              const textDecoration = fontSettings.textDecoration;
              textDecoration === 'none'
                ? handleSettingsChange('textDecoration', 'underline')
                : handleSettingsChange('textDecoration', 'none');
            }}
          />
          <Button
            iconLeft="italic"
            className="h-full w-full justify-center"
            color={fontSettings.fontStyle === 'italic' ? ButtonColor.Primary : ButtonColor.Black}
            onClick={() => {
              const fontStyle = fontSettings.fontStyle;
              fontStyle === 'italic'
                ? handleSettingsChange('fontStyle', 'normal')
                : handleSettingsChange('fontStyle', 'italic');
            }}
          />
        </div>
        <div className="w-1/3">
          <Select
            options={fontVariants}
            defaultValue={{ label: 'Bold', value: '700' }}
            onChange={(value) => handleSettingsChange('fontWeight', value?.value || '')}
          />
        </div>
        <div className="p-2 bg-dark-400 rounded-lg gap-2 flex h-10 w-1/3">
          <Button
            iconLeft="align-left"
            className="h-full w-full justify-center"
            color={fontSettings.textAlign === 'left' ? ButtonColor.Primary : ButtonColor.Black}
            onClick={() => handleSettingsChange('textAlign', 'left')}
          />
          <Button
            iconLeft="align-center"
            className="h-full w-full justify-center"
            color={fontSettings.textAlign === 'center' ? ButtonColor.Primary : ButtonColor.Black}
            onClick={() => handleSettingsChange('textAlign', 'center')}
          />
          <Button
            iconLeft="align-right"
            className="h-full w-full justify-center"
            color={fontSettings.textAlign === 'right' ? ButtonColor.Primary : ButtonColor.Black}
            onClick={() => handleSettingsChange('textAlign', 'right')}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Popover
          open={moreOpen}
          align="end"
          width="350px"
          onOpenChange={(open) => setMoreOpen(open)}
          trigger={
            <Button
              size={ButtonSize.Micro}
              iconRight="arrow-down-s-line"
              color={ButtonColor.Accent}
            >
              More
            </Button>
          }
        >
          <div className="w-full">
            <div className="flex gap-2 mb-2">
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded-lg bg-black flex justify-center align-center items-center shrink-0">
                  <Icon name="text-spacing" />
                </div>
                <Input
                  type="number"
                  defaultValue={0}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    handleSettingsChange('letterSpacing', target.valueAsNumber);
                  }}
                />
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded-lg bg-black flex justify-center align-center items-center shrink-0">
                  <Icon name="line-height" />
                </div>
                <Input
                  type="number"
                  defaultValue={100}
                  step={10}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    handleSettingsChange('lineHeight', target.valueAsNumber);
                  }}
                />
              </div>
            </div>
            <p className="font-medium text-xs mb-2">Text shadow</p>
            <Shadow
              onChange={(settings) =>
                handleSettingsChange('textShadow', {
                  x: settings.shadowOffsetX,
                  y: settings.shadowOffsetY,
                  blur: settings.shadowBlur,
                  color: settings.shadowColor,
                })
              }
            />
          </div>
        </Popover>
      </div>
    </div>
  );
};
