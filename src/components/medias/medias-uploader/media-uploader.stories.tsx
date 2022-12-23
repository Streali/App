import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from '~/components/button/button';
import MediaUploader from './media-uploader';

export default {
  component: MediaUploader,
  title: 'Medias/MediaUploader',
} as ComponentMeta<typeof MediaUploader>;

const Template: ComponentStory<typeof MediaUploader> = (args) => <MediaUploader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  trigger: <Button>Trigger</Button>,
};
