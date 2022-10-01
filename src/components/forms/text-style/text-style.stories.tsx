import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TextStyle } from './text-style';

export default {
  component: TextStyle,
  title: 'Forms/TextStyle',
} as ComponentMeta<typeof TextStyle>;

const Template: ComponentStory<typeof TextStyle> = (args) => <TextStyle {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  settings: {
    fontFamily: 'Rubik',
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'left',
    textDecoration: 'none',
    fontStyle: 'normal',
    letterSpacing: 0,
    lineHeight: 100,
    textShadow: { shadowOffsetX: 0, shadowOffsetY: 0, shadowBlur: 0, shadowColor: '#000000' },
  },
};
