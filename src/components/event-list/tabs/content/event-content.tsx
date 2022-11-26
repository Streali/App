import { Control } from 'react-hook-form';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { Tabs, TabProps } from '~/components/tabs/tabs';
import ContainerContent from './container-content';
import MessageContent from './message-content';
import NameContent from './name-content';

const EventContent = (props: { control: Control; id: string }) => {
  const tabs: TabProps[] = [
    {
      title: 'Container',
      content: <ContainerContent control={props.control} id={props.id} />,
    },
    {
      title: 'Name',
      content: <NameContent control={props.control} id={props.id} />,
    },
    {
      title: 'Message',
      content: <MessageContent control={props.control} id={props.id} />,
    },
  ];

  return (
    <TabItem title="Settings">
      <Tabs content={tabs} className="!bg-dark-500" />
    </TabItem>
  );
};

export default EventContent;
