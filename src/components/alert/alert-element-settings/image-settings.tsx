import { useEffect, useState } from 'react';
import { AlertElementImageSettings } from '../../../types/schemas/alert';
import { Button, ButtonColor, ButtonSize } from '../../button/button';
import { TabItem } from '../../chat/chat-settings/tab-item';
import { File } from '../../forms/file/file';
import { Input } from '../../forms/input/input';

export interface ImageSettingsProps {
  settings: AlertElementImageSettings;
  onSettingsChange?: (key: string, settings: unknown) => void;
}

export const ImageSettings = (props: ImageSettingsProps) => {
  const { settings, onSettingsChange } = props;
  const [currentSettings, setCurrentSettings] = useState(settings);

  useEffect(() => {
    setCurrentSettings(settings);
  }, [settings]);

  return (
    <>
      <TabItem title="Image">
        {currentSettings.url && (
          <>
            <Input value={currentSettings.url} className="mb-3" disabled />
            <Button
              color={ButtonColor.Error}
              size={ButtonSize.Very_Small}
              onClick={() => onSettingsChange?.('url', null)}
            >
              Delete image
            </Button>
          </>
        )}
        {!currentSettings.url && (
          <File accept={{ 'image/png': ['.png', '.jpg', '.jpeg', '.svg', '.gif'] }} maxSize={5} />
        )}
      </TabItem>
    </>
  );
};
