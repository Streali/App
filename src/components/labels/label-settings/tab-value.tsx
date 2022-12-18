import { Control, Controller } from 'react-hook-form';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { AutocompleteInput } from '~/components/forms/autocomplete-input/autocomplete-input';
import { BorderRadius } from '~/components/forms/border-radius/border-radius';
import { Border } from '~/components/forms/border/border';
import { Color } from '~/components/forms/color/color';
import { Shadow } from '~/components/forms/shadow/shadow';
import { Spacing } from '~/components/forms/spacing/spacing';
import { Switch } from '~/components/forms/switch/switch';
import { TextStyle } from '~/components/forms/text-style/text-style';
import { defaultChatTheme } from '~/utils/chat/default-chat-theme';

export interface TabValueProps {
  control: Control;
}

const autocomplete = [
  {
    trigger: '#',
    options: [
      { id: 'last_subscriber', display: 'last subscriber' },
      { id: 'subscriber_count', display: 'subscriber count' },
      { id: 'last_follower', display: 'last follower' },
      { id: 'follower_count', display: 'follower count' },
      { id: 'last_cheer_donor', display: 'last cheer donor' },
      { id: 'last_cheer_donor_amount', display: 'last cheer donor amount' },
      { id: 'viewer_count', display: 'viewer count' },
    ],
  },
];

const TabValue = (props: TabValueProps) => {
  const { control } = props;

  return (
    <div className="custom-scrollbar h-[calc(100vh_-_208px)] overflow-y-auto rounded-2xl bg-dark-600 p-6">
      <TabItem title="Full width">
        <Controller
          name="value.full_width"
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
          name="value.content"
          control={control}
          defaultValue={'{{last subscriber}}'}
          render={({ field: { onChange, value } }) => (
            <AutocompleteInput
              options={autocomplete}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              label="Event message"
              className="mb-3"
            />
          )}
        />
      </TabItem>
      <TabItem title="Text style">
        <Controller
          name="value.text"
          control={control}
          defaultValue={defaultChatTheme.name.text}
          render={({ field: { onChange, value } }) => (
            <TextStyle onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Accent style">
        <Controller
          name="value.accent"
          control={control}
          defaultValue={defaultChatTheme.name.text}
          render={({ field: { onChange, value } }) => (
            <TextStyle onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Box background">
        <Controller
          name="value.background"
          control={control}
          defaultValue={defaultChatTheme.name.background}
          render={({ field: { onChange, value } }) => (
            <Color value={value} onColorChange={onChange} containerClassName="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Box Shadow">
        <Controller
          name="value.shadow"
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
          name="value.margin"
          control={control}
          defaultValue={defaultChatTheme.name.margin}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Inner margin">
        <Controller
          name="value.padding"
          control={control}
          defaultValue={defaultChatTheme.name.padding}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Border radius">
        <Controller
          name="value.radius"
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

export default TabValue;
