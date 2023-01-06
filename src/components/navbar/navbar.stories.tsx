import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Navbar, type NavigationItems } from './navbar';

export default {
  title: 'Navbar',
  component: Navbar,
  args: {
    navigation: [],
  },
} as ComponentMeta<typeof Navbar>;

export const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

const navigation: NavigationItems = [
  {
    icon: 'home-line',
    link: '/',
    name: 'Dashboard',
  },
  {
    icon: 'book-2-line',
    link: '/properties',
    name: 'Properties',
  },
];

export const Primary = Template.bind({});
Primary.args = {
  navigation,
};
