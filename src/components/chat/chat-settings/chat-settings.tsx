import { Control } from 'react-hook-form';
import { TabProps, Tabs } from '~/components/tabs/tabs';
import { TabContainer } from './tab-container';
import { TabGeneral } from './tab-general';
import { TabMessage } from './tab-message';
import { TabName } from './tab-name';

export interface ChatSettingsProps {
  className?: string;
  developerMode: boolean;
  control: Control;
}

export const ChatSettings = (props: ChatSettingsProps) => {
  const { className = '', developerMode, control } = props;

  const tabs: TabProps[] = [
    { title: 'General', content: <TabGeneral control={control} /> },
    { title: 'Container', content: <TabContainer control={control} /> },
    { title: 'Name', content: <TabName control={control} /> },
    { title: 'Message', content: <TabMessage control={control} /> },
  ];

  return <div className={className}>{!developerMode && <Tabs content={tabs} />}</div>;
};
