import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Milliseconds } from '../../../types/types/custom';
import { Timeline } from './timeline';

export default {
  component: Timeline,
  title: 'Alert/Timeline',
} as ComponentMeta<typeof Timeline>;

const Template: ComponentStory<typeof Timeline> = (args) => <Timeline {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'text',
  title: 'Text 1',
  duration: 743 as Milliseconds,
  startTime: 1500 as Milliseconds,
  totalTime: 5000 as Milliseconds,
};
