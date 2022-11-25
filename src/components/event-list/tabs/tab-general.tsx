import { Control, Controller } from 'react-hook-form';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { Input } from '~/components/forms/input/input';
import { Select } from '~/components/forms/select/select';

interface TabGeneralProps {
  control: Control;
}

const eventTypeList = [
  { value: '10', label: 'Follow' },
  { value: '20', label: 'Cheer' },
  { value: '30', label: 'Subscribe' },
  { value: '31', label: 'Subscription Gift' },
  { value: '40', label: 'Raid' },
  { value: '50', label: 'Hype Train Begin' },
  { value: '52', label: 'Hype Train End' },
  { value: '60', label: 'Goal Begin' },
  { value: '61', label: 'Goal End' },
];

export const TabGeneral = (props: TabGeneralProps) => {
  const { control } = props;

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
    </div>
  );
};
