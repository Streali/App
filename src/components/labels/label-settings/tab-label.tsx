import { Control, Controller } from 'react-hook-form';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { BorderRadius } from '~/components/forms/border-radius/border-radius';
import { Border } from '~/components/forms/border/border';
import { Color } from '~/components/forms/color/color';
import { Input } from '~/components/forms/input/input';
import { Shadow } from '~/components/forms/shadow/shadow';
import { Spacing } from '~/components/forms/spacing/spacing';
import { Switch } from '~/components/forms/switch/switch';
import { TextStyle } from '~/components/forms/text-style/text-style';
import { defaultChatTheme } from '~/utils/chat/default-chat-theme';

export interface TabLabelProps {
  control: Control;
}

const TabLabel = (props: TabLabelProps) => {
  const { control } = props;

  return (
    <div className="custom-scrollbar h-[calc(100vh_-_208px)] overflow-y-auto rounded-2xl bg-dark-600 p-6">
      <TabItem title="Show">
        <Controller
          name="label.show"
          control={control}
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <Switch checked={value} onChange={onChange} className="mb-3" label="Show the label" />
          )}
        />
      </TabItem>
      <TabItem title="Full width">
        <Controller
          name="label.full_width"
          control={control}
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <Switch
              checked={value}
              onChange={onChange}
              className="mb-3"
              label="Activate full width"
            />
          )}
        />
      </TabItem>
      <TabItem title="Content">
        <Controller
          name="label.content"
          control={control}
          defaultValue={'Last subscriber'}
          render={({ field: { onChange, value } }) => (
            <Input
              defaultValue={value}
              className="mb-3"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                onChange(target.value);
              }}
            />
          )}
        />
      </TabItem>
      <TabItem title="Text style">
        <Controller
          name="label.text"
          control={control}
          defaultValue={defaultChatTheme.name.text}
          render={({ field: { onChange, value } }) => (
            <TextStyle onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Box background">
        <Controller
          name="label.background"
          control={control}
          defaultValue={defaultChatTheme.name.background}
          render={({ field: { onChange, value } }) => (
            <Color value={value} onColorChange={onChange} containerClassName="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Box Shadow">
        <Controller
          name="label.shadow"
          control={control}
          defaultValue={defaultChatTheme.name.shadow}
          render={({ field: { onChange, value } }) => (
            <Shadow settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Box border">
        <Controller
          name="label.border"
          control={control}
          defaultValue={defaultChatTheme.name.border}
          render={({ field: { onChange, value } }) => (
            <Border className="mb-3" onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Outer margin">
        <Controller
          name="label.margin"
          control={control}
          defaultValue={defaultChatTheme.name.margin}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Inner margin">
        <Controller
          name="label.padding"
          control={control}
          defaultValue={defaultChatTheme.name.padding}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Border radius">
        <Controller
          name="label.radius"
          control={control}
          defaultValue={defaultChatTheme.name.radius}
          render={({ field: { onChange, value } }) => (
            <BorderRadius settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
    </div>
  );
};

export default TabLabel;
