import { SingleValue } from 'react-select';
import EventListItem from '~/components/event-list/event-list-item/event-list-item';
import { EventListSettings } from '~/components/event-list/event-list-settings';
import { Select } from '~/components/forms/select/select';
import { EventList } from '~/types/schemas/event-list';
import { defaultEventListTheme } from '~/utils/event-list/default-event-list-theme';
import { fakeEvent } from '~/utils/event/fake-events';

const eventSelect = [
  { value: '10', label: 'Follow' },
  { value: '20', label: 'Bits' },
  { value: '30', label: 'Subscribe' },
  { value: '31', label: 'Subscription Gift' },
  { value: '40', label: 'Raid' },
  { value: '50', label: 'Hype Train Begin' },
  { value: '52', label: 'Hype Train End' },
  { value: '60', label: 'Goal Begin' },
  { value: '62', label: 'Goal End' },
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

export const EventListCreate = () => {
  const [theme, setTheme] = useState<EventList>(defaultEventListTheme);
  const [selectEvent, setSelectEvent] = useState<{ label: string; value: string }>({
    value: '10',
    label: 'Follow',
  });

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

  return (
    <div className="flex gap-10 p-10">
      <div className="w-[450px] shrink-0">
        <EventListSettings onThemeChange={setTheme} />
      </div>
      <div className="flex w-full flex-1 flex-col items-end justify-center gap-6 rounded-2xl bg-dark-600 p-10">
        <Select
          options={eventSelect}
          defaultValue={selectEvent}
          onChange={(value) => setSelectEvent(value as { label: string; value: string })}
          className="w-[200px]"
        />
        <EventListItem
          theme={theme}
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
          event={fakeEvent(selectEvent.value)}
        />
      </div>
    </div>
  );
};
