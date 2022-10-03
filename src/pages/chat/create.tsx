import { FieldValues } from 'react-hook-form';
import { ChatDemo } from '~/components/chat/chat-demo/chat-demo';
import { ChatMessage } from '~/components/chat/chat-message/chat-message';
import { ChatSettings } from '~/components/chat/chat-settings/chat-settings';
import { useCreateChat } from '~/hooks/chat/use-create-chat';
import { defaultChatTheme } from '~/utils/chat/default-chat-theme';
import type { ChatTheme } from '~/types/schemas/chat';

export const ChatCreate = () => {
  const [settings, setSettings] = useState(defaultChatTheme);
  const navigate = useNavigate();

  const { mutate: createChat } = useCreateChat();

  const handleSubmit = (theme: FieldValues) => {
    createChat(theme as ChatTheme, {
      onSuccess: () => {
        navigate('/chat/library');
      },
    });
  };

  useEffect(() => {
    if (settings) {
      (async () => {
        const WebFont = await import('webfontloader');
        WebFont.load({
          google: {
            families: [
              settings.name.text.fontFamily + ':100,200,300,400,500,600,700,800,900,950',
              settings.message.text.fontFamily + ':100,200,300,400,500,600,700,800,900,950',
            ],
          },
        });
      })();
    }
  }, [settings.name.text.fontFamily, settings.message.text.fontFamily]);

  return (
    <div className="flex gap-10 p-10">
      <div className="w-[450px] shrink-0">
        <ChatSettings
          title="New chatbox"
          className="overflow-hidden"
          onSettingsChange={(settings) => setSettings(settings as ChatTheme)}
          settings={defaultChatTheme}
          onSave={(data) => handleSubmit(data)}
        />
      </div>
      <div className="flex flex-1 gap-10">
        <div className="flex w-full flex-1 items-center justify-center rounded-2xl bg-dark-600 p-10">
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
        <div className="flex h-[calc(100vh_-_80px)] flex-1 flex-col items-end justify-end overflow-hidden rounded-2xl bg-dark-600 p-10">
          <ChatDemo settings={settings} />
        </div>
      </div>
    </div>
  );
};
