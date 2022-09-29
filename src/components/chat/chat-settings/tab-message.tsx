import { Control, Controller } from 'react-hook-form';
import { defaultChatTheme } from '../../../utils/chat/default-chat-theme';
import { BorderRadius } from '../../forms/border-radius/border-radius';
import { Border } from '../../forms/border/border';
import { Color } from '../../forms/color/color';
import { Shadow } from '../../forms/shadow/shadow';
import { Spacing } from '../../forms/spacing/spacing';
import { Switch } from '../../forms/switch/switch';
import { TextStyle } from '../../forms/text-style/text-style';
import { TabItem } from './tab-item';

export interface TabGeneralProps {
  control: Control;
}

export const TabMessage = (props: TabGeneralProps) => {
  const { control } = props;

  return (
    <div className="custom-scrollbar h-[calc(100vh_-_208px)] overflow-y-auto rounded-2xl bg-dark-600 p-6">
      <TabItem title="Text style">
        <Controller
          name="message.text"
          control={control}
          defaultValue={defaultChatTheme.message.text}
          render={({ field: { onChange, value } }) => (
            <TextStyle onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Full width">
        <Controller
          name="message.full_width"
          control={control}
          defaultValue={defaultChatTheme.message.full_width}
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
      <TabItem title="Box background">
        <Controller
          name="message.background"
          control={control}
          defaultValue={defaultChatTheme.message.background}
          render={({ field: { onChange, value } }) => (
            <Color value={value} onColorChange={onChange} containerClassName="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Box Shadow">
        <Controller
          name="message.shadow"
          control={control}
          defaultValue={defaultChatTheme.message.shadow}
          render={({ field: { onChange, value } }) => (
            <Shadow settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Box border">
        <Controller
          name="message.border"
          control={control}
          defaultValue={defaultChatTheme.message.border}
          render={({ field: { onChange, value } }) => (
            <Border className="mb-3" onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Outer margin">
        <Controller
          name="message.margin"
          control={control}
          defaultValue={defaultChatTheme.message.margin}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Inner margin">
        <Controller
          name="message.padding"
          control={control}
          defaultValue={defaultChatTheme.message.padding}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Border radius">
        <Controller
          name="message.radius"
          control={control}
          defaultValue={defaultChatTheme.message.radius}
          render={({ field: { onChange, value } }) => (
            <BorderRadius settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
    </div>
  );
};
