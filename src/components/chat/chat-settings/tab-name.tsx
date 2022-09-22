import { Control, Controller } from 'react-hook-form';
import { defaultChatTheme } from '../../../utils/chat/default-chat-theme';
import { Accordion } from '../../accordion/accordion';
import { Badges } from '../../forms/badges/badges';
import { BorderRadius } from '../../forms/border-radius/border-radius';
import { Border } from '../../forms/border/border';
import { Color } from '../../forms/color/color';
import { Shadow } from '../../forms/shadow/shadow';
import { Spacing } from '../../forms/spacing/spacing';
import { TextStyle } from '../../forms/text-style/text-style';

export interface TabGeneralProps {
  control: Control;
}

export const TabName = (props: TabGeneralProps) => {
  const { control } = props;

  return (
    <div className="p-6 bg-dark-600 rounded-2xl h-[calc(100vh_-_208px)] overflow-y-auto">
      <Accordion title="Text style">
        <Controller
          name="name.text"
          control={control}
          defaultValue={defaultChatTheme.name.text}
          render={({ field: { onChange, value } }) => (
            <TextStyle onChange={onChange} settings={value} />
          )}
        />
      </Accordion>
      <Accordion title="Box background">
        <Controller
          name="name.background"
          control={control}
          defaultValue={defaultChatTheme.name.background}
          render={({ field: { onChange, value } }) => (
            <Color value={value} onChange={onChange} containerClassName="mb-3" />
          )}
        />
      </Accordion>
      <Accordion title="Box Shadow">
        <Controller
          name="name.shadow"
          control={control}
          defaultValue={defaultChatTheme.name.shadow}
          render={({ field: { onChange, value } }) => (
            <Shadow settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </Accordion>
      <Accordion title="Box border">
        <Controller
          name="name.border"
          control={control}
          defaultValue={defaultChatTheme.name.border}
          render={({ field: { onChange, value } }) => (
            <Border className="mb-3" onChange={onChange} settings={value} />
          )}
        />
      </Accordion>
      <Accordion title="Outer margin">
        <Controller
          name="name.margin"
          control={control}
          defaultValue={defaultChatTheme.name.margin}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </Accordion>
      <Accordion title="Inner margin">
        <Controller
          name="name.padding"
          control={control}
          defaultValue={defaultChatTheme.name.padding}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </Accordion>
      <Accordion title="Border radius">
        <Controller
          name="name.radius"
          control={control}
          defaultValue={defaultChatTheme.name.margin}
          render={({ field: { onChange, value } }) => (
            <BorderRadius settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </Accordion>
      <Accordion title="Badges">
        <Controller
          name="name.badges"
          control={control}
          defaultValue={defaultChatTheme.name.badges}
          render={({ field: { onChange, value } }) => (
            <Badges settings={value} onChange={onChange} />
          )}
        />
      </Accordion>
    </div>
  );
};
