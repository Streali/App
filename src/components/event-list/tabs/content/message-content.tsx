import { Control, Controller } from 'react-hook-form';
import { SuggestionDataItem } from 'react-mentions';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { AutocompleteInput } from '~/components/forms/autocomplete-input/autocomplete-input';
import { BorderRadius } from '~/components/forms/border-radius/border-radius';
import { Border } from '~/components/forms/border/border';
import { Color } from '~/components/forms/color/color';
import { Shadow } from '~/components/forms/shadow/shadow';
import { Spacing } from '~/components/forms/spacing/spacing';
import { TextStyle } from '~/components/forms/text-style/text-style';

const MessageContent = (props: {
  id: string;
  control: Control;
  defaultContent: string;
  autocompleteOptions: SuggestionDataItem[];
}) => {
  const autocomplete = [
    {
      trigger: '#',
      options: props.autocompleteOptions,
    },
  ];

  return (
    <div>
      <TabItem title="Text">
        <Controller
          name={`events.${props.id}.message.content`}
          control={props.control}
          defaultValue={props.defaultContent}
          render={({ field: { onChange, value } }) => (
            <AutocompleteInput
              value={value}
              options={autocomplete}
              onChange={(e) => onChange(e.target.value)}
              className="mb-3 h-10"
              label="You can use # to add dynamics values. Ex: #pseudo"
              labelClassName="font-normal text-dark-100"
            />
          )}
        />
      </TabItem>
      <TabItem title="Text style">
        <Controller
          name={`events.${props.id}.message.text_style`}
          control={props.control}
          defaultValue={{
            fontFamily: 'Rubik',
            fontSize: 16,
            fontWeight: '700',
            color: '#000000',
            textAlign: 'left',
            textDecoration: 'none',
            fontStyle: 'normal',
            letterSpacing: 0,
            lineHeight: 100,
            textShadow: {
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 0,
              shadowColor: '#000000',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextStyle onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Background">
        <Controller
          name={`events.${props.id}.message.background`}
          control={props.control}
          defaultValue={'#00000000'}
          render={({ field: { onChange, value } }) => (
            <Color value={value} onChange={onChange} containerClassName="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Box border">
        <Controller
          name={`events.${props.id}.message.border`}
          control={props.control}
          defaultValue={''}
          render={({ field: { onChange, value } }) => (
            <Border className="mb-3" onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Box Shadow">
        <Controller
          name={`events.${props.id}.message.shadow`}
          control={props.control}
          defaultValue={{
            shadowColor: '#000000',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
          }}
          render={({ field: { onChange, value } }) => (
            <Shadow settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Outer margin">
        <Controller
          name={`events.${props.id}.message.margin`}
          control={props.control}
          defaultValue={{
            top: 0,
            right: 0,
            bottom: 8,
            left: 0,
          }}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Inner margin">
        <Controller
          name={`events.${props.id}.message.padding`}
          control={props.control}
          defaultValue={{
            top: 0,
            right: 0,
            bottom: 8,
            left: 0,
          }}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Border radius">
        <Controller
          name={`events.${props.id}.message.radius`}
          control={props.control}
          defaultValue={{
            top_left: 4,
            top_right: 4,
            bottom_right: 4,
            bottom_left: 4,
          }}
          render={({ field: { onChange, value } }) => (
            <BorderRadius settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
    </div>
  );
};

export default MessageContent;