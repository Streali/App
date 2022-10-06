import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { Input } from '~/components/forms/input/input';
import { Select } from '~/components/forms/select/select';
import { animationList } from '~/utils/chat/animations';
import { AudioSettings } from './audio-settings';
import { ImageSettings } from './image-settings';
import { LottieSettings } from './lottie-settings';
import { TextSettings } from './text-settings';
import { VideoSettings } from './video-settings';
import type {
  AlertElement,
  AlertElementAudioSettings,
  AlertElementImageSettings,
  AlertElementLottieSettings,
  AlertElementTextSettings,
  AlertElementVideoSettings,
} from '~/types/schemas/alert';

export interface AlertElementSettingsProps {
  element?: AlertElement;
  onTitleChange?: (title: string) => void;
  onSettingsChange?: (key: string, settings: unknown) => void;
  onPositionChange?: (position: 'width' | 'height' | 'posX' | 'posY', value: number) => void;
  onAnimationChange?: (position: 'in' | 'out', animation: string) => void;
}

export const AlertElementSettings = memo(function AlertElementSettings(
  props: AlertElementSettingsProps
) {
  const { element, onTitleChange, onSettingsChange, onPositionChange, onAnimationChange } = props;
  const [currentElement, setCurrentElement] = useState(element);

  useEffect(() => {
    setCurrentElement(element);
  }, [element]);

  if (!currentElement) {
    return <p>Error</p>;
  }

  return (
    <div className="custom-scrollbar h-[524px] w-full overflow-y-auto rounded-2xl bg-dark-600 p-5">
      <TabItem title="Title">
        <Input
          value={currentElement?.title}
          className="mb-3"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            onTitleChange && onTitleChange(target.value);
          }}
        />
      </TabItem>
      <TabItem title="Dimension">
        <div className="mb-3 flex gap-3">
          <Input
            value={currentElement.width}
            type="number"
            label="Width"
            suffix="px"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              onPositionChange && onPositionChange('width', target.valueAsNumber);
            }}
          />
          <Input
            value={currentElement.height}
            label="Height"
            type="number"
            suffix="px"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              onPositionChange && onPositionChange('height', target.valueAsNumber);
            }}
          />
        </div>
      </TabItem>
      <TabItem title="Position">
        <div className="mb-3 flex gap-3">
          <Input
            value={currentElement.posX}
            label="X"
            type="number"
            suffix="px"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              onPositionChange && onPositionChange('posX', target.valueAsNumber);
            }}
          />
          <Input
            value={currentElement.posY}
            label="Y"
            type="number"
            suffix="px"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              onPositionChange && onPositionChange('posY', target.valueAsNumber);
            }}
          />
        </div>
      </TabItem>
      {(currentElement.type === 'text' || currentElement.type === 'image') && (
        <TabItem title="Animation">
          <div className="mb-3 flex gap-3">
            <div className="flex-1">
              <Select
                className="w-full"
                label="Animation In"
                options={animationList}
                defaultValue={animationList.find(
                  (anim) => anim.value === currentElement.animation_in
                )}
                onChange={(value) =>
                  onAnimationChange && onAnimationChange('in', value?.value || 'none')
                }
              />
            </div>
            <div className="flex-1">
              <Select
                className="w-full"
                label="Animation Out"
                options={animationList}
                defaultValue={animationList.find(
                  (anim) => anim.value === currentElement.animation_out
                )}
                onChange={(value) =>
                  onAnimationChange && onAnimationChange('out', value?.value || 'none')
                }
              />
            </div>
          </div>
        </TabItem>
      )}
      {currentElement.type === 'text' && (
        <TextSettings
          settings={currentElement.settings as AlertElementTextSettings}
          onSettingsChange={onSettingsChange}
        />
      )}
      {currentElement.type === 'image' && (
        <ImageSettings
          settings={currentElement.settings as AlertElementImageSettings}
          onSettingsChange={onSettingsChange}
        />
      )}
      {currentElement.type === 'lottie' && (
        <LottieSettings
          settings={currentElement.settings as AlertElementLottieSettings}
          onSettingsChange={onSettingsChange}
        />
      )}
      {currentElement.type === 'video' && (
        <VideoSettings
          settings={currentElement.settings as AlertElementVideoSettings}
          onSettingsChange={onSettingsChange}
        />
      )}
      {currentElement.type === 'audio' && (
        <AudioSettings
          settings={currentElement.settings as AlertElementAudioSettings}
          onSettingsChange={onSettingsChange}
        />
      )}
    </div>
  );
});
