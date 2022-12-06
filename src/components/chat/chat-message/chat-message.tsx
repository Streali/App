import './chat-message.scss';

import { Fragment } from 'react';
import { selectAnimation } from '~/utils/common/animations';
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

  return (
    <Container settings={settings}>
      {settings.global.order.map((item, index) => (
        <Fragment key={index}>
          {item.id === 'name' && (
            <Name
              key={item.id}
              settings={settings.name}
              name={message.username}
              badges={message.badges}
            />
          )}
          {item.id === 'message' && (
            <Message key={item.id} settings={settings.message} message={message.message} />
          )}
        </Fragment>
      ))}
    </Container>
  );
});
