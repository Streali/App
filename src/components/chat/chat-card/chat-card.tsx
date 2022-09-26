import { useState } from 'react';
import { useDeleteChat } from '../../../hooks/chat/use-delete-chat';
import { useExportChatTheme } from '../../../hooks/chat/use-export-chat';
import { ChatTheme } from '../../../types/schemas/chat';
import { Button, ButtonColor } from '../../button/button';
import { PopoverNavigation } from '../../popover/navigation/popover-navigation';
import { Popover } from '../../popover/popover';
import { toastr, ToastType } from '../../toast/toast';
import { ChatMessage } from '../chat-message/chat-message';

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
      <div className=" flex items-center justify-center w-full h-[250px] overflow-hidden  p-6 bg-dark-600 border-2 border-dark-400 rounded-t-lg">
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
      <div className="py-3 pl-6 pr-3 bg-dark-400 rounded-b-lg flex justify-between items-center hover:bg-primary-500 transition-colors duration-200">
        <h2 className="font-medium">{theme.title}</h2>
        <Popover
          open={menuOpen}
          onOpenChange={setMenuOpen}
          align="end"
          side="bottom"
          trigger={<Button iconLeft="more-line" color={ButtonColor.Black} />}>
          <PopoverNavigation
            onLinkClick={() => setMenuOpen(false)}
            links={[
              {
                title: 'Edit',
                link: `/chat/${theme.id}/edit`,
                icon: 'edit-box-line',
              },
              {
                title: 'Embed',
                onClick: () => {
                  navigator.clipboard.writeText(
                    `${window.location.origin.toString()}/chat/${theme.id}/embed`
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
