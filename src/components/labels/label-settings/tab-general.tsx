import { Control, Controller } from 'react-hook-form';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { DnDList } from '~/components/forms/dnd-list/dnd-list';
import { Input } from '~/components/forms/input/input';

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
      <TabItem title="Order">
        <Controller
          name="order"
          control={control}
          defaultValue={[
            { id: 'label', name: 'Label' },
            { id: 'value', name: 'Value' },
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
