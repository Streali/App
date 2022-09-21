import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DnDList } from './dnd-list';

export default {
  component: DnDList,
  title: 'DnDList',
} as ComponentMeta<typeof DnDList>;

const Template: ComponentStory<typeof DnDList> = (args) => <DnDList {...args} />;

const elements = [
  { id: '1', name: 'Element 1' },
  { id: '2', name: 'Element 2' },
];

export const Primary = Template.bind({});
Primary.args = {
  elements: elements,
};
