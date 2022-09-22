import { ChatSettings } from '../../components/chat/chat-settings/chat-settings';
import { defaultChatTheme } from '../../utils/chat/default-chat-theme';

export const Create = () => {
  return (
    <div className="p-10 flex gap-10">
      <div className="w-[400px] shrink-0">
        <ChatSettings
          className="overflow-hidden"
          onSettingsChange={(settings) => console.log(settings)}
          settings={defaultChatTheme}
          onSave={(data) => console.log(data)}
        />
      </div>
      <div className="flex gap-10 flex-1">
        <div className="flex-1 w-full bg-dark-600 rounded-2xl">message</div>
        <div className="flex-1 bg-dark-600 rounded-2xl">demo</div>
      </div>
    </div>
  );
};
