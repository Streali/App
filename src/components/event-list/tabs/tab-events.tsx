import { Control } from 'react-hook-form';
import { SuggestionDataItem } from 'react-mentions';
import { SingleValue } from 'react-select';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { Select } from '~/components/forms/select/select';
import EventContent from './content/event-content';

interface TabEventsProps {
  control: Control;
  setValue: (name: string, value: unknown) => void;
}

type EventObject = {
  follow: string | SuggestionDataItem[];
  cheer: string | SuggestionDataItem[];
  subscribe: string | SuggestionDataItem[];
  subscription_gift: string | SuggestionDataItem[];
  raid: string | SuggestionDataItem[];
  hype_train_begin: string | SuggestionDataItem[];
  hype_train_end: string | SuggestionDataItem[];
  goal_begin: string | SuggestionDataItem[];
  goal_end: string | SuggestionDataItem[];
};

const eventSelect = [
  { value: 'follow', label: 'Follow' },
  { value: 'cheer', label: 'Bits' },
  { value: 'subscribe', label: 'Subscribe' },
  { value: 'subscription_gift', label: 'Subscription Gift' },
  { value: 'raid', label: 'Raid' },
  { value: 'hype_train_begin', label: 'Hype Train Begin' },
  { value: 'hype_train_end', label: 'Hype Train End' },
  { value: 'goal_begin', label: 'Goal Begin' },
  { value: 'goal_end', label: 'Goal End' },
];

const eventDefaultMessages: EventObject = {
  follow: '{{pseudo}} follow the channel!',
  cheer: '{{pseudo}} donate {{amount}} bits!',
  subscribe: '{{pseudo}} subscribe the channel with {{tier}}!',
  subscription_gift: '{{pseudo}} gift {{amount}} subscription!',
  raid: '{{pseudo}} raid the channel with {{amount}} viewers!',
  hype_train_begin: 'Hype train begin with {{level}} level!',
  hype_train_end: 'Hype train end with {{level}} level!',
  goal_begin: 'Goal begin with {{amount}} {{type}}!',
  goal_end: 'Goal end with {{amount}} {{type}}!',
};

const eventAutocompleteOptions: EventObject = {
  follow: [{ id: 'pseudo', display: 'pseudo' }],
  cheer: [
    { id: 'pseudo', display: 'pseudo' },
    { id: 'amount', display: 'amount' },
  ],
  subscribe: [
    { id: 'pseudo', display: 'pseudo' },
    { id: 'tier', display: 'tier' },
    { id: 'months', display: 'cumulative months' },
    { id: 'streak', display: 'streak months' },
    { id: 'duration', display: 'duration months' },
  ],
  subscription_gift: [
    { id: 'pseudo', display: 'pseudo' },
    { id: 'amount', display: 'amount' },
    { id: 'tier', display: 'tier' },
    { id: 'cumulative', display: 'cumulative total' },
  ],
  raid: [
    { id: 'pseudo', display: 'pseudo' },
    { id: 'viewers', display: 'viewers' },
  ],
  hype_train_begin: [],
  hype_train_end: [{ id: 'level', display: 'level' }],
  goal_begin: [
    { id: 'amount', display: 'amount' },
    { id: 'type', display: 'type' },
  ],
  goal_end: [
    { id: 'amount', display: 'amount' },
    { id: 'type', display: 'type' },
  ],
};

const EventNameDefault = {
  follow: 'Follow',
  cheer: 'Bits',
  subscribe: 'Subscribe',
  subscription_gift: 'Subscription Gift',
  raid: 'Raid',
  hype_train_begin: 'Hype Train Begin',
  hype_train_end: 'Hype Train End',
  goal_begin: 'Goal Begin',
  goal_end: 'Goal End',
};

const TabEvents = (props: TabEventsProps) => {
  const { control, setValue } = props;
  const [selectedTab, setSelectedTab] = useState<
    | 'follow'
    | 'cheer'
    | 'subscribe'
    | 'subscription_gift'
    | 'raid'
    | 'hype_train_begin'
    | 'hype_train_end'
    | 'goal_begin'
    | 'goal_end'
  >('follow');

  return (
    <div className="custom-scrollbar h-[calc(100vh_-_208px)] overflow-y-auto rounded-2xl bg-dark-600 p-6">
      <TabItem title="Event">
        <Select
          options={eventSelect}
          defaultValue={eventSelect.find((select) => select.value === selectedTab)}
          className="mb-3"
          onChange={(e) => {
            const val = e as SingleValue<{ value: string; label: string }>;
            if (val) {
              setSelectedTab(
                val.value as
                  | 'follow'
                  | 'cheer'
                  | 'subscribe'
                  | 'subscription_gift'
                  | 'raid'
                  | 'hype_train_begin'
                  | 'hype_train_end'
                  | 'goal_begin'
                  | 'goal_end'
              );
            }
          }}
        />
      </TabItem>
      {eventSelect.map(
        (event) =>
          event.value === selectedTab && (
            <EventContent
              key={event.value}
              control={control}
              id={selectedTab}
              defaultContent={eventDefaultMessages[selectedTab] as string}
              defaultName={EventNameDefault[selectedTab]}
              options={eventAutocompleteOptions[selectedTab] as SuggestionDataItem[]}
            />
          )
      )}
    </div>
  );
};

export default TabEvents;
