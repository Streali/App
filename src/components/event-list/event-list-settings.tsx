import { Control } from 'react-hook-form';
import { EventTypeWithoutHypeTrainProgress } from '~/types/types/event-list';
import { Button, ButtonColor } from '../button/button';
import { TabProps, Tabs } from '../tabs/tabs';
import TabGeneral from './tabs/tab-general';
import TabStyles from './tabs/tab-styles';
import TabTexts from './tabs/tab-texts';

type EventListSettingsProps = {
  control: Control;
  setValue: (name: string, value: unknown) => void;
  onSubmit: () => void;
  chosenEvents: EventTypeWithoutHypeTrainProgress[];
};

export const EventListSettings = (props: EventListSettingsProps) => {
  const { control, setValue, onSubmit, chosenEvents } = props;

  const tabs: TabProps[] = [
    { title: 'General', content: <TabGeneral control={control} /> },
    { title: 'Texts', content: <TabTexts control={control} chosenEvents={chosenEvents} /> },
    {
      title: 'Styles',
      content: <TabStyles control={control} setValue={setValue} chosenEvents={chosenEvents} />,
    },
  ];

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-5 flex items-center justify-between">
          <h1 className="font-title text-4xl font-semibold">Event list</h1>
          <Button type="submit" iconLeft="save-line" color={ButtonColor.Accent}>
            Save
          </Button>
        </div>
        <Tabs content={tabs} />
      </form>
    </div>
  );
};
