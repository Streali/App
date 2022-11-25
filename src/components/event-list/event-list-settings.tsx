import { FieldValues, useForm } from 'react-hook-form';
import { Button, ButtonColor } from '../button/button';
import { TabProps, Tabs } from '../tabs/tabs';
import TabEvents from './tabs/tab-events';
import { TabGeneral } from './tabs/tab-general';

export const EventListSettings = () => {
  const { handleSubmit, control, setValue } = useForm();

  const tabs: TabProps[] = [
    { title: 'General', content: <TabGeneral control={control} /> },
    { title: 'Events', content: <TabEvents control={control} setValue={setValue} /> },
  ];

  const onSubmit = handleSubmit((theme: FieldValues) => {
    console.log(theme);
  });

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
