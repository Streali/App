import { Button, ButtonColor } from '../../button/button';
import { Control, Controller } from 'react-hook-form';
import { Accordion } from '../../accordion/accordion';
import { Input } from '../../forms/input/input';
import { Icon } from '../../icon/icon';

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
        <div className="flex justify-between mb-5 items-center">
          <h1 className="font-semibold text-4xl font-title">{title}</h1>
          <Button type="submit" iconLeft="save-line" color={ButtonColor.Accent}>
            Save
          </Button>
        </div>
        <div className="p-6 bg-dark-600 rounded-2xl h-[calc(100vh_-_148px)] overflow-y-auto custom-scrollbar">
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
          <Accordion title="Elements">
            <div className="grid gap-4 grid-cols-3">
              <button onClick={() => addElement('image')} type="button">
                <div className="h-20 bg-primary-100 py-3 rounded-md flex items-center justify-center mb-2">
                  <Icon name="image-line" className="text-primary-500 text-2xl" />
                </div>
                <p className="text-sm font-medium">Image</p>
              </button>
              <button onClick={() => addElement('video')} type="button">
                <div className="h-20 bg-primary-100 py-3 rounded-md flex items-center justify-center mb-2">
                  <Icon name="film-line" className="text-primary-500 text-2xl" />
                </div>
                <p className="text-sm font-medium">Video</p>
              </button>
              <button onClick={() => addElement('text')} type="button">
                <div className="h-20 bg-primary-100 py-3 rounded-md flex items-center justify-center mb-2">
                  <Icon name="text" className="text-primary-500 text-2xl" />
                </div>
                <p className="text-sm font-medium">Text</p>
              </button>
              <button onClick={() => addElement('lottie')} type="button">
                <div className="h-20 bg-primary-100 py-3 rounded-md flex items-center justify-center mb-2">
                  <Icon name="play-fill" className="text-primary-500 text-2xl" />
                </div>
                <p className="text-sm font-medium">Lottie</p>
              </button>
              <button onClick={() => addElement('audio')} type="button">
                <div className="h-20 bg-primary-100 py-3 rounded-md flex items-center justify-center mb-2">
                  <Icon name="music-fill" className="text-primary-500 text-2xl" />
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
