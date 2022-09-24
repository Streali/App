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
      {(!data || data.length === 0) && (
        <div className="flex flex-col justify-center items-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-2xl font-medium">No themes found 🥲</h2>
          <Button iconLeft="add-line" link="/chat/create">
            Create chat theme
          </Button>
        </div>
      )}
    </div>
  );
};
