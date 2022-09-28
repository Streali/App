import { useEffect, useState } from 'react';
import { SpacingType } from '../../../types/schemas/components';
import { Button, ButtonColor, ButtonSize } from '../../button/button';
import { IconSVG } from '../../icon/icon';
import { Input } from '../input/input';
export interface SpacingProps {
  className?: string;
  onChange?: (settings: SpacingType) => void;
  settings?: SpacingType;
}

export const Spacing = (props: SpacingProps) => {
  const { className = '', onChange, settings } = props;
  const [allSpacing, setAllSpacing] = useState<boolean>(true);
  const [selectBorder, setSelectBorder] = useState<'left' | 'top' | 'right' | 'bottom'>('top');
  const [currentSettings, setCurrentSettings] = useState<SpacingType>({
    left: settings ? settings.left : 0,
    top: settings ? settings.top : 0,
    right: settings ? settings.right : 0,
    bottom: settings ? settings.bottom : 0,
  });
  const spacingPosition = ['left', 'top', 'right', 'bottom'];

  const handleVerticalChanges = (value: number) => {
    const newSettings = {
      ...currentSettings,
      top: value,
      bottom: value,
    };
    setCurrentSettings(newSettings);
    onChange && onChange(newSettings);
  };

  const handleHorizontalChanges = (value: number) => {
    const newSettings = {
      ...currentSettings,
      left: value,
      right: value,
    };
    setCurrentSettings(newSettings);
    onChange && onChange(newSettings);
  };

  const handleChanges = (value: number) => {
    const newSettings = {
      ...currentSettings,
      [selectBorder]: value,
    };
    setCurrentSettings(newSettings);
    onChange && onChange(newSettings);
  };

  useEffect(() => {
    if (settings) {
      settings.left === settings.right && settings.top === settings.bottom
        ? setAllSpacing(true)
        : setAllSpacing(false);
      setCurrentSettings(settings);
    }
  }, []);

  if (allSpacing) {
    return (
      <div className={`flex w-full gap-2 ${className}`}>
        <div className="flex-1">
          <Input
            type="number"
            suffix="px"
            prefixIconSvg={IconSVG.BorderVertical}
            defaultValue={currentSettings.top}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleVerticalChanges(target.valueAsNumber);
            }}
          />
        </div>
        <div className="flex-1">
          <Input
            type="number"
            suffix="px"
            prefixIconSvg={IconSVG.BorderHorizontal}
            defaultValue={currentSettings.top}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleHorizontalChanges(target.valueAsNumber);
            }}
          />
        </div>
        <Button
          buttonIconSVG={{ svg: IconSVG.Border, width: 20, height: 20 }}
          size={ButtonSize.Small}
          className="!w-10 justify-center !p-0"
          onClick={() => setAllSpacing(false)}
          type="button"
        />
      </div>
    );
  } else {
    return (
      <div className={className}>
        <div className="mb-2 flex">
          <div className="flex gap-2">
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderLeft, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 justify-center !p-0"
              color={selectBorder === 'left' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('left')}
              type="button"
            />
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderTop, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 justify-center !p-0"
              color={selectBorder === 'top' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('top')}
              type="button"
            />
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderRight, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 justify-center !p-0"
              color={selectBorder === 'right' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('right')}
              type="button"
            />
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderBottom, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 justify-center !p-0"
              color={selectBorder === 'bottom' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('bottom')}
              type="button"
            />
          </div>
          <div className="flex flex-1 justify-end">
            <Button
              buttonIconSVG={{ svg: IconSVG.Border, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 justify-center !p-0"
              color={ButtonColor.Dark}
              onClick={() => setAllSpacing(true)}
              type="button"
            />
          </div>
        </div>
        {spacingPosition.map((position) => (
          <div key={position}>
            {position === selectBorder && (
              <div className="flex w-full gap-2">
                <div className="flex-1">
                  <Input
                    type="number"
                    suffix="px"
                    defaultValue={currentSettings[position]}
                    className="w-full"
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      handleChanges(target.valueAsNumber);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
};
