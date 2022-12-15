import { Control, Controller } from 'react-hook-form';
import { Alignment } from '~/components/forms/alignment/alignment';
import { BorderRadius } from '~/components/forms/border-radius/border-radius';
import { Border } from '~/components/forms/border/border';
import { Color } from '~/components/forms/color/color';
import { Shadow } from '~/components/forms/shadow/shadow';
import { Spacing } from '~/components/forms/spacing/spacing';
import { Switch } from '~/components/forms/switch/switch';
import { defaultChatTheme } from '~/utils/chat/default-chat-theme';
import { TabItem } from './tab-item';

export interface TabGeneralProps {
  control: Control;
}

export const TabContainer = (props: TabGeneralProps) => {
  const { control } = props;

  return (
    <div className="custom-scrollbar h-[calc(100vh_-_208px)] overflow-y-auto rounded-2xl bg-dark-600 p-6">
      <TabItem title="Full width">
        <Controller
          name="container.full_width"
          control={control}
          defaultValue={defaultChatTheme.container.full_width}
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
      <TabItem title="Background Twitch color">
        <Controller
          name="container.background_twitch_color"
          control={control}
          defaultValue={defaultChatTheme.container.background_twitch_color}
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
          name="container.background"
          control={control}
          defaultValue={defaultChatTheme.container.background}
          render={({ field: { onChange, value } }) => (
            <Color value={value} onColorChange={onChange} containerClassName="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Alignment">
        <Controller
          name="container.alignment"
          control={control}
          defaultValue={defaultChatTheme.global.alignment}
          render={({ field: { onChange, value } }) => (
            <Alignment className="mb-3" value={value} onChange={onChange} />
          )}
        />
      </TabItem>
      <TabItem title="Box Shadow">
        <Controller
          name="container.shadow"
          control={control}
          defaultValue={defaultChatTheme.container.shadow}
          render={({ field: { onChange, value } }) => (
            <Shadow settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Box border">
        <Controller
          name="container.border"
          control={control}
          defaultValue={defaultChatTheme.container.border}
          render={({ field: { onChange, value } }) => (
            <Border className="mb-3" onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Outer margin">
        <Controller
          name="container.margin"
          control={control}
          defaultValue={defaultChatTheme.container.margin}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Inner margin">
        <Controller
          name="container.padding"
          control={control}
          defaultValue={defaultChatTheme.container.padding}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Border radius">
        <Controller
          name="container.radius"
          control={control}
          defaultValue={defaultChatTheme.container.radius}
          render={({ field: { onChange, value } }) => (
            <BorderRadius settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
    </div>
  );
};
