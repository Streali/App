import { useEffect, useState } from 'react';
import { BorderRadiusType } from '../../../types/schemas/components';
import { Button, ButtonColor, ButtonSize } from '../../button/button';
import { IconSVG } from '../../icon/icon';
import { Input } from '../input/input';
export interface BorderRadiusProps {
  className?: string;
  onChange?: (settings: BorderRadiusType) => void;
  settings?: BorderRadiusType;
}

export const BorderRadius = (props: BorderRadiusProps) => {
  const { className = '', onChange, settings } = props;
  const [allBordersRadius, setAllBordersRadius] = useState<boolean>(true);
  const [selectBorder, setSelectBorder] = useState<
    'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'
  >('topRight');
  const [currentSettings, setCurrentSettings] = useState<BorderRadiusType>({
    topLeft: 0,
    topRight: 0,
    bottomRight: 0,
    bottomLeft: 0,
  });
  const borderRadiusPositions = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];

  const handleAllChanges = (value: number) => {
    const newSettings = {
      topLeft: value,
      topRight: value,
      bottomRight: value,
      bottomLeft: value,
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
      settings.topLeft === settings.topRight &&
      settings.topRight === settings.bottomRight &&
      settings.bottomRight === settings.bottomLeft
        ? setAllBordersRadius(true)
        : setAllBordersRadius(false);
      setCurrentSettings(settings);
    }
  }, []);

  if (allBordersRadius) {
    return (
      <div className={`flex w-full gap-2 ${className}`}>
        <div className="flex-1">
          <Input
            type="number"
            suffix="px"
            defaultValue={currentSettings.topLeft}
            className="w-full"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleAllChanges(target.valueAsNumber);
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
