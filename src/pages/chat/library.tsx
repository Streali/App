import { Button, ButtonColor } from '../../components/button/button';
import { ChatCard } from '../../components/chat/chat-card/chat-card';
import { useUserChat } from '../../hooks/chat/use-user-chat';
import { ChatTheme } from '../../types/schemas/chat';

export const ChatLibrary = () => {
  const { data, isLoading } = useUserChat();

  return (
    <div className="p-10">
      <div className="flex justify-between mb-5">
        <h1 className="font-semibold font-title text-4xl">Chat theme library</h1>
        <div className="flex items-center gap-2">
          <Button iconLeft="file-add-line" color={ButtonColor.Dark}>
            Import theme
          </Button>
          <Button iconLeft="add-line" link="/chat/create">
            Create theme
          </Button>
        </div>
      </div>
      {!isLoading && data && (
        <div className="grid gap-4 grid-cols-3 grid-rows-3">
          {data &&
            data.length > 0 &&
            data?.map((theme: ChatTheme) => (
              <div key={theme.id}>
                <ChatCard theme={theme} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
