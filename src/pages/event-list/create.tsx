import { Enum, EventType, EventTypeDict, EventTypeLabel } from '@streali/common';
import { FieldValues, useForm } from 'react-hook-form';
import EventListDemo from '~/components/event-list/event-list-demo';
import EventListItem from '~/components/event-list/event-list-item/event-list-item';
import { EventListSettings } from '~/components/event-list/event-list-settings';
import { Select } from '~/components/forms/select/select';
import { useCreateEventList } from '~/hooks/event-list/use-create-event-list';
import { EventList } from '~/types/schemas/event-list';
import { defaultEventListTheme } from '~/utils/event-list/default-event-list-theme';
import { selectOptions } from '~/utils/event-list/select-options';
import { fakeEvent } from '~/utils/event/fake-events';

export const EventListCreate = () => {
  const [theme, setTheme] = useState<EventList>(defaultEventListTheme);
  const [selectEvent, setSelectEvent] = useState<{
    label: Enum<typeof EventTypeLabel>;
    value: `${Enum<typeof EventType>}`;
  }>({
    label: EventTypeDict.get(EventType.Follow)!.label,
    value: `${EventType.Follow}`,
  });

  const navigate = useNavigate();
  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: defaultEventListTheme as FieldValues,
  });

  const { mutate: saveTheme } = useCreateEventList();
  const onSubmit = handleSubmit((theme: FieldValues) => {
    saveTheme(theme as EventList, {
      onSuccess: () => {
        navigate('/event-lists');
      },
    });
  });

  useEffect(() => {
    const subscription = watch((value) => setTheme(value as EventList));
    return () => subscription.unsubscribe();
  }, [watch]);

  const type = EventTypeDict.get(Number(selectEvent.value));

  if (!type || type.value === EventType.HypeTrainProgress) {
    throw new Error(`EventType ${selectEvent.value} not found`);
  }

  const themeDemo = {
    ...theme,
    delete_event: false,
  };

  useEffect(() => {
    if (theme) {
      (async () => {
        const WebFont = await import('webfontloader');
        WebFont.load({
          google: {
            families: [
              theme.events.styles.all.message.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',
              theme.events.styles.all.name.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',

              theme.events.styles.follow.message.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',
              theme.events.styles.follow.name.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',

              theme.events.styles.subscribe.message.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',
              theme.events.styles.subscribe.name.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',

              theme.events.styles.subscription_gift.message.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',
              theme.events.styles.subscription_gift.name.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',

              theme.events.styles.raid.message.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',
              theme.events.styles.raid.name.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',

              theme.events.styles.cheer.message.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',
              theme.events.styles.cheer.name.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',

              theme.events.styles.hype_train_begin.message.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',
              theme.events.styles.hype_train_begin.name.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',

              theme.events.styles.hype_train_end.message.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',
              theme.events.styles.hype_train_end.name.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',

              theme.events.styles.goal_begin.message.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',
              theme.events.styles.goal_begin.name.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',

              theme.events.styles.goal_end.message.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',
              theme.events.styles.goal_end.name.text_style.fontFamily +
                ':100,200,300,400,500,600,700,800,900,950',
            ],
          },
        });
      })();
    }
  }, [theme]);

  return (
    <div className="flex gap-10 p-10">
      <div className="w-[450px] shrink-0">
        <EventListSettings control={control} setValue={setValue} onSubmit={onSubmit} />
      </div>

      <div className="flex w-full flex-1 flex-col items-end justify-center gap-6 rounded-2xl bg-dark-600 p-10">
        <Select
          options={selectOptions}
          defaultValue={selectEvent}
          onChange={(value) => setSelectEvent(Array.isArray(value) ? value[0] : value)}
          className="w-[200px]"
        />

        <EventListItem
          theme={themeDemo}
          type={type.slug}
          name={theme.events.texts[type.slug].name}
          message={theme.events.texts[type.slug].message}
          event={fakeEvent(Number(selectEvent.value))}
        />
      </div>

      <div className="flex h-[calc(100vh_-_80px)] flex-1 flex-col items-end justify-end overflow-hidden rounded-2xl bg-dark-600 p-10">
        <EventListDemo theme={theme} />
      </div>
    </div>
  );
};
