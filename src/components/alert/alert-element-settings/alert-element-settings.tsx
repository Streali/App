import { useEffect, useState, memo } from 'react';
import { TabItem } from '../../chat/chat-settings/tab-item';
import { Input } from '../../forms/input/input';
import { TextSettings } from './text-settings';

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
          value={currentElement.title}
          className="mb-3"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            onTitleChange && onTitleChange(target.value);
          }}
        />
      </TabItem>
      {currentElement.type === 'text' && (
        <TextSettings settings={currentElement.settings} onSettingsChange={onSettingsChange} />
      )}
    </div>
  );
});
