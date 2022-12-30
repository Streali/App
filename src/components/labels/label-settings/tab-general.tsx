import { Control, Controller } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { DnDList } from '~/components/forms/dnd-list/dnd-list';
import { Input } from '~/components/forms/input/input';
import { Select } from '~/components/forms/select/select';

export interface TabGeneralProps {
  control: Control;
}

const TabGeneral = (props: TabGeneralProps) => {
  const { control } = props;

  return (
    <div className="custom-scrollbar h-[calc(100vh_-_208px)] overflow-y-auto rounded-2xl bg-dark-600 p-6">
      <TabItem title="Title">
        <Controller
          name="title"
          control={control}
          defaultValue={'Last subscriber'}
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
      <TabItem title="Layout">
        <Controller
          name="layout"
          control={control}
          defaultValue={'stack'}
          render={({ field: { onChange, value } }) => (
            <Select
              defaultValue={{
                label: value[0].toUpperCase() + value.substring(1),
                value: value,
              }}
              onChange={(value) => {
                const v = value as SingleValue<{ value: string; label: string }>;
                onChange(v?.value);
              }}
              className="mb-3"
              options={[
                { label: 'Stack', value: 'stack' },
                { label: 'Inline', value: 'inline' },
              ]}
            />
          )}
        />
      </TabItem>
      <TabItem title="Order">
        <Controller
          name="order"
          control={control}
          defaultValue={[
            { id: 'label', name: 'Line 1' },
            { id: 'value', name: 'Line 2' },
          ]}
          render={({ field: { onChange, value } }) => (
            <DnDList elements={value} onChange={onChange} />
          )}
        />
      </TabItem>
    </div>
  );
};

export default TabGeneral;
