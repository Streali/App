import { EventType, EventTypeDict, EventTypeSlug } from '@streali/common';
import { Control, Controller } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { Button, ButtonColor, ButtonSize } from '~/components/button/button';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { Select } from '~/components/forms/select/select';
import { Switch } from '~/components/forms/switch/switch';
import { Modal } from '~/components/modal/modal';
import { toastr, ToastType } from '~/components/toast/toast';
import { EventTypeWithoutHypeTrainProgress } from '~/types/types/event-list';
import AllContent from './content/all-content';
import EventContent from './content/event-content';
import type { Enum } from '@streali/common';

interface TabEventsProps {
  control: Control;
  setValue: (name: string, value: unknown) => void;
  chosenEvents: EventTypeWithoutHypeTrainProgress[];
}

type EventTypeSlugWithoutHypeTrainProgress = Exclude<
  Enum<typeof EventTypeSlug>,
  typeof EventTypeSlug[typeof EventType.HypeTrainProgress]
>;

const TabStyles = (props: TabEventsProps) => {
  const { control, setValue, chosenEvents } = props;
  const [selectedTab, setSelectedTab] = useState<EventTypeSlugWithoutHypeTrainProgress>('follow');
  const [modifyAllEvents, setModifyAllEvents] = useState(control._formValues.events.modify_all);
  const [applyAll, setApplyAll] = useState(false);

  const handleApplyAll = () => {
    const values = control._getWatch().events.styles.all;

    eventSelectOptions.forEach((event) => {
      setValue(`events.styles.${event.value}`, values);
    });

    toastr(ToastType.Success, 'All events styles have been updated');
    setApplyAll(false);
  };

  const eventSelectOptions = useMemo(
    () =>
      Array.from(EventTypeDict.values())
        .filter((event) => chosenEvents.includes(event.value))
        .map((item) => ({
          label: item.label,
          value: item.slug,
        })),
    [chosenEvents]
  );

  return (
    <div className="custom-scrollbar h-[calc(100vh_-_208px)] overflow-y-auto rounded-2xl bg-dark-600 p-6">
      <TabItem title="Modify all events">
        <Controller
          name={`events.modify_all`}
          control={props.control}
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
            <div className="flex items-center justify-between">
              <Switch
                checked={value}
                className="mb-3"
                onChange={(checked) => {
                  onChange(checked);
                  setModifyAllEvents(checked);
                }}
              />

              {modifyAllEvents && (
                <Modal
                  open={applyAll}
                  title="Apply to all events"
                  onOpenChange={(open) => setApplyAll(open)}
                  buttons={
                    <>
                      <Button color={ButtonColor.Dark} onClick={() => setApplyAll(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleApplyAll}>Apply</Button>
                    </>
                  }
                  trigger={
                    <Button
                      className="mb-3"
                      size={ButtonSize.Very_Small}
                      color={ButtonColor.Dark}
                      onClick={() => setApplyAll(true)}
                    >
                      Apply to all events
                    </Button>
                  }
                >
                  <p>
                    This action will erase all your custom styles settings you have set previously.
                  </p>
                </Modal>
              )}
            </div>
          )}
        />
      </TabItem>

      {!modifyAllEvents ? (
        <>
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
          </TabItem>

          {eventSelectOptions.map(
            (event) =>
              event.value === selectedTab && (
                <EventContent key={event.value} control={control} id={selectedTab} />
              )
          )}
        </>
      ) : (
        <AllContent control={control} />
      )}
    </div>
  );
};

export default TabStyles;
