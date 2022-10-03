import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EmoteOptions, parse } from 'simple-tmi-emotes';
import tmi from 'tmi.js';
import { ChatMessage } from '~/components/chat/chat-message/chat-message';
import { useChat } from '~/hooks/chat/use-chat';
import type { TwitchMessage } from '~/types/schemas/chat';

export const ChatEmbed = () => {
  const [messages, setMessages] = useState<TwitchMessage[]>([]);
  const { id } = useParams();
  const { data: theme } = useChat(id!);

  const client = useMemo(
    () =>
      new tmi.Client({
        channels: [theme ? theme.user.username : ''],
      }),
    [theme]
  );

  useEffect(() => {
    if (theme) {
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

  useEffect(() => {
    if (theme) {
      void client.connect();

      client.on('message', (_, tags, message) => {
        const options: EmoteOptions = {
          format: 'default',
          themeMode: 'light',
          scale: '2.0',
        };

        const msg: TwitchMessage = {
          id: tags?.id,
          username: tags['display-name'],
          twitch: tags?.username,
          emotes: tags?.emotes || {},
          date: new Date(),
          message,
          badges: {
            admin: tags?.badges?.admin === '1',
            broadcaster: tags?.badges?.broadcaster === '1',
            moderator: tags?.badges?.moderator === '1',
            partner: tags?.badges?.partner === '1',
            vip: tags?.badges?.vip === '1',
            artist: tags?.badges?.artist === '1',
          },
          mod: tags?.mod,
          subscriber: tags?.subscriber,
          color: tags?.color,
        };

        msg.message = parse(msg.message, msg.emotes, options);

        setMessages((oldMessages) => {
          if (oldMessages.length >= 50) oldMessages.shift();
          return [...oldMessages, msg];
        });
      });

      client.on('messagedeleted', (_channel, _username, _deleteMessage, userstate) => {
        setMessages((msgs: TwitchMessage[]) => {
          const msgId = userstate['target-msg-id'];

          return [...msgs].filter((m) => m.id !== msgId);
        });
      });

      client.on('ban', (_channel, username) => {
        setMessages((msgs) => {
          return [...msgs].filter((m) => m.twitch !== username);
        });
      });

      client.on('timeout', (_channel, username) => {
        setMessages((msgs) => {
          return [...msgs].filter((m) => m.twitch !== username);
        });
      });

      client.on('clearchat', () => setMessages([]));
    }

    return () => {
      if (client.readyState() === 'OPEN') {
        void client.disconnect();
      }
    };
  }, [client]);

  useEffect(() => {
    document.body.style.backgroundColor = 'transparent';
  }, []);

  return (
    <div
      className="relative flex h-screen flex-col items-end justify-end overflow-hidden"
      style={{ bottom: `-${theme?.global.space_between_messages}px` }}
    >
      {theme &&
        messages.map((message) => (
          <ChatMessage key={message.id} settings={theme} message={message} />
        ))}
    </div>
  );
};
