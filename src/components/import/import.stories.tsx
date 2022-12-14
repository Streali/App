import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from '~/components/button/button';
import { ChatExportThemeSchema } from '~/types/schemas/chat';
import { Import } from './import';

export default {
  component: Import,
  title: 'Import',
} as ComponentMeta<typeof Import>;

const Template: ComponentStory<typeof Import> = (args) => <Import {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  trigger: <Button>Trigger</Button>,
  title: 'Import Chat Theme',
  text: 'test dsqdqsdq sdqsq sqdqsdqsd q sqdqsdqsdq',
  schema: ChatExportThemeSchema,
  onSave(data) {
    console.log(data);
  },
};
