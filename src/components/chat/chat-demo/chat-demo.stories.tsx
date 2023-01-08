import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChatDemo } from '~/components/chat/chat-demo/chat-demo';
import DemoContainer from '~/components/demo-container/demo-container';
import { defaultChatTheme } from '~/utils/chat/default-chat-theme';
import { Input } from '~/components/forms/input/input';

export default {
  component: ChatDemo,
  title: 'Chat/ChatDemo',
} as ComponentMeta<typeof ChatDemo>;

interface MessagesPerMinuteFormProps {
  value: string;
  setValue: (value: string) => void;
}

function MessagesPerMinuteForm({ value, setValue }: MessagesPerMinuteFormProps) {
  return (
    <Input
      value={value}
      onChange={(e) => {
        const target = e.target as HTMLInputElement;
        setValue(target.value);
      }}
    />
  );
}

const Template: ComponentStory<typeof ChatDemo> = (args) => (
  <DemoContainer
    tools={(demoData, setDemoData) => (
      <>
        <MessagesPerMinuteForm
          setValue={(value) =>
            setDemoData((prev) => ({ ...prev, messagesPerMinute: Number(value) }))
          }
          value={(demoData['messagesPerMinute'] as string) ?? '1250'}
        />
      </>
    )}
  >
    {(demoData) => (
      <ChatDemo timeBetweenMessages={(demoData.messagesPerMinute as number) ?? 1_250} {...args} />
    )}
  </DemoContainer>
);

export const Primary = Template.bind({});
Primary.args = {
  settings: defaultChatTheme,
};
