import { ChatTheme } from '../../../types/schemas/chat';
import { Message } from './message';
import { Name } from './name';

export interface ChatMessageProps {
  settings: Omit<ChatTheme, 'user_id' | 'id'> | ChatTheme;
}

export const ChatMessage = (props: ChatMessageProps) => {
  const { settings } = props;

  const containerStyle: React.CSSProperties = {
    flexDirection: settings.global.layout === 'stack' ? 'column' : 'row',
    alignItems:
      settings.global.alignment === 'left'
        ? 'flex-start'
        : settings.global.alignment === 'right'
        ? 'flex-end'
        : ('center' as 'flex-start' | 'flex-end' | 'center'),
    marginBottom: settings.global.space_between_messages + 'px',
  };

  return (
    <div className="flex w-full" style={containerStyle}>
      {settings.global.order.map((item) => (
        <>
          {item.id === 'name' && <Name key={item.id} settings={settings.name} name="Pseudo" />}
          {item.id === 'message' && (
            <Message key={item.id} settings={settings.message} message="Super Message Content" />
          )}
        </>
      ))}
    </div>
  );
};
