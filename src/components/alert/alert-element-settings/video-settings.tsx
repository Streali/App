import { useEffect, useState } from 'react';
import { AlertElementVideoSettings } from '../../../types/schemas/alert';
import { Button, ButtonColor, ButtonSize } from '../../button/button';
import { TabItem } from '../../chat/chat-settings/tab-item';
import { File } from '../../forms/file/file';
import { Input } from '../../forms/input/input';

export interface VideoSettingsProps {
  settings: AlertElementVideoSettings;
  onSettingsChange?: (key: string, settings: unknown) => void;
}

export const VideoSettings = (props: VideoSettingsProps) => {
  const { settings, onSettingsChange } = props;
  const [currentSettings, setCurrentSettings] = useState(settings);

  useEffect(() => {
    setCurrentSettings(settings);
  }, [settings]);

  return (
    <>
      <TabItem title="Video">
        {currentSettings.url && (
          <>
            <Input value={currentSettings.url} className="mb-3" disabled />
            <Button
              color={ButtonColor.Error}
              size={ButtonSize.Very_Small}
              onClick={() => onSettingsChange?.('url', null)}
            >
              Delete video
            </Button>
          </>
        )}
        {!currentSettings.url && <File accept={{ 'video/mp4': ['.mp4', '.webm'] }} maxSize={10} />}
      </TabItem>
    </>
  );
};
