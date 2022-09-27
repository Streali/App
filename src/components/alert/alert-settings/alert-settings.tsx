import { Button, ButtonColor } from '../../button/button';
import { Control, Controller } from 'react-hook-form';
import { Accordion } from '../../accordion/accordion';
import { Input } from '../../forms/input/input';
import { Icon } from '../../icon/icon';
import { Slider } from '../../forms/slider/slider';

export interface AlertSettingsProps {
  className?: string;
  title: string;
  control: Control;
  addElement: (type: 'image' | 'text' | 'video' | 'lottie' | 'audio') => void;
}

export const AlertSettings = (props: AlertSettingsProps) => {
  const { className = '', title, control, addElement } = props;

  return (
    <div className={className}>
      <form onSubmit={() => console.log('ok')}>
        <div className="mb-5 flex items-center justify-between">
          <h1 className="font-title text-4xl font-semibold">{title}</h1>
          <Button type="submit" iconLeft="save-line" color={ButtonColor.Accent}>
            Save
          </Button>
        </div>
        <div className="custom-scrollbar h-[calc(100vh_-_488px)] overflow-y-auto rounded-2xl bg-dark-600 p-6">
          <Accordion title="Title">
            <Controller
              name="title"
              control={control}
              defaultValue={'New alert'}
              render={({ field: { onChange, value } }) => (
                <Input
                  defaultValue={value}
                  className="mb-3"
                  type="text"
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    onChange(target.value);
                  }}
                />
              )}
            />
          </Accordion>
          <Accordion title="Width">
            <Controller
              name="width"
              control={control}
              defaultValue={500}
              render={({ field: { onChange, value } }) => (
                <Input
                  defaultValue={value}
                  className="mb-3"
                  type="number"
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    onChange(target.valueAsNumber);
                  }}
                />
              )}
            />
          </Accordion>
          <Accordion title="Height">
            <Controller
              name="height"
              control={control}
              defaultValue={500}
              render={({ field: { onChange, value } }) => (
                <Input
                  defaultValue={value}
                  className="mb-3"
                  type="number"
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    onChange(target.valueAsNumber);
                  }}
                />
              )}
            />
          </Accordion>
          <Accordion title="Duration">
            <Controller
              name="duration"
              control={control}
              defaultValue={5000}
              render={({ field: { onChange, value } }) => (
                <Slider
                  min={0}
                  max={30}
                  step={1}
                  value={[value / 1000]}
                  haveInput
                  inputSuffix="s"
                  onChange={(value) => onChange(value[0] * 1000)}
                />
              )}
            />
          </Accordion>
          <Accordion title="Elements">
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
          </Accordion>
        </div>
      </form>
    </div>
  );
};
