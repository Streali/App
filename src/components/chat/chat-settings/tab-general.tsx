import { Control, Controller } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { Alignment } from '~/components/forms/alignment/alignment';
import { DnDList } from '~/components/forms/dnd-list/dnd-list';
import { Input } from '~/components/forms/input/input';
import { Select } from '~/components/forms/select/select';
import { Slider } from '~/components/forms/slider/slider';
import { animationList } from '~/utils/chat/animations';
import { defaultChatTheme } from '~/utils/chat/default-chat-theme';
import { TabItem } from './tab-item';

export interface TabGeneralProps {
  control: Control;
}

export const TabGeneral = (props: TabGeneralProps) => {
  const { control } = props;

  return (
    <div className="custom-scrollbar h-[calc(100vh_-_208px)] overflow-y-auto rounded-2xl bg-dark-600 p-6">
      <TabItem title="Title">
        <Controller
          name="title"
          control={control}
          defaultValue={defaultChatTheme.title}
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
      <TabItem title="Space between messages">
        <Controller
          name="global.space_between_messages"
          control={control}
          defaultValue={defaultChatTheme.global.space_between_messages}
          render={({ field: { onChange, value } }) => (
            <Slider
              className="mb-3"
              max={100}
              min={0}
              onChange={(value) => onChange(value[0])}
              value={[value]}
              haveInput
              inputSuffix="px"
            />
          )}
        />
      </TabItem>
      <TabItem title="Alignment">
        <Controller
          name="global.alignment"
          control={control}
          defaultValue={defaultChatTheme.global.alignment}
          render={({ field: { onChange, value } }) => (
            <Alignment className="mb-3" value={value} onChange={onChange} />
          )}
        />
      </TabItem>
      <TabItem title="Animation">
        <Controller
          name="global.animation"
          control={control}
          defaultValue={defaultChatTheme.global.animation}
          render={({ field: { onChange, value } }) => (
            <Select
              defaultValue={animationList.find((item) => item.value === value)}
              onChange={(value) => {
                const v = value as SingleValue<{ value: string; label: string }>;
                onChange(v?.value);
              }}
              className="mb-3"
              options={animationList}
            />
          )}
        />
      </TabItem>
      <TabItem title="Layout">
        <Controller
          name="global.layout"
          control={control}
          defaultValue={defaultChatTheme.global.layout}
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
          name="global.order"
          control={control}
          defaultValue={[
            { id: 'name', name: 'Name' },
            { id: 'message', name: 'Message' },
          ]}
          render={({ field: { onChange, value } }) => (
            <DnDList elements={value} onChange={onChange} />
          )}
        />
      </TabItem>
    </div>
  );
};
