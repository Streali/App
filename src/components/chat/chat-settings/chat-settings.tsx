import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { Button, ButtonColor } from '~/components/button/button';
import { TabProps, Tabs } from '~/components/tabs/tabs';
import { TabGeneral } from './tab-general';
import { TabMessage } from './tab-message';
import { TabName } from './tab-name';
import type { ChatTheme } from '~/types/schemas/chat';

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
        <div className="mb-5 flex items-center justify-between">
          <h1 className="font-title text-4xl font-semibold">{title}</h1>
          <Button type="submit" iconLeft="save-line" color={ButtonColor.Accent}>
            Save
          </Button>
        </div>
        <Tabs content={tabs} />
      </form>
    </div>
  );
};
