import { useEffect, useState } from 'react';
import { useLottieJson } from '../../../hooks/elements/use-lottie-json';
import { Button, ButtonColor, ButtonSize } from '../../button/button';
import { TabItem } from '../../chat/chat-settings/tab-item';
import { File } from '../../forms/file/file';
import { Input } from '../../forms/input/input';

export interface LottieSettingsProps {
  settings: any;
  onSettingsChange?: (key: string, settings: any) => void;
}

export const LottieSettings = (props: LottieSettingsProps) => {
  const { settings, onSettingsChange } = props;
  const [currentSettings, setCurrentSettings] = useState(settings);

  useEffect(() => {
    setCurrentSettings(settings);
  }, [settings]);

  const { data: animationData } = useLottieJson(currentSettings.url);
  return (
    <>
      <TabItem title="Lottie JSON">
        {currentSettings.url && (
          <>
            <Input value={currentSettings.url} className="mb-3" disabled />
            <Button
              color={ButtonColor.Error}
              size={ButtonSize.Very_Small}
              onClick={() => onSettingsChange?.('url', null)}
            >
              Delete Lottie animation
            </Button>
          </>
        )}
        {!currentSettings.url && <File accept={{ 'application/json': ['.json'] }} maxSize={5} />}
      </TabItem>
    </>
  );
};
