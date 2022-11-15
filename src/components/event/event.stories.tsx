import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '~/components/button/button';
import { Event } from './event';

export default {
  component: Event,
  title: 'Event',
} as ComponentMeta<typeof Event>;

const Template: ComponentStory<typeof Event> = (args) => <Event {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: '',
};
