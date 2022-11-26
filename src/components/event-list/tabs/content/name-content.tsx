import { Control, Controller } from 'react-hook-form';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { BorderRadius } from '~/components/forms/border-radius/border-radius';
import { Border } from '~/components/forms/border/border';
import { Color } from '~/components/forms/color/color';
import { Shadow } from '~/components/forms/shadow/shadow';
import { Spacing } from '~/components/forms/spacing/spacing';
import { TextStyle } from '~/components/forms/text-style/text-style';

const NameContent = (props: { id: string; control: Control }) => {
  return (
    <div>
      <TabItem title="Text style">
        <Controller
          name={`events.styles.${props.id}.name.text_style`}
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
          name={`events.styles.${props.id}.name.background`}
          control={props.control}
          defaultValue={'#00000000'}
          render={({ field: { onChange, value } }) => (
            <Color value={value} onChange={onChange} containerClassName="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Box border">
        <Controller
          name={`events.styles.${props.id}.name.border`}
          control={props.control}
          defaultValue={''}
          render={({ field: { onChange, value } }) => (
            <Border className="mb-3" onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Box Shadow">
        <Controller
          name={`events.styles.${props.id}.name.shadow`}
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
          name={`events.styles.${props.id}.name.margin`}
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
          name={`events.styles.${props.id}.name.padding`}
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
          name={`events.styles.${props.id}.name.radius`}
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

export default NameContent;
