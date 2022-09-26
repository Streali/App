import { ChatMessage } from '../../components/chat/chat-message/chat-message';
import { ChatSettings } from '../../components/chat/chat-settings/chat-settings';
import { useEffect, useState } from 'react';
import { ChatTheme } from '../../types/schemas/chat';
import { ChatDemo } from '../../components/chat/chat-demo/chat-demo';
import { FieldValues } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useChat } from '../../hooks/chat/use-chat';
import { useUpdateChat } from '../../hooks/chat/use-update-chat';

export const ChatEdit = () => {
  const [settings, setSettings] = useState<ChatTheme | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: theme, status, error } = useChat(id!);

  useEffect(() => {
    if (theme) {
      setSettings(theme);

      (async () => {
        const WebFont = await import('webfontloader');
        WebFont.load({
          google: {
            families: [
              theme.name.text.fontFamily + ':100,200,300,400,500,600,700,800,900,950',
              theme.message.text.fontFamily + ':100,200,300,400,500,600,700,800,900,950',
            ],
          },
        });
      })();
    }
  }, [theme]);

  const { mutate: updateChat } = useUpdateChat();

  const handleSubmit = (theme: FieldValues) => {
    updateChat(theme as ChatTheme, {
      onSuccess: () => {
        navigate('/chat/library');
      },
    });
  };

  if (status === 'loading' || !settings) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="p-10 flex gap-10">
      <div className="w-[450px] shrink-0">
        <ChatSettings
          title="Edit chatbox"
          className="overflow-hidden"
          onSettingsChange={(settings) => setSettings(settings as ChatTheme)}
          settings={settings}
          onSave={(data) => handleSubmit(data)}
        />
      </div>
      <div className="flex gap-10 flex-1">
        <div className="flex-1 w-full bg-dark-600 rounded-2xl flex justify-center items-center p-10">
          <ChatMessage
            settings={settings}
            message={{
              id: '1',
              username: 'Pseudo',
              twitch: 'pseudo',
              emotes: {},
              date: new Date(),
              message: 'Message content',
              badges: {
                admin: true,
                broadcaster: false,
                moderator: true,
                partner: true,
                vip: false,
                artist: false,
              },
              mod: true,
              subscriber: false,
              color: '#000',
            }}
          />
        </div>
        <div className="flex-1 bg-dark-600 rounded-2xl overflow-hidden p-10 h-[calc(100vh_-_80px)] flex flex-col items-end justify-end">
          <ChatDemo settings={settings} />
        </div>
      </div>
    </div>
  );
};
