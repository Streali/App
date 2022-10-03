import { ComponentMeta, ComponentStory } from '@storybook/react';
import { defaultChatTheme } from '~/utils/chat/default-chat-theme';
import { ChatMessage } from './chat-message';

export default {
  component: ChatMessage,
  title: 'Chat/Chat Message',
} as ComponentMeta<typeof ChatMessage>;

const Template: ComponentStory<typeof ChatMessage> = (args) => (
  <ChatMessage
    {...args}
    message={{
      id: '1',
      date: new Date(),
      message: 'Hello world',
      username: 'John Doe',
      badges: {
        admin: true,
        broadcaster: false,
        moderator: false,
        partner: false,
        vip: false,
        artist: false,
      },
    }}
  />
);

export const Primary = Template.bind({});
Primary.args = {
  settings: defaultChatTheme,
};
