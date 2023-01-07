import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChatDemo } from '~/components/chat/chat-demo/chat-demo';
import DemoContainer from '~/components/demo-container/demo-container';
import { defaultChatTheme } from '~/utils/chat/default-chat-theme';

export default {
  component: ChatDemo,
  title: 'Chat/ChatDemo',
} as ComponentMeta<typeof ChatDemo>;

const Template: ComponentStory<typeof ChatDemo> = (args) => (
  <DemoContainer>
    <ChatDemo {...args} />
  </DemoContainer>
);

export const Primary = Template.bind({});
Primary.args = {
  settings: defaultChatTheme,
};
