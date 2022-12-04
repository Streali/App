import { FieldValues, useForm } from 'react-hook-form';
import EventListDemo from '~/components/event-list/event-list-demo';
import EventListItem from '~/components/event-list/event-list-item/event-list-item';
import { EventListSettings } from '~/components/event-list/event-list-settings';
import { Select } from '~/components/forms/select/select';
import { useEventList } from '~/hooks/event-list/use-event-list';
import { useUpdateEventList } from '~/hooks/event-list/use-update-event-list';
import { EventList, EventListResponse } from '~/types/schemas/event-list';
import { fakeEvent } from '~/utils/event/fake-events';

const eventSelect = [
  { value: 10, label: 'Follow' },
  { value: 20, label: 'Bits' },
  { value: 30, label: 'Subscribe' },
  { value: 31, label: 'Subscription Gift' },
  { value: 40, label: 'Raid' },
  { value: 50, label: 'Hype Train Begin' },
  { value: 52, label: 'Hype Train End' },
  { value: 60, label: 'Goal Begin' },
  { value: 62, label: 'Goal End' },
];

const eventType = {
  Follow: 'follow',
  Bits: 'cheer',
  Subscribe: 'subscribe',
  'Subscription Gift': 'subscription_gift',
  Raid: 'raid',
  'Hype Train Begin': 'hype_train_begin',
  'Hype Train End': 'hype_train_end',
  'Goal Begin': 'goal_begin',
  'Goal End': 'goal_end',
};

export const EventListEdit = () => {
  const [theme, setTheme] = useState<EventList | null>(null);
  const [selectEvent, setSelectEvent] = useState<{ label: string; value: string }>({
    value: '10',
    label: 'Follow',
  });

  const { id } = useParams();
  const { data, status } = useEventList(id!);

  const navigate = useNavigate();
  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: data?.theme as FieldValues,
  });
  const { mutate: saveTheme } = useUpdateEventList();

  const onSubmit = handleSubmit((theme: FieldValues) => {
    saveTheme(
      { id: data?.id, theme: theme } as Omit<EventListResponse, 'created_at' | 'updated_at'>,
      {
        onSuccess: () => {
          navigate('/event-lists');
        },
      }
    );
  });

  useEffect(() => {
    data && setTheme(data.theme);

    const subscription = watch((value) => setTheme(value as EventList));
    return () => subscription.unsubscribe();
  }, [watch, data]);

  const type =
    eventType[
      selectEvent.label as
        | 'Follow'
        | 'Bits'
        | 'Subscribe'
        | 'Subscription Gift'
        | 'Raid'
        | 'Hype Train Begin'
        | 'Hype Train End'
        | 'Goal Begin'
        | 'Goal End'
    ];

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

  if (status === 'error' || !theme) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex gap-10 p-10">
      <div className="w-[450px] shrink-0">
        <EventListSettings control={control} setValue={setValue} onSubmit={onSubmit} />
      </div>
      <div className="flex w-full flex-1 flex-col items-end justify-center gap-6 rounded-2xl bg-dark-600 p-10">
        <Select
          options={eventSelect.map((event) => {
            return { label: event.label, value: event.value.toString() };
          })}
          defaultValue={selectEvent}
          onChange={(value) => setSelectEvent(value as { label: string; value: string })}
          className="w-[200px]"
        />
        <EventListItem
          theme={themeDemo as EventList}
          type={
            type as
              | 'follow'
              | 'cheer'
              | 'subscribe'
              | 'subscription_gift'
              | 'raid'
              | 'hype_train_begin'
              | 'hype_train_end'
              | 'goal_begin'
              | 'goal_end'
          }
          name={
            theme.events.texts[
              type as
                | 'follow'
                | 'cheer'
                | 'subscribe'
                | 'subscription_gift'
                | 'raid'
                | 'hype_train_begin'
                | 'hype_train_end'
                | 'goal_begin'
                | 'goal_end'
            ].name
          }
          message={
            theme.events.texts[
              type as
                | 'follow'
                | 'cheer'
                | 'subscribe'
                | 'subscription_gift'
                | 'raid'
                | 'hype_train_begin'
                | 'hype_train_end'
                | 'goal_begin'
                | 'goal_end'
            ].message
          }
          event={fakeEvent(parseInt(selectEvent.value))}
        />
      </div>
      <div className="flex h-[calc(100vh_-_80px)] flex-1 flex-col items-end justify-end overflow-hidden rounded-2xl bg-dark-600 p-10">
        <EventListDemo theme={theme} />
      </div>
    </div>
  );
};