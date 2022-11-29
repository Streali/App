import { Control, Controller } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { Alignment } from '~/components/forms/alignment/alignment';
import { Input } from '~/components/forms/input/input';
import { Select } from '~/components/forms/select/select';
import { Slider } from '~/components/forms/slider/slider';
import { Switch } from '~/components/forms/switch/switch';
import { animationList } from '~/utils/chat/animations';

interface TabGeneralProps {
  control: Control;
}

const eventTypeList = [
  { value: '10', label: 'Follow' },
  { value: '20', label: 'Bits' },
  { value: '30', label: 'Subscribe' },
  { value: '31', label: 'Subscription Gift' },
  { value: '40', label: 'Raid' },
  { value: '50', label: 'Hype Train Begin' },
  { value: '52', label: 'Hype Train End' },
  { value: '60', label: 'Goal Begin' },
  { value: '61', label: 'Goal End' },
];

const TabGeneral = (props: TabGeneralProps) => {
  const { control } = props;
  const [deleteEvent, setDeleteEvent] = useState(true);

  return (
    <div className="custom-scrollbar h-[calc(100vh_-_208px)] overflow-y-auto rounded-2xl bg-dark-600 p-6">
      <TabItem title="Title">
        <Controller
          name="title"
          control={control}
          defaultValue={'Event list title'}
          render={({ field: { onChange, value } }) => (
            <Input
              defaultValue={value}
              className="mb-3"
              type="text"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                onChange(target.value);
              }}
            />
          )}
        />
      </TabItem>
      <TabItem title="Events to see">
        <Controller
          name="events_activate"
          control={control}
          defaultValue={eventTypeList}
          render={({ field: { onChange, value } }) => (
            <Select
              options={eventTypeList}
              defaultValue={value}
              onChange={onChange}
              className="mb-3"
              multiple
            />
          )}
        />
      </TabItem>
      <TabItem title="Alignment">
        <Controller
          name="alignment"
          control={control}
          defaultValue={'right'}
          render={({ field: { onChange, value } }) => (
            <Alignment value={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Space between events">
        <Controller
          name="events_spacing"
          control={control}
          defaultValue={12}
          render={({ field: { onChange, value } }) => (
            <Slider
              min={0}
              max={100}
              step={1}
              value={[value]}
              haveInput
              inputSuffix="px"
              onChange={(value) => onChange(value[0])}
            />
          )}
        />
      </TabItem>
      <TabItem title="Animation in">
        <Controller
          name="animation_in"
          control={control}
          defaultValue={animationList[1].value}
          render={({ field: { onChange, value } }) => (
            <Select
              options={animationList}
              defaultValue={animationList.find((item) => item.value === value)}
              onChange={(value) => {
                const v = value as SingleValue<{ label: string; value: string }>;
                onChange(v?.value);
              }}
              className="mb-3"
            />
          )}
        />
      </TabItem>
      <TabItem title="Delete event after time">
        <Controller
          name="delete_event"
          control={control}
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
            <Switch
              checked={value}
              className="mb-3"
              onChange={(checked) => {
                onChange(checked);
                setDeleteEvent(checked);
              }}
            />
          )}
        />
      </TabItem>
      {deleteEvent && (
        <>
          <TabItem title="Duration before delete">
            <Controller
              name="duration_before_delete"
              control={control}
              defaultValue={7000}
              render={({ field: { onChange, value } }) => (
                <Slider
                  min={0}
                  max={60}
                  step={1}
                  value={[value / 1000]}
                  haveInput
                  inputSuffix="s"
                  onChange={(value) => onChange(value[0] * 1000)}
                />
              )}
            />
          </TabItem>
          <TabItem title="Animation out">
            <Controller
              name="animation_out"
              control={control}
              defaultValue={animationList[2]}
              render={({ field: { onChange, value } }) => (
                <Select
                  options={animationList}
                  defaultValue={animationList.find((item) => item.value === value)}
                  onChange={(value) => {
                    const v = value as SingleValue<{ label: string; value: string }>;
                    onChange(v?.value);
                  }}
                  className="mb-3"
                />
              )}
            />
          </TabItem>
        </>
      )}
    </div>
  );
};

export default TabGeneral;
