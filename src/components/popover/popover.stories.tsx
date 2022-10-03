import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { Button } from '~/components/button/button';
import { Popover } from './popover';

export default {
  component: Popover,
  title: 'Popover',
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ width: 'fit-content' }}>
      <Popover {...args} open={isOpen} onOpenChange={setIsOpen}>
        Popover content
      </Popover>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  trigger: <Button>Trigger popover</Button>,
  align: 'end',
  side: 'right',
};
