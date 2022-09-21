import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChatSettings } from './chat-settings';

export default {
  component: ChatSettings,
  title: 'Chat/Chat Settings',
} as ComponentMeta<typeof ChatSettings>;

const Template: ComponentStory<typeof ChatSettings> = (args) => <ChatSettings {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onSettingsChange: (settings) => console.log(settings),
};
