import { TabProps, Tabs } from '../../tabs/tabs';
import { TabGeneral } from './tab-general';
import { useForm, FieldValues } from 'react-hook-form';
import { TabName } from './tab-name';
import { TabMessage } from './tab-message';
import { Button, ButtonColor } from '../../button/button';
import { useEffect } from 'react';
import { ChatTheme } from '../../../types/schemas/chat';

export interface ChatSettingsProps {
  className?: string;
  onSettingsChange: (settings: unknown) => void;
  settings: Omit<ChatTheme, 'user_id' | 'id'> | ChatTheme;
  onSave: (data: FieldValues) => void;
  title: string;
}

export const ChatSettings = (props: ChatSettingsProps) => {
  const { className = '', onSettingsChange, settings, onSave, title } = props;
  const { handleSubmit, watch, getValues, control } = useForm({
    defaultValues: settings as FieldValues,
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
    onSave(theme);
  });

  return (
    <div className={className}>
      <form onSubmit={onSubmit}>
        <div className="flex justify-between mb-5 items-center">
          <h1 className="font-semibold text-4xl font-title">{title}</h1>
          <Button type="submit" iconLeft="save-line" color={ButtonColor.Accent}>
            Save
          </Button>
        </div>
        <Tabs content={tabs} />
      </form>
    </div>
  );
};
