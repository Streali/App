import { FieldValues, useForm } from 'react-hook-form';
import { EventList } from '~/types/schemas/event-list';
import { defaultEventListTheme } from '~/utils/event-list/default-event-list-theme';
import { Button, ButtonColor } from '../button/button';
import { TabProps, Tabs } from '../tabs/tabs';
import TabGeneral from './tabs/tab-general';
import TabStyles from './tabs/tab-styles';
import TabTexts from './tabs/tab-texts';

type EventListSettingsProps = {
  onThemeChange: (theme: EventList) => void;
};

export const EventListSettings = (props: EventListSettingsProps) => {
  const { onThemeChange } = props;
  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: defaultEventListTheme as FieldValues,
  });

  const tabs: TabProps[] = [
    { title: 'General', content: <TabGeneral control={control} /> },
    { title: 'Texts', content: <TabTexts control={control} /> },
    {
      title: 'Styles',
      content: <TabStyles control={control} setValue={setValue} />,
    },
  ];

  const onSubmit = handleSubmit((theme: FieldValues) => {
    console.log(theme);
  });

  useEffect(() => {
    const subscription = watch((value) => onThemeChange(value as EventList));
    return () => subscription.unsubscribe();
  }, [watch, onThemeChange]);

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
