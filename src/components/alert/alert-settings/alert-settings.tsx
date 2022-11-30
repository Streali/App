import { SingleValue } from 'react-select';
import { Button, ButtonColor } from '~/components/button/button';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { Input } from '~/components/forms/input/input';
import { Select } from '~/components/forms/select/select';
import { Slider } from '~/components/forms/slider/slider';
import { Icon } from '~/components/icon/icon';
import { Milliseconds } from '~/types/types/custom';
import { alertSize } from '~/utils/alert/alert-size';

export interface AlertSettingsProps {
  className?: string;
  title: string;
  addElement: (type: 'image' | 'text' | 'video' | 'lottie' | 'audio') => void;
  alertTitle: string;
  alertDuration: Milliseconds;
  alertDimension: string;
  onSettingsChange: (params: string, value: string | Milliseconds) => void;
  onAlertSave: () => void;
}

export const AlertSettings = (props: AlertSettingsProps) => {
  const {
    className = '',
    title,
    addElement,
    alertTitle,
    alertDuration,
    alertDimension,
    onSettingsChange,
    onAlertSave,
  } = props;

  return (
    <div className={className}>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-title text-4xl font-semibold">{title}</h1>
        <Button iconLeft="save-line" color={ButtonColor.Accent} onClick={onAlertSave}>
          Save
        </Button>
      </div>
      <div className="custom-scrollbar h-[calc(100vh_-_368px)] overflow-y-auto rounded-2xl bg-dark-600 p-6">
        <TabItem title="Title">
          <Input
            value={alertTitle}
            className="mb-3"
            type="text"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              onSettingsChange('title', target.value);
            }}
          />
        </TabItem>
        <TabItem title="Size">
          <Select
            defaultValue={alertSize.find((item) => item.value === alertDimension)}
            options={alertSize}
            onChange={(value) => {
              const v = value as SingleValue<{ value: string; label: string }>;
              onSettingsChange('size', v?.value || '1 / 1');
            }}
            className="mb-3"
          />
        </TabItem>
        <TabItem title="Duration">
          <Slider
            min={0}
            max={30}
            step={1}
            value={[alertDuration / 1000]}
            haveInput
            inputSuffix="s"
            onChange={(value) => onSettingsChange('size', (value[0] * 1000) as Milliseconds)}
          />
        </TabItem>
        <TabItem title="Elements">
          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => addElement('image')} type="button">
              <div className="mb-2 flex h-20 items-center justify-center rounded-md bg-primary-100 py-3">
                <Icon name="image-line" className="text-2xl text-primary-500" />
              </div>
              <p className="text-sm font-medium">Image</p>
            </button>
            <button onClick={() => addElement('video')} type="button">
              <div className="mb-2 flex h-20 items-center justify-center rounded-md bg-primary-100 py-3">
                <Icon name="film-line" className="text-2xl text-primary-500" />
              </div>
              <p className="text-sm font-medium">Video</p>
            </button>
            <button onClick={() => addElement('text')} type="button">
              <div className="mb-2 flex h-20 items-center justify-center rounded-md bg-primary-100 py-3">
                <Icon name="text" className="text-2xl text-primary-500" />
              </div>
              <p className="text-sm font-medium">Text</p>
            </button>
            <button onClick={() => addElement('lottie')} type="button">
              <div className="mb-2 flex h-20 items-center justify-center rounded-md bg-primary-100 py-3">
                <Icon name="play-fill" className="text-2xl text-primary-500" />
              </div>
              <p className="text-sm font-medium">Lottie</p>
            </button>
            <button onClick={() => addElement('audio')} type="button">
              <div className="mb-2 flex h-20 items-center justify-center rounded-md bg-primary-100 py-3">
                <Icon name="music-fill" className="text-2xl text-primary-500" />
              </div>
              <p className="text-sm font-medium">Audio</p>
            </button>
          </div>
        </TabItem>
      </div>
    </div>
  );
};
