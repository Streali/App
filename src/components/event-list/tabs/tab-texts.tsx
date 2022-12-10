import { SingleValue } from 'react-select';
import { SuggestionDataItem } from 'react-mentions';
import { Control, Controller } from 'react-hook-form';
import { EventType, EventTypeDict, EventTypeSlug } from '@streali/common';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { AutocompleteInput } from '~/components/forms/autocomplete-input/autocomplete-input';
import { Input } from '~/components/forms/input/input';
import { Select } from '~/components/forms/select/select';
import type { Enum } from '@streali/common';

type TabTextsProps = {
  control: Control;
};

type EventTypeSlugWithoutHypeTrainProgress = Exclude<
  Enum<typeof EventTypeSlug>,
  typeof EventTypeSlug[typeof EventType.HypeTrainProgress]
>;

type EventObject = Record<EventTypeSlugWithoutHypeTrainProgress, string | SuggestionDataItem[]>;

const eventSelectOptions = Array.from(EventTypeDict.values())
  .map((item) => ({
    label: item.label,
    value: item.slug,
  }))
  .filter((item) => item.value !== EventTypeSlug[EventType.HypeTrainProgress]);

const eventDefaultMessages: EventObject = {
  follow: '{{pseudo}} followed the channel!',
  cheer: '{{pseudo}} donated {{amount}} bits!',
  subscribe: '{{pseudo}} subscribed the channel with {{tier}}!',
  subscription_gift: '{{pseudo}} gifted {{amount}} subscription!',
  raid: '{{pseudo}} raided the channel with {{amount}} viewers!',
  hype_train_begin: 'Hype train began with {{level}} level!',
  hype_train_end: 'Hype train ended with {{level}} level!',
  goal_begin: 'Goal began with {{amount}} {{type}}!',
  goal_end: 'Goal ended with {{amount}} {{type}}!',
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
    { id: 'target', display: 'target amount' },
    { id: 'type', display: 'type' },
  ],
  goal_end: [
    { id: 'amount', display: 'amount' },
    { id: 'target', display: 'target amount' },
    { id: 'type', display: 'type' },
  ],
};

const TabTexts = (props: TabTextsProps) => {
  const { control } = props;
  const [selectedTab, setSelectedTab] = useState<EventTypeSlugWithoutHypeTrainProgress>('follow');

  const autocomplete = [
    {
      trigger: '#',
      options: eventAutocompleteOptions[selectedTab] as SuggestionDataItem[],
    },
  ];

  return (
    <div className="custom-scrollbar h-[calc(100vh_-_208px)] overflow-y-auto rounded-2xl bg-dark-600 p-6">
      <TabItem title="Event">
        <Select
          options={eventSelectOptions}
          defaultValue={eventSelectOptions.find((select) => select.value === selectedTab)}
          className="mb-3"
          onChange={(e) => {
            const val = e as SingleValue<{ value: string; label: string }>;
            if (val) {
              setSelectedTab(val.value as EventTypeSlugWithoutHypeTrainProgress);
            }
          }}
        />
        {eventSelectOptions.map(
          (event) =>
            event.value === selectedTab && (
              <TabItem title="Texts" key={event.value}>
                <div className="mb-3 rounded bg-dark-500 p-3 text-sm">
                  <p className="mb-3">
                    For the message, you can use # to add a dynamic text and surround your a word
                    with ** to make it accent.
                  </p>
                  <span className="rounded border border-dark-300 bg-dark-400 px-3 py-1 text-xs">
                    Ex: #pseudo follow the **channel**!
                  </span>
                </div>

                <Controller
                  name={`events.texts.${event.value}.name`}
                  control={control}
                  defaultValue={EventTypeDict.get(selectedTab)?.label}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      label="Event name"
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        onChange(target.value);
                      }}
                      className="mb-3"
                    />
                  )}
                />
                <Controller
                  name={`events.texts.${event.value}.message`}
                  control={control}
                  defaultValue={eventDefaultMessages[selectedTab] as string}
                  render={({ field: { onChange, value } }) => (
                    <AutocompleteInput
                      options={autocomplete}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      label="Event message"
                    />
                  )}
                />
              </TabItem>
            )
        )}
      </TabItem>
    </div>
  );
};

export default TabTexts;
