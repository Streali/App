import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '~/components/button/button';
import { Modal } from './modal';

export default {
  component: Modal,
  title: 'Modal',
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

let open = true;

export const Primary = Template.bind({});
Primary.args = {
  trigger: <Button>Trigger dialog</Button>,
  title: 'Dialog title',
  onOpenChange: (isOpen) => (open = isOpen),
  children: (
    <div>
      <p>Dialog content !</p>
    </div>
  ),
  open: open,
};
