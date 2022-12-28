import './chat-message.scss';

import { Liquid } from 'liquidjs';
import { Fragment } from 'react';
import { scopeCSS } from '~/utils/common/scope-css';
import { Container } from './container';
import { Message } from './message';
import { Name } from './name';
import type { ChatTheme, TwitchMessage } from '~/types/schemas/chat';

export interface ChatMessageProps {
  settings: Omit<ChatTheme, 'user_id' | 'id'> | ChatTheme;
  message: TwitchMessage;
}

export const ChatMessage = memo(function ChatMessage(props: ChatMessageProps) {
  const { settings, message } = props;

  const globalStyle = {
    flexDirection: settings.global.layout === 'stack' ? 'column' : ('row' as 'column' | 'row'),
    ...(settings.global.layout === 'stack' && {
      alignItems:
        settings.global.alignment === 'left'
          ? 'flex-start'
          : settings.global.alignment === 'right'
          ? 'flex-end'
          : ('center' as 'flex-start' | 'flex-end' | 'center'),
    }),
    ...(settings.global.layout === 'inline' && {
      justifyContent:
        settings.global.alignment === 'left'
          ? 'flex-start'
          : settings.global.alignment === 'right'
          ? 'flex-end'
          : ('center' as 'flex-start' | 'flex-end' | 'center'),
    }),
    marginBottom: settings.global.space_between_messages + 'px',
  };

  if (settings.global.developer_mode) {
    const data = {
      ...message,
      displayBadges: function () {
        const listBadgesUrl = Object.entries(message.badges)
          .map(([key, value]) => {
            if (value) {
              return { url: `/badges/twitch/${key}.png` };
            } else {
              return null;
            }
          })
          .filter((n) => n);
        return listBadgesUrl;
      },
    };

    const engine = new Liquid({
      strictFilters: false,
    });

    try {
      const template = engine.parseAndRenderSync(settings.code.html, data);
      const style = scopeCSS(settings.code.css, '[data-scope]');

      return (
        <>
          <style>{style}</style>
          <div dangerouslySetInnerHTML={{ __html: template }} data-scope></div>
        </>
      );
    } catch (error) {
      const err = error as Error;
      return (
        <div className="mb-2 rounded bg-error-500 p-1 text-xs font-bold">
          {err.message.split(',')[0]}
        </div>
      );
    }
  }

  return (
    <div style={globalStyle} className="flex w-full">
      <Container settings={settings} color={message.color}>
        {settings.global.order.map((item, index) => (
          <Fragment key={index}>
            {item.id === 'name' && (
              <Name
                key={item.id}
                settings={settings.name}
                name={message.username}
                badges={message.badges}
                color={message.color}
              />
            )}
            {item.id === 'message' && (
              <Message
                key={item.id}
                settings={settings.message}
                message={message.message}
                color={message.color}
              />
            )}
          </Fragment>
        ))}
      </Container>
    </div>
  );
});
