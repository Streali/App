import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Navbar } from './navbar';

export default {
  title: 'Navbar',
  component: Navbar,
  args: {
    navigation: [],
  },
} as ComponentMeta<typeof Navbar>;

export const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

const navigation = [
  {
    icon: 'home-line',
    items: [
      {
        title: 'Show',
        link: '/',
      },
      {
        icon: 'home-line',
        title: 'Create',
        link: '/create',
      },
    ],
  },
];

export const Primary = Template.bind({});
Primary.args = {
  navigation: navigation,
};
