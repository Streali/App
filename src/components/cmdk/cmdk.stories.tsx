import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Cmdk } from './cmdk';

export default {
  title: 'Cmdk',
  component: Cmdk,
} as ComponentMeta<typeof Cmdk>;

const Template: ComponentStory<typeof Cmdk> = (args) => <Cmdk isOpen {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  groups: [
    {
      label: 'Fruits',
      commands: [
        {
          name: 'Apple',
          description: 'Example',
          iconName: 'chat-1-line',
          link: '/test',
        },
        {
          name: 'Banana',
          iconName: 'bubble-chart-line',
          action: () => console.log('banana'),
        },
        {
          name: 'Cherry',
          iconName: 'attachment-line',
          action: () => {},
        },
      ],
    },
    {
      label: 'Numbers',
      commands: [
        {
          name: 'One',
          iconName: 'number-1',
          action: () => {},
        },
        {
          name: 'Two',
          iconName: 'number-2',
          action: () => {},
        },
        {
          name: 'Three',
          iconName: 'number-3',
          action: () => {},
        },
      ],
    },
  ],
};
