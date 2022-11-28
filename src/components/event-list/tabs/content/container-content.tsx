import { Control, Controller } from 'react-hook-form';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { BorderRadius } from '~/components/forms/border-radius/border-radius';
import { Border } from '~/components/forms/border/border';
import { Color } from '~/components/forms/color/color';
import { Shadow } from '~/components/forms/shadow/shadow';
import { Spacing } from '~/components/forms/spacing/spacing';
import { Switch } from '~/components/forms/switch/switch';

const ContainerContent = (props: { id: string; control: Control }) => {
  return (
    <div>
      <TabItem title="Fullwidth">
        <Controller
          name={`events.${props.id}.container.full_width`}
          control={props.control}
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
            <Switch checked={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Background">
        <Controller
          name={`events.${props.id}.container.background`}
          control={props.control}
          defaultValue={'#00000000'}
          render={({ field: { onChange, value } }) => (
            <Color value={value} onChange={onChange} containerClassName="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Box border">
        <Controller
          name={`events.${props.id}.container.border`}
          control={props.control}
          defaultValue={''}
          render={({ field: { onChange, value } }) => (
            <Border className="mb-3" onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Box Shadow">
        <Controller
          name={`events.${props.id}.container.shadow`}
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
          name={`events.${props.id}.container.margin`}
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
          name={`events.${props.id}.container.padding`}
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
          name={`events.${props.id}.container.radius`}
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

export default ContainerContent;
