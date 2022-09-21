import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Spacing } from './spacing';
import { SpacingType } from '../../../types/schemas/components';

export default {
  component: Spacing,
  title: 'Forms/Spacing',
} as ComponentMeta<typeof Spacing>;

const Template: ComponentStory<typeof Spacing> = (args) => <Spacing {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onChange: (settings: SpacingType) => {
    console.log(settings);
  },
};
