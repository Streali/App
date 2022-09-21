import { useEffect, useState } from 'react';
import { Button, ButtonColor, ButtonSize } from '../../button/button';
import { IconSVG } from '../../icon/icon';
import { Input } from '../input/input';

export interface BorderRadiusSettings {
  radius: number;
}

export interface BorderRadiusAllSettings {
  topLeft: BorderRadiusSettings;
  topRight: BorderRadiusSettings;
  bottomRight: BorderRadiusSettings;
  bottomLeft: BorderRadiusSettings;
}

export interface BorderRadiusProps {
  className?: string;
  onChange?: (settings: BorderRadiusAllSettings) => void;
  settings?: BorderRadiusAllSettings;
}

export const BorderRadius = (props: BorderRadiusProps) => {
  const { className = '', onChange, settings } = props;
  const [allBordersRadius, setAllBordersRadius] = useState<boolean>(true);
  const [selectBorder, setSelectBorder] = useState<
    'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'
  >('topRight');
  const [currentSettings, setCurrentSettings] = useState<BorderRadiusAllSettings>({
    topLeft: { radius: 4 },
    topRight: { radius: 4 },
    bottomRight: { radius: 4 },
    bottomLeft: { radius: 4 },
  });
  const borderRadiusPositions = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];

  const handleAllChanges = (key: 'radius', value: number) => {
    const newSettings = {
      topLeft: { ...currentSettings.topLeft, [key]: value },
      topRight: { ...currentSettings.topRight, [key]: value },
      bottomRight: { ...currentSettings.bottomRight, [key]: value },
      bottomLeft: { ...currentSettings.bottomLeft, [key]: value },
    };
    setCurrentSettings(newSettings);
    onChange && onChange(newSettings);
  };

  const handleChanges = (key: 'radius', value: number) => {
    const newSettings = {
      ...currentSettings,
      [selectBorder]: { ...currentSettings[selectBorder], [key]: value },
    };
    setCurrentSettings(newSettings);
    onChange && onChange(newSettings);
  };

  useEffect(() => {
    if (settings) {
      settings.topLeft === settings.topRight &&
      settings.topRight === settings.bottomRight &&
      settings.bottomRight === settings.bottomLeft
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
            defaultValue={currentSettings.topLeft.radius}
            className="w-full"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleAllChanges('radius', target.valueAsNumber);
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
              buttonIconSVG={{ svg: IconSVG.BorderRadiusTopLeft, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 !p-0 justify-center"
              color={selectBorder === 'topLeft' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('topLeft')}
            />
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderRadiusTopRight, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 !p-0 justify-center"
              color={selectBorder === 'topRight' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('topRight')}
            />
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderRadiusBottomRight, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 !p-0 justify-center"
              color={selectBorder === 'bottomRight' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('bottomRight')}
            />
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderRadiusBottomLeft, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 !p-0 justify-center"
              color={selectBorder === 'bottomLeft' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('bottomLeft')}
            />
          </div>
          <div className="flex-1 flex justify-end">
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderRadius, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 !p-0 justify-center"
              color={ButtonColor.Dark}
              onClick={() => setAllBordersRadius(true)}
            />
          </div>
        </div>
        {borderRadiusPositions.map((position) => (
          <div key={position}>
            {position === selectBorder && (
              <div className="flex w-full gap-2">
                <div className="flex-1">
                  <Input
                    type="number"
                    suffix="px"
                    defaultValue={currentSettings[position].radius}
                    className="w-full"
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      handleChanges('radius', target.valueAsNumber);
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
