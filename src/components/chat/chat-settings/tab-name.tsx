import { Control, Controller } from 'react-hook-form';
import { Badges } from '~/components/forms/badges/badges';
import { BorderRadius } from '~/components/forms/border-radius/border-radius';
import { Border } from '~/components/forms/border/border';
import { Color } from '~/components/forms/color/color';
import { Shadow } from '~/components/forms/shadow/shadow';
import { Spacing } from '~/components/forms/spacing/spacing';
import { Switch } from '~/components/forms/switch/switch';
import { TextStyle } from '~/components/forms/text-style/text-style';
import { defaultChatTheme } from '~/utils/chat/default-chat-theme';
import { TabItem } from './tab-item';

export interface TabGeneralProps {
  control: Control;
}

export const TabName = (props: TabGeneralProps) => {
  const { control } = props;

  return (
    <div className="custom-scrollbar h-[calc(100vh_-_252px)] overflow-y-auto rounded-2xl bg-dark-600 p-6">
      <TabItem title="Full width">
        <Controller
          name="name.full_width"
          control={control}
          defaultValue={defaultChatTheme.name.full_width}
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
      <TabItem title="Text Twitch color">
        <Controller
          name="name.text_twitch_color"
          control={control}
          defaultValue={defaultChatTheme.name.text_twitch_color}
          render={({ field: { onChange, value } }) => (
            <Switch
              checked={value}
              onChange={onChange}
              className="mb-3"
              label="Use user Twitch color"
            />
          )}
        />
      </TabItem>
      <TabItem title="Text style">
        <Controller
          name="name.text"
          control={control}
          defaultValue={defaultChatTheme.name.text}
          render={({ field: { onChange, value } }) => (
            <TextStyle onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Background Twitch color">
        <Controller
          name="name.background_twitch_color"
          control={control}
          defaultValue={defaultChatTheme.message.background_twitch_color}
          render={({ field: { onChange, value } }) => (
            <Switch
              checked={value}
              onChange={onChange}
              className="mb-3"
              label="Use user Twitch color"
            />
          )}
        />
      </TabItem>
      <TabItem title="Box background">
        <Controller
          name="name.background"
          control={control}
          defaultValue={defaultChatTheme.name.background}
          render={({ field: { onChange, value } }) => (
            <Color value={value} onColorChange={onChange} containerClassName="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Box Shadow">
        <Controller
          name="name.shadow"
          control={control}
          defaultValue={defaultChatTheme.name.shadow}
          render={({ field: { onChange, value } }) => (
            <Shadow settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Box border">
        <Controller
          name="name.border"
          control={control}
          defaultValue={defaultChatTheme.name.border}
          render={({ field: { onChange, value } }) => (
            <Border className="mb-3" onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Outer margin">
        <Controller
          name="name.margin"
          control={control}
          defaultValue={defaultChatTheme.name.margin}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Inner margin">
        <Controller
          name="name.padding"
          control={control}
          defaultValue={defaultChatTheme.name.padding}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Border radius">
        <Controller
          name="name.radius"
          control={control}
          defaultValue={defaultChatTheme.name.radius}
          render={({ field: { onChange, value } }) => (
            <BorderRadius settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Badges">
        <Controller
          name="name.badges"
          control={control}
          defaultValue={defaultChatTheme.name.badges}
          render={({ field: { onChange, value } }) => (
            <Badges settings={value} onChange={onChange} />
          )}
        />
      </TabItem>
    </div>
  );
};
