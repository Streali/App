import { ComponentStory, ComponentMeta } from '@storybook/react';
import { defaultChatTheme } from '~/utils/chat/default-chat-theme';
import { BorderRadius } from './border-radius';
import type { BorderRadiusType } from '~/types/schemas/components';

export default {
  component: BorderRadius,
  title: 'Forms/BorderRadius',
} as ComponentMeta<typeof BorderRadius>;

const Template: ComponentStory<typeof BorderRadius> = (args) => <BorderRadius {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onChange: (settings: BorderRadiusType) => {
    console.log(settings);
  },
  settings: defaultChatTheme.name.radius,
};
