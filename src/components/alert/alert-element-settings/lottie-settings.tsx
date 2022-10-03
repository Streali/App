import { Button, ButtonColor, ButtonSize } from '~/components/button/button';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { File } from '~/components/forms/file/file';
import { Input } from '~/components/forms/input/input';
import type { AlertElementLottieSettings } from '~/types/schemas/alert';

export interface LottieSettingsProps {
  settings: AlertElementLottieSettings;
  onSettingsChange?: (key: string, settings: unknown) => void;
}

export const LottieSettings = (props: LottieSettingsProps) => {
  const { settings, onSettingsChange } = props;
  const [currentSettings, setCurrentSettings] = useState(settings);

  useEffect(() => {
    setCurrentSettings(settings);
  }, [settings]);

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
