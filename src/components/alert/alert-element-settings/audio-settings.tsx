import { useEffect, useState } from 'react';
import { Button, ButtonColor, ButtonSize } from '../../button/button';
import { TabItem } from '../../chat/chat-settings/tab-item';
import { File } from '../../forms/file/file';
import { Input } from '../../forms/input/input';

export interface AudioSettingsProps {
  settings: any;
  onSettingsChange?: (key: string, settings: any) => void;
}

export const AudioSettings = (props: AudioSettingsProps) => {
  const { settings, onSettingsChange } = props;
  const [currentSettings, setCurrentSettings] = useState(settings);

  useEffect(() => {
    setCurrentSettings(settings);
  }, [settings]);

  return (
    <>
      <TabItem title="Audio">
        {currentSettings.url && (
          <>
            <Input value={currentSettings.url} className="mb-3" disabled />
            <Button
              color={ButtonColor.Error}
              size={ButtonSize.Very_Small}
              onClick={() => onSettingsChange?.('url', null)}
            >
              Delete audio
            </Button>
          </>
        )}
        {!currentSettings.url && <File accept={{ 'audio/mp3': ['.mp3'] }} maxSize={5} />}
      </TabItem>
    </>
  );
};
