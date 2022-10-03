import { useEffect, useState } from 'react';
import { Button, ButtonColor, ButtonSize } from '~/components/button/button';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { File } from '~/components/forms/file/file';
import { Input } from '~/components/forms/input/input';
import type { AlertElementAudioSettings } from '~/types/schemas/alert';

export interface AudioSettingsProps {
  settings: AlertElementAudioSettings;
  onSettingsChange?: (key: string, settings: unknown) => void;
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
