import { ChatMessage } from '../../components/chat/chat-message/chat-message';
import { ChatSettings } from '../../components/chat/chat-settings/chat-settings';
import { defaultChatTheme } from '../../utils/chat/default-chat-theme';
import { useEffect, useState } from 'react';
import { ChatTheme } from '../../types/schemas/chat';
import { ChatDemo } from '../../components/chat/chat-demo/chat-demo';

export const Create = () => {
  const [settings, setSettings] = useState(defaultChatTheme);

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
    <div className="p-10 flex gap-10">
      <div className="w-[400px] shrink-0">
        <ChatSettings
          className="overflow-hidden"
          onSettingsChange={(settings) => setSettings(settings as ChatTheme)}
          settings={defaultChatTheme}
          onSave={(data) => console.log(data)}
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
              badges: {},
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
