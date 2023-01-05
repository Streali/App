import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Event } from './event';

export default {
  component: Event,
  title: 'Event',
} as ComponentMeta<typeof Event>;

const Template: ComponentStory<typeof Event> = (args) => <Event {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  event: {
    id: '123',
    created_at: new Date().toString(),
    type: 10,
    payload: {
      displayName: 'WillTraore',
      username: 'willtraore',
      providerId: '1234',
    },
  },
};
