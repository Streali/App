import { Button, ButtonColor } from '~/components/button/button';
import { ChatMessage } from '~/components/chat/chat-message/chat-message';
import { PopoverNavigation } from '~/components/popover/navigation/popover-navigation';
import { Popover } from '~/components/popover/popover';
import { toastr, ToastType } from '~/components/toast/toast';
import { useDeleteChat } from '~/hooks/chat/use-delete-chat';
import { useExportChatTheme } from '~/hooks/chat/use-export-chat';
import type { ChatTheme } from '~/types/schemas/chat';

export interface ChatCardProps {
  theme: ChatTheme;
}

export const ChatCard = (props: ChatCardProps) => {
  const { theme } = props;
  const { mutate: deleteChatTheme } = useDeleteChat();
  const { mutate: exportChatTheme } = useExportChatTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className=" flex h-[250px] w-full items-center justify-center overflow-hidden rounded-t-lg border border-dark-400 bg-dark-600 p-6">
        <ChatMessage
          settings={theme}
          message={{
            id: '1',
            username: 'Pseudo',
            twitch: 'pseudo',
            emotes: {},
            date: new Date(),
            message: 'Message content',
            badges: {
              admin: true,
              broadcaster: false,
              moderator: true,
              partner: true,
              vip: false,
              artist: false,
            },
            mod: true,
            subscriber: false,
            color: '#000',
          }}
        />
      </div>
      <div className="flex items-center justify-between rounded-b-lg bg-dark-400 py-3 pl-6 pr-3 transition-colors duration-200 hover:bg-primary-500">
        <h2 className="font-medium">{theme.title}</h2>
        <Popover
          open={menuOpen}
          onOpenChange={setMenuOpen}
          align="end"
          side="bottom"
          trigger={<Button iconLeft="more-line" color={ButtonColor.Black} />}
        >
          <PopoverNavigation
            onLinkClick={() => setMenuOpen(false)}
            links={[
              {
                title: 'Edit',
                link: `/chats/${theme.id}/edit`,
                icon: 'edit-box-line',
              },
              {
                title: 'Embed',
                onClick: () => {
                  navigator.clipboard.writeText(
                    `${window.location.origin.toString()}/chats/${theme.id}/embed`
                  );
                  toastr(
                    ToastType.Success,
                    'Embed link copied',
                    'You can use this link on your streaming software'
                  );
                },
                icon: 'file-copy-line',
              },
              {
                title: 'Export',
                onClick: () => {
                  exportChatTheme(theme);
                },
                icon: 'file-code-line',
              },
              {
                title: 'Delete',
                icon: 'delete-bin-line',
                color: 'error',
                confirm: {
                  title: 'Delete chatbox',
                  text: 'Are you sure you want to delete this chatbox theme?',
                  word: theme.title,
                  confirmText: 'For delete this chatbox theme, type the name of the chatbox theme',
                  textButton: 'Delete',
                  onConfirm: () => {
                    theme.id && deleteChatTheme(theme.id);
                  },
                },
              },
            ]}
          />
        </Popover>
      </div>
    </>
  );
};
