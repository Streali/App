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
  event: {
    id: '123',
    createdAt: '2021-01-01T00:00:00.000Z',
    type: 10,
    payload: {
      displayName: 'WillTraore',
      username: 'willtraore',
      providerId: '1234',
    },
  },
};
