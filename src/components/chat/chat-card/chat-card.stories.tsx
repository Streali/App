import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChatCard } from './chat-card';

export default {
  component: ChatCard,
  title: 'Icon',
} as ComponentMeta<typeof ChatCard>;

const Template: ComponentStory<typeof ChatCard> = (args) => <ChatCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
