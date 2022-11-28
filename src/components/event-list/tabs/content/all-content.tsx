import { Control, Controller } from 'react-hook-form';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { BorderRadius } from '~/components/forms/border-radius/border-radius';
import { Border } from '~/components/forms/border/border';
import { Color } from '~/components/forms/color/color';
import { Shadow } from '~/components/forms/shadow/shadow';
import { Spacing } from '~/components/forms/spacing/spacing';
import { Switch } from '~/components/forms/switch/switch';
import { TextStyle } from '~/components/forms/text-style/text-style';
import { TabProps, Tabs } from '~/components/tabs/tabs';
import { defaultEventListTheme } from '~/utils/event-list/default-event-list-theme';

const AllContent = (props: { control: Control }) => {
  const tabs: TabProps[] = [
    {
      title: 'Container',
      content: <Container control={props.control} />,
    },
    {
      title: 'Name',
      content: <Name control={props.control} />,
    },
    {
      title: 'Message',
      content: <Message control={props.control} />,
    },
  ];

  return (
    <div>
      <TabItem title="Settings">
        <Tabs content={tabs} className="!bg-dark-500" />
      </TabItem>
    </div>
  );
};

const Container = (props: { control: Control }) => {
  return (
    <div>
      <TabItem title="Fullwidth">
        <Controller
          name={`events.all.container.full_width`}
          control={props.control}
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
            <Switch checked={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Background">
        <Controller
          name={`events.styles.all.container.background`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.container.background}
          render={({ field: { onChange, value } }) => (
            <Color value={value} onColorChange={onChange} containerClassName="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Box border">
        <Controller
          name={`events.styles.all.container.border`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.container.border}
          render={({ field: { onChange, value } }) => (
            <Border className="mb-3" onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Box Shadow">
        <Controller
          name={`events.styles.all.container.shadow`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.container.shadow}
          render={({ field: { onChange, value } }) => (
            <Shadow settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Outer margin">
        <Controller
          name={`events.styles.all.container.margin`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.container.margin}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Inner margin">
        <Controller
          name={`events.styles.all.container.padding`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.container.padding}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Border radius">
        <Controller
          name={`events.styles.all.container.radius`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.container.radius}
          render={({ field: { onChange, value } }) => (
            <BorderRadius settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
    </div>
  );
};

const Name = (props: { control: Control }) => {
  return (
    <div>
      <TabItem title="Text style">
        <Controller
          name={`events.styles.all.name.text_style`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.name.text_style}
          render={({ field: { onChange, value } }) => (
            <TextStyle onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Background">
        <Controller
          name={`events.styles.all.name.background`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.name.background}
          render={({ field: { onChange, value } }) => (
            <Color value={value} onChange={onChange} containerClassName="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Box border">
        <Controller
          name={`events.styles.all.name.border`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.name.border}
          render={({ field: { onChange, value } }) => (
            <Border className="mb-3" onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Box Shadow">
        <Controller
          name={`events.styles.all.name.shadow`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.name.shadow}
          render={({ field: { onChange, value } }) => (
            <Shadow settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Outer margin">
        <Controller
          name={`events.styles.all.name.margin`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.name.margin}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Inner margin">
        <Controller
          name={`events.styles.all.name.padding`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.name.padding}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Border radius">
        <Controller
          name={`events.styles.all.name.radius`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.name.radius}
          render={({ field: { onChange, value } }) => (
            <BorderRadius settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
    </div>
  );
};

const Message = (props: { control: Control }) => {
  return (
    <div>
      <TabItem title="Text style">
        <Controller
          name={`events.styles.all.message.text_style`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.message.text_style}
          render={({ field: { onChange, value } }) => (
            <TextStyle onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Background">
        <Controller
          name={`events.styles.all.message.background`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.message.background}
          render={({ field: { onChange, value } }) => (
            <Color value={value} onChange={onChange} containerClassName="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Box border">
        <Controller
          name={`events.styles.all.message.border`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.message.border}
          render={({ field: { onChange, value } }) => (
            <Border className="mb-3" onChange={onChange} settings={value} />
          )}
        />
      </TabItem>
      <TabItem title="Box Shadow">
        <Controller
          name={`events.styles.all.message.shadow`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.message.shadow}
          render={({ field: { onChange, value } }) => (
            <Shadow settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Outer margin">
        <Controller
          name={`events.styles.all.message.margin`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.message.margin}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Inner margin">
        <Controller
          name={`events.styles.all.message.padding`}
          control={props.control}
          defaultValue={defaultEventListTheme.events.styles.all.message.padding}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </TabItem>
      <TabItem title="Border radius">
        <Controller
          name={`events.styles.all.message.radius`}
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

export default AllContent;
