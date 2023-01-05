import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FieldValues, useForm } from 'react-hook-form';
import { defaultChatTheme } from '~/utils/chat/default-chat-theme';
import { ChatSettings } from './chat-settings';

export default {
  component: ChatSettings,
  title: 'Chat/Chat Settings',
} as ComponentMeta<typeof ChatSettings>;

const Template: ComponentStory<typeof ChatSettings> = (args) => {
  const { control } = useForm({
    defaultValues: defaultChatTheme as FieldValues,
  });
  return <ChatSettings {...args} control={control} />;
};

export const Primary = Template.bind({});
Primary.args = {
  developerMode: false,
};
