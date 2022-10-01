import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Icon, IconSVG } from './icon';

export default {
  component: Icon,
  title: 'Icon',
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: 'community-line',
};

export const AllIcon: ComponentStory<typeof Icon> = () => (
  <>
    {Object.values(IconSVG)
      .sort((a, b) => a.localeCompare(b))
      .map((iconName) => (
        <span
          key={iconName}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          {iconName.charAt(0).toUpperCase() + iconName.slice(1)}: <Icon svg={iconName} />
        </span>
      ))}
  </>
);
