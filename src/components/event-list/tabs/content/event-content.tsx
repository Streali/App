import { Control } from 'react-hook-form';
import { SuggestionDataItem } from 'react-mentions';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { Tabs, TabProps } from '~/components/tabs/tabs';
import ContainerContent from './container-content';
import MessageContent from './message-content';
import NameContent from './name-content';

const EventContent = (props: {
  control: Control;
  id: string;
  defaultContent: string;
  defaultName: string;
  options: SuggestionDataItem[];
}) => {
  const tabs: TabProps[] = [
    {
      title: 'Container',
      content: <ContainerContent control={props.control} id={props.id} />,
    },
    {
      title: 'Name',
      content: (
        <NameContent control={props.control} id={props.id} defaultContent={props.defaultName} />
      ),
    },
    {
      title: 'Message',
      content: (
        <MessageContent
          control={props.control}
          id={props.id}
          defaultContent={props.defaultContent}
          autocompleteOptions={props.options}
        />
      ),
    },
  ];

  return (
    <TabItem title="Settings">
      <Tabs content={tabs} className="!bg-dark-500" />
    </TabItem>
  );
};

export default EventContent;
