import { useEffect, useState } from 'react';
import { Button, ButtonColor, ButtonSize } from '../../button/button';
import { IconSVG } from '../../icon/icon';
import { Input } from '../input/input';

export interface SpacingSettings {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface SpacingProps {
  className?: string;
  onChange?: (settings: SpacingSettings) => void;
  settings?: SpacingSettings;
}

export const Spacing = (props: SpacingProps) => {
  const { className = '', onChange, settings } = props;
  const [allSpacing, setAllSpacing] = useState<boolean>(true);
  const [selectBorder, setSelectBorder] = useState<'left' | 'top' | 'right' | 'bottom'>('top');
  const [currentSettings, setCurrentSettings] = useState<SpacingSettings>({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
  const spacingPosition = ['left', 'top', 'right', 'bottom'];

  const handleAllChanges = (value: number) => {
    const newSettings = {
      left: value,
      top: value,
      right: value,
      bottom: value,
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
      settings.left === settings.top &&
      settings.top === settings.right &&
      settings.right === settings.bottom
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
            defaultValue={currentSettings.top}
            className="w-full"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleAllChanges(target.valueAsNumber);
            }}
          />
        </div>
        <Button
          buttonIconSVG={{ svg: IconSVG.Border, width: 20, height: 20 }}
          size={ButtonSize.Small}
          className="!w-10 !p-0 justify-center"
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
              className="!w-10 !p-0 justify-center"
              color={selectBorder === 'left' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('left')}
              type="button"
            />
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderTop, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 !p-0 justify-center"
              color={selectBorder === 'top' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('top')}
              type="button"
            />
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderRight, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 !p-0 justify-center"
              color={selectBorder === 'right' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('right')}
              type="button"
            />
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderBottom, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 !p-0 justify-center"
              color={selectBorder === 'bottom' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('bottom')}
              type="button"
            />
          </div>
          <div className="flex-1 flex justify-end">
            <Button
              buttonIconSVG={{ svg: IconSVG.Border, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 !p-0 justify-center"
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
