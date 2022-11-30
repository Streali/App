import { SingleValue } from 'react-select';
import { Button, ButtonColor, ButtonSize } from '~/components/button/button';
import { Color } from '~/components/forms/color/color';
import { Input } from '~/components/forms/input/input';
import { Select } from '~/components/forms/select/select';
import { IconSVG } from '~/components/icon/icon';
import type { BorderSettingsType } from '~/types/schemas/components';

export interface BorderProps {
  className?: string;
  onChange?: (settings: BorderSettingsType) => void;
  settings?: BorderSettingsType;
}

export const Border = (props: BorderProps) => {
  const { className = '', onChange, settings } = props;
  const [allBorders, setAllBorders] = useState<boolean>(true);
  const [selectBorder, setSelectBorder] = useState<'top' | 'right' | 'bottom' | 'left'>('top');
  const [currentSettings, setCurrentSettings] = useState<BorderSettingsType>({
    top: { color: '#000000', width: 0, style: 'solid' },
    right: { color: '#000000', width: 0, style: 'solid' },
    bottom: { color: '#000000', width: 0, style: 'solid' },
    left: { color: '#000000', width: 0, style: 'solid' },
  });
  const borderPositions = ['top', 'right', 'bottom', 'left'];

  const borderStyleOptions = [
    { label: 'Solid', value: 'solid' },
    { label: 'Dashed', value: 'dashed' },
    { label: 'Dotted', value: 'dotted' },
  ];

  const handleAllChanges = (key: 'color' | 'width' | 'style', value: string | number) => {
    const newSettings = {
      top: { ...currentSettings.top, [key]: value },
      right: { ...currentSettings.right, [key]: value },
      bottom: { ...currentSettings.bottom, [key]: value },
      left: { ...currentSettings.left, [key]: value },
    };
    setCurrentSettings(newSettings);
    onChange && onChange(newSettings);
  };

  const handleChanges = (key: 'color' | 'width' | 'style', value: string | number) => {
    const newSettings = {
      ...currentSettings,
      [selectBorder]: { ...currentSettings[selectBorder], [key]: value },
    };
    setCurrentSettings(newSettings);
    onChange && onChange(newSettings);
  };

  useEffect(() => {
    if (settings) {
      JSON.stringify(settings.top) === JSON.stringify(settings.right) &&
      JSON.stringify(settings.right) === JSON.stringify(settings.bottom) &&
      JSON.stringify(settings.bottom) === JSON.stringify(settings.left)
        ? setAllBorders(true)
        : setAllBorders(false);
      setCurrentSettings(settings);
    }
  }, []);

  if (allBorders) {
    return (
      <div className={`flex w-full gap-2 ${className}`}>
        <Color
          haveInput={false}
          value={currentSettings.top.color}
          onColorChange={(value) => handleAllChanges('color', value)}
        />
        <div className="flex-1">
          <Input
            type="number"
            suffix="px"
            defaultValue={currentSettings.top.width}
            className="w-full"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleAllChanges('width', target.valueAsNumber);
            }}
          />
        </div>
        <div className="flex-1">
          <Select
            options={borderStyleOptions}
            defaultValue={
              borderStyleOptions.find((style) => style.value === currentSettings.top.style) || {
                label: 'Solid',
                value: 'solid',
              }
            }
            className="w-full"
            onChange={(value) => {
              const v = value as SingleValue<{ value: string; label: string }>;
              handleAllChanges('style', v?.value || 'solid');
            }}
          />
        </div>
        <Button
          buttonIconSVG={{ svg: IconSVG.Border, width: 20, height: 20 }}
          size={ButtonSize.Small}
          className="!w-10 justify-center !p-0"
          onClick={() => setAllBorders(false)}
        />
      </div>
    );
  } else {
    return (
      <div className={className}>
        <div className="mb-2 flex">
          <div className="flex gap-2">
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderTop, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 justify-center !p-0"
              color={selectBorder === 'top' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('top')}
            />
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderRight, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 justify-center !p-0"
              color={selectBorder === 'right' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('right')}
            />
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderBottom, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 justify-center !p-0"
              color={selectBorder === 'bottom' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('bottom')}
            />
            <Button
              buttonIconSVG={{ svg: IconSVG.BorderLeft, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 justify-center !p-0"
              color={selectBorder === 'left' ? ButtonColor.Primary : ButtonColor.Dark}
              onClick={() => setSelectBorder('left')}
            />
          </div>
          <div className="flex flex-1 justify-end">
            <Button
              buttonIconSVG={{ svg: IconSVG.Border, width: 20, height: 20 }}
              size={ButtonSize.Small}
              className="!w-10 justify-center !p-0"
              color={ButtonColor.Dark}
              onClick={() => setAllBorders(true)}
            />
          </div>
        </div>
        {borderPositions.map((position) => (
          <div key={position}>
            {position === selectBorder && (
              <div className="flex w-full gap-2">
                <Color
                  haveInput={false}
                  value={currentSettings[position].color}
                  onColorChange={(value) => handleChanges('color', value)}
                />
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
                <div className="flex-1">
                  <Select
                    options={borderStyleOptions}
                    defaultValue={
                      borderStyleOptions.find(
                        (style) => style.value === currentSettings[position].style
                      ) || {
                        label: 'Solid',
                        value: 'solid',
                      }
                    }
                    className="w-full"
                    onChange={(value) => {
                      const v = value as SingleValue<{ value: string; label: string }>;
                      handleChanges('style', v?.value || 'solid');
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
