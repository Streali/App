import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChatScreenshot } from '~/components/chat/chat-screenshot/chat-screenshot';
import { defaultChatTheme } from '~/utils/chat/default-chat-theme';

export default {
  component: ChatScreenshot,
  title: 'Chat/ChatScreenshot',
} as ComponentMeta<typeof ChatScreenshot>;

const Template: ComponentStory<typeof ChatScreenshot> = (args) => <ChatScreenshot {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  settings: defaultChatTheme,
};
