import { useEffect, useState } from 'react';
import { Button, ButtonColor, ButtonSize } from '../../button/button';
import { IconSVG } from '../../icon/icon';
import { Input } from '../input/input';

export interface SpacingSettings {
  width: number;
}

export interface SpacingAllSettings {
  left: SpacingSettings;
  top: SpacingSettings;
  right: SpacingSettings;
  bottom: SpacingSettings;
}

export interface SpacingProps {
  className?: string;
  onChange?: (settings: SpacingAllSettings) => void;
  settings?: SpacingAllSettings;
}

export const Spacing = (props: SpacingProps) => {
  const { className = '', onChange, settings } = props;
  const [allBordersRadius, setAllBordersRadius] = useState<boolean>(true);
  const [selectBorder, setSelectBorder] = useState<'left' | 'top' | 'right' | 'bottom'>('top');
  const [currentSettings, setCurrentSettings] = useState<SpacingAllSettings>({
    left: { width: 10 },
    top: { width: 10 },
    right: { width: 10 },
    bottom: { width: 10 },
  });
  const spacingPosition = ['left', 'top', 'right', 'bottom'];

  const handleAllChanges = (key: 'width', value: number) => {
    const newSettings = {
      left: { ...currentSettings.left, [key]: value },
      top: { ...currentSettings.top, [key]: value },
      right: { ...currentSettings.right, [key]: value },
      bottom: { ...currentSettings.bottom, [key]: value },
    };
    setCurrentSettings(newSettings);
    onChange && onChange(newSettings);
  };

  const handleChanges = (key: 'width', value: number) => {
    const newSettings = {
      ...currentSettings,
      [selectBorder]: { ...currentSettings[selectBorder], [key]: value },
    };
    setCurrentSettings(newSettings);
    onChange && onChange(newSettings);
  };

  useEffect(() => {
    if (settings) {
      settings.left === settings.top &&
      settings.top === settings.right &&
      settings.right === settings.bottom
        ? setAllBordersRadius(true)
        : setAllBordersRadius(false);
      setCurrentSettings(settings);
    }
  }, [settings, selectBorder, currentSettings]);

  if (allBordersRadius) {
    return (
      <div className={`flex w-full gap-2 ${className}`}>
        <div className="flex-1">
          <Input
            type="number"
            suffix="px"
            defaultValue={currentSettings.left.width}
            className="w-full"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleAllChanges('width', target.valueAsNumber);
            }}
          />
        </div>
        <Button
          buttonIconSVG={{ svg: IconSVG.BorderRadius, width: 20, height: 20 }}
          size={ButtonSize.Small}
          className="!w-10 !p-0 justify-center"
          onClick={() => setAllBordersRadius(false)}
        />
      </div>
    );
  } else {
    return (
      <div>
        <div className="mb-2 flex">
          <div className="flex gap-2">
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderLeft, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 !p-0 justify-center"
              color={selectBorder === 'left' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('left')}
            />
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderTop, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 !p-0 justify-center"
              color={selectBorder === 'top' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('top')}
            />
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderRight, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 !p-0 justify-center"
              color={selectBorder === 'right' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('right')}
            />
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderBottom, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 !p-0 justify-center"
              color={selectBorder === 'bottom' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('bottom')}
            />
          </div>
          <div className="flex-1 flex justify-end">
            <Button
              buttonIconSVG={{ svg: IconSVG.Border, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 !p-0 justify-center"
              color={ButtonColor.Dark}
              onClick={() => setAllBordersRadius(true)}
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
                    defaultValue={currentSettings[position].width}
                    className="w-full"
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      handleChanges('width', target.valueAsNumber);
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
