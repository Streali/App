import { TabProps, Tabs } from '../../tabs/tabs';
import { TabGeneral } from './tab-general';
import { useForm, FieldValues } from 'react-hook-form';
import { TabName } from './tab-name';
import { TabMessage } from './tab-message';
import { Button, ButtonColor } from '../../button/button';
import { useEffect } from 'react';
import { defaultChatTheme } from '../../../utils/chat/default-chat-theme';

export interface ChatSettingsProps {
  className?: string;
  onSettingsChange: (settings: unknown) => void;
}

export const ChatSettings = (props: ChatSettingsProps) => {
  const { className = '', onSettingsChange } = props;
  const { handleSubmit, watch, getValues, control } = useForm({
    defaultValues: defaultChatTheme as FieldValues,
  });

  const tabs: TabProps[] = [
    { title: 'General', content: <TabGeneral control={control} /> },
    { title: 'Name', content: <TabName control={control} /> },
    { title: 'Message', content: <TabMessage control={control} /> },
  ];

  useEffect(() => {
    const subscription = watch((value) => onSettingsChange(value));
    return () => subscription.unsubscribe();
  }, [watch, onSettingsChange, getValues]);

  const onSubmit = handleSubmit((theme: FieldValues) => {
    console.log(theme);
  });

  return (
    <div className={className}>
      <form onSubmit={onSubmit}>
        <div className="flex justify-between mb-5 items-center">
          <h1 className="font-semibold text-4xl font-title">New chatbox</h1>
          <Button type="submit" iconLeft="save-line" color={ButtonColor.Accent}>
            Save
          </Button>
        </div>
        <Tabs content={tabs} />
      </form>
    </div>
  );
};
