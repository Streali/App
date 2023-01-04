import { FieldValues } from 'react-hook-form';
import { Button, ButtonColor } from '~/components/button/button';
import { ChatCard } from '~/components/chat/chat-card/chat-card';
import { Import } from '~/components/import/import';
import ProBadge from '~/components/pro-badge/pro-badge';
import { useCurrentPlan } from '~/hooks/billing/use-current-plan';
import { useChats } from '~/hooks/chat/use-chats';
import { useCreateChat } from '~/hooks/chat/use-create-chat';
import { ChatExportThemeSchema } from '~/types/schemas/chat';
import type { ChatTheme } from '~/types/schemas/chat';

export default function ChatLibrary() {
  const { data, isLoading } = useChats();
  const navigate = useNavigate();
  const { mutate: createChat } = useCreateChat();
  const { data: plan } = useCurrentPlan();

  const handleSubmit = (theme: FieldValues) => {
    createChat(theme.import as ChatTheme, {
      onSuccess: () => {
        navigate('/chats');
      },
    });
  };

  return (
    <div className="p-10">
      <div className="mb-5 flex items-center justify-between">
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
          {plan?.name === 'free' && data?.length === 0 && (
            <Button iconLeft="add-line" link="/chats/create">
              Create theme
            </Button>
          )}
          {plan?.name === 'pro' && (
            <Button iconLeft="add-line" link="/chats/create">
              Create theme
            </Button>
          )}
          {plan?.name === 'free' && data?.length >= 1 && (
            <ProBadge
              trigger={<Button iconLeft="add-line">Create theme</Button>}
              content="You have reached the maximum of 1 chat theme that can be created on the free version. To create unlimited chat themes, you will need to upgrade to Streali Pro."
            />
          )}
        </div>
      </div>
      {!isLoading && data && (
        <div className="grid grid-cols-3 gap-4">
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
          <h2 className="text-2xl font-medium">No themes found</h2>
          {plan?.name === 'free' && data?.length === 0 && (
            <Button iconLeft="add-line" link="/chats/create">
              Create theme
            </Button>
          )}
          {plan?.name === 'pro' && (
            <Button iconLeft="add-line" link="/chats/create">
              Create theme
            </Button>
          )}
          {plan?.name === 'free' && data?.length >= 1 && (
            <ProBadge
              trigger={<Button iconLeft="add-line">Create theme</Button>}
              content="You have reached the maximum of 1 chat theme that can be created on the free version. To create unlimited chat themes, you will need to upgrade to Streali Pro."
            />
          )}
        </div>
      )}
    </div>
  );
}
