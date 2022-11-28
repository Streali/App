import { Control, Controller } from 'react-hook-form';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { BorderRadius } from '~/components/forms/border-radius/border-radius';
import { Border } from '~/components/forms/border/border';
import { Color } from '~/components/forms/color/color';
import { Shadow } from '~/components/forms/shadow/shadow';
import { Spacing } from '~/components/forms/spacing/spacing';
import { TextStyle } from '~/components/forms/text-style/text-style';
import { defaultEventListTheme } from '~/utils/event-list/default-event-list-theme';

const MessageContent = (props: { id: string; control: Control }) => {
  return (
    <div>
      <TabItem title="Text style">
        <Controller
          name={`events.styles.${props.id}.message.text_style`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.message.text_style}
          render={({ field: { onChange, value } }) => (
            <TextStyle onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Background">
        <Controller
          name={`events.styles.${props.id}.message.background`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.message.background}
          render={({ field: { onChange, value } }) => (
            <Color value={value} onColorChange={onChange} containerClassName="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Box border">
        <Controller
          name={`events.styles.${props.id}.message.border`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.message.border}
          render={({ field: { onChange, value } }) => (
            <Border className="mb-3" onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Box Shadow">
        <Controller
          name={`events.styles.${props.id}.message.shadow`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.message.shadow}
          render={({ field: { onChange, value } }) => (
            <Shadow settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Outer margin">
        <Controller
          name={`events.styles.${props.id}.message.margin`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.message.margin}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Inner margin">
        <Controller
          name={`events.styles.${props.id}.message.padding`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.message.padding}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Border radius">
        <Controller
          name={`events.styles.${props.id}.message.radius`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.message.radius}
          render={({ field: { onChange, value } }) => (
            <BorderRadius settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
    </div>
  );
};

export default MessageContent;
