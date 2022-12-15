import './chat-message.scss';

import { Fragment } from 'react';
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
