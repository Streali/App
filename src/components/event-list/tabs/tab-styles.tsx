import { Control, Controller } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { Button, ButtonColor, ButtonSize } from '~/components/button/button';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { Select } from '~/components/forms/select/select';
import { Switch } from '~/components/forms/switch/switch';
import { Modal } from '~/components/modal/modal';
import { toastr, ToastType } from '~/components/toast/toast';
import AllContent from './content/all-content';
import EventContent from './content/event-content';

interface TabEventsProps {
  control: Control;
  setValue: (name: string, value: unknown) => void;
}

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

const TabStyles = (props: TabEventsProps) => {
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
  const [modifyAllEvents, setModifyAllEvents] = useState(true);
  const [applyAll, setApplyAll] = useState(false);

  const handleApplyAll = () => {
    const values = control._getWatch().events.styles.all;

    eventSelect.forEach((event) => {
      setValue(`events.styles.${event.value}`, values);
    });

    toastr(ToastType.Success, 'All events styles have been updated');
    setApplyAll(false);
  };

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
