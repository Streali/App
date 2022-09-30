import { useState, useEffect } from 'react';
import { TextStyleType } from '../../../types/schemas/components';
import { convertFontWeight } from '../../../utils/fonts/convert-weight';
import { Button, ButtonColor, ButtonSize } from '../../button/button';
import { Icon } from '../../icon/icon';
import { Popover } from '../../popover/popover';
import { Color } from '../color/color';
import { FontSelect, FontVariants } from '../font-select/font-select';
import { Input } from '../input/input';
import { Select } from '../select/select';
import { Shadow } from '../shadow/shadow';

export interface TextStyleProps {
  onChange?: (settings: TextStyleType) => void;
  settings: TextStyleType;
}

export const TextStyle = (props: TextStyleProps) => {
  const { onChange, settings } = props;

  const [fontVariants, setFontVariants] = useState<FontVariants[]>([
    { label: 'Light', value: '300' },
    { label: 'Regular', value: '400' },
    { label: 'Medium', value: '500' },
    { label: 'Semi Bold', value: '600' },
    { label: 'Bold', value: '700' },
    { label: 'Extra Bold', value: '800' },
    { label: 'Black', value: '900' },
  ]);

  const [fontSettings, setFontSettings] = useState<TextStyleType>(settings);

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
    value: string | number | FontVariants[] | TextStyleType['textShadow']
  ) => {
    const currentSettings: TextStyleType = { ...fontSettings };
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
        currentSettings.textShadow = value as TextStyleType['textShadow'];
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
      <div className="mb-2 flex w-full min-w-full flex-1 gap-2">
        <div className="w-2/3">
          <FontSelect
            value={fontSettings.fontFamily}
            className="w-full"
            onChange={(font, variants) => {
              handleSettingsChange('fontFamily', font);
              setFontVariants(variants);
            }}
          />
        </div>
        <div className="flex w-1/3 gap-2">
          <div className="w-full">
            <Input
              type="number"
              value={fontSettings.fontSize}
              className="w-full !px-3"
              suffix="px"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                handleSettingsChange('fontSize', target.valueAsNumber);
              }}
            />
          </div>
          <Color
            haveInput={false}
            value={fontSettings.color}
            className="shrink-0"
            onColorChange={(value) => handleSettingsChange('color', value)}
            align="end"
          />
        </div>
      </div>
      <div className="mb-2 flex gap-2">
        <div className="flex h-10 w-1/3 shrink-0 gap-2 rounded-lg bg-dark-400 p-2">
          <Button
            iconLeft="underline"
            className="h-full w-auto flex-1 justify-center rounded text-xs"
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
            className="h-full w-auto flex-1 justify-center rounded text-xs"
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
            defaultValue={{
              label: convertFontWeight(fontSettings.fontWeight),
              value: fontSettings.fontWeight,
            }}
            onChange={(value) => handleSettingsChange('fontWeight', value?.value || '')}
          />
        </div>
        <div className="flex h-10 w-1/3 shrink-0 gap-2 rounded-lg bg-dark-400 p-2">
          <Button
            buttonIcon="align-left"
            className="h-full w-auto flex-1 justify-center rounded px-0 text-xs"
            color={fontSettings.textAlign === 'left' ? ButtonColor.Primary : ButtonColor.Black}
            onClick={() => handleSettingsChange('textAlign', 'left')}
          />
          <Button
            buttonIcon="align-center"
            className="h-full w-auto flex-1 justify-center rounded px-0 text-xs"
            color={fontSettings.textAlign === 'center' ? ButtonColor.Primary : ButtonColor.Black}
            onClick={() => handleSettingsChange('textAlign', 'center')}
          />
          <Button
            buttonIcon="align-right"
            className="h-full w-auto flex-1 justify-center rounded px-0 text-xs"
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
          color="dark"
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
            <div className="mb-2 flex gap-2">
              <div className="flex gap-2">
                <div className="align-center flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black">
                  <Icon name="text-spacing" />
                </div>
                <Input
                  type="number"
                  defaultValue={fontSettings.letterSpacing}
                  suffix="px"
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    handleSettingsChange('letterSpacing', target.valueAsNumber);
                  }}
                />
              </div>
              <div className="flex gap-2">
                <div className="align-center flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black">
                  <Icon name="line-height" />
                </div>
                <Input
                  type="number"
                  defaultValue={fontSettings.lineHeight}
                  step={10}
                  suffix="%"
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    handleSettingsChange('lineHeight', target.valueAsNumber);
                  }}
                />
              </div>
            </div>
            <p className="mb-2 text-xs font-medium">Text shadow</p>
            <Shadow
              settings={{
                shadowOffsetX: fontSettings.textShadow.shadowOffsetX,
                shadowOffsetY: fontSettings.textShadow.shadowOffsetY,
                shadowBlur: fontSettings.textShadow.shadowBlur,
                shadowColor: fontSettings.textShadow.shadowColor,
              }}
              onChange={(settings) => handleSettingsChange('textShadow', settings)}
            />
          </div>
        </Popover>
      </div>
    </div>
  );
};
