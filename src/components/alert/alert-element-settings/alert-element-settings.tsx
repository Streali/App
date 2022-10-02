import { useEffect, useState, memo } from 'react';
import { TabItem } from '../../chat/chat-settings/tab-item';
import { Input } from '../../forms/input/input';
import { ImageSettings } from './image-settings';
import { LottieSettings } from './lottie-settings';
import { TextSettings } from './text-settings';
import { VideoSettings } from './video-settings';

export interface AlertElementSettingsProps {
  element: any;
  onTitleChange?: (title: string) => void;
  onSettingsChange?: (key: string, settings: any) => void;
}

export const AlertElementSettings = memo(function AlertElementSettings(
  props: AlertElementSettingsProps
) {
  const { element, onTitleChange, onSettingsChange } = props;
  const [currentElement, setCurrentElement] = useState(element);

  useEffect(() => {
    setCurrentElement(element);
  }, [element]);

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
          <Input value={currentElement.width} label="Width" disabled suffix="px" />
          <Input value={currentElement.height} label="Height" disabled suffix="px" />
        </div>
      </TabItem>
      <TabItem title="Position">
        <div className="mb-3 flex gap-3">
          <Input value={currentElement.posX} label="X" disabled suffix="px" />
          <Input value={currentElement.posY} label="Y" disabled suffix="px" />
        </div>
      </TabItem>
      {currentElement.type === 'text' && (
        <TextSettings settings={currentElement.settings} onSettingsChange={onSettingsChange} />
      )}
      {currentElement.type === 'image' && (
        <ImageSettings settings={currentElement.settings} onSettingsChange={onSettingsChange} />
      )}
      {currentElement.type === 'lottie' && (
        <LottieSettings settings={currentElement.settings} onSettingsChange={onSettingsChange} />
      )}
      {currentElement.type === 'video' && (
        <VideoSettings settings={currentElement.settings} onSettingsChange={onSettingsChange} />
      )}
    </div>
  );
});
