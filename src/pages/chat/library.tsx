import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonColor } from '~/components/button/button';
import { ChatCard } from '~/components/chat/chat-card/chat-card';
import { Import } from '~/components/import/import';
import { useCreateChat } from '~/hooks/chat/use-create-chat';
import { useUserChat } from '~/hooks/chat/use-user-chat';
import { ChatExportThemeSchema } from '~/types/schemas/chat';
import type { ChatTheme } from '~/types/schemas/chat';

export const ChatLibrary = () => {
  const { data, isLoading } = useUserChat();
  const navigate = useNavigate();
  const { mutate: createChat } = useCreateChat();

  const handleSubmit = (theme: FieldValues) => {
    createChat(theme.import as ChatTheme, {
      onSuccess: () => {
        navigate('/chat/library');
      },
    });
  };

  return (
    <div className="p-10">
      <div className="mb-5 flex justify-between">
        <h1 className="font-title text-4xl font-semibold">Chat theme library</h1>
        <div className="flex items-center gap-2">
          <Import
            trigger={
              <Button iconLeft="file-add-line" color={ButtonColor.Dark}>
                Import theme
              </Button>
            }
            title={'Import Chat Theme'}
            text={'Chat Theme Title'}
            schema={ChatExportThemeSchema}
            onSave={handleSubmit}
          />
          <Button iconLeft="add-line" link="/chat/create">
            Create theme
          </Button>
        </div>
      </div>
      {!isLoading && data && (
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
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
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-medium">No themes found 🥲</h2>
          <Button iconLeft="add-line" link="/chat/create">
            Create chat theme
          </Button>
        </div>
      )}
    </div>
  );
};
