import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChatCard } from './chat-card';
import { defaultChatTheme } from '~/utils/chat/default-chat-theme';

export default {
  component: ChatCard,
  title: 'ChatCard',
} as ComponentMeta<typeof ChatCard>;

const Template: ComponentStory<typeof ChatCard> = (args) => <ChatCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  theme: defaultChatTheme,
};
