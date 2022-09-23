import { useState } from 'react';
import { useDeleteChat } from '../../../hooks/chat/use-delete-chat';
import { toastr, ToastType } from '../../../utils/toast/toast';
import { Button, ButtonColor } from '../../button/button';
import { PopoverNavigation } from '../../popover/navigation/popover-navigation';
import { Popover } from '../../popover/popover';

export interface ChatCardProps {
  title: string;
  id: string;
}

export const ChatCard = (props: ChatCardProps) => {
  const { title, id } = props;
  const { mutate: deleteChatTheme } = useDeleteChat();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="py-3 pl-6 pr-3 bg-dark-400 rounded-lg flex justify-between items-center hover:bg-primary-500 transition-colors duration-200">
      <h2 className="font-medium">{title}</h2>
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
              link: `/chat/${id}/edit`,
              icon: 'edit-box-line',
            },
            {
              title: 'Embed',
              onClick: () => {
                navigator.clipboard.writeText(
                  `${window.location.origin.toString()}/chat/${id}/embed`
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
              title: 'Delete',
              icon: 'delete-bin-line',
              color: 'error',
              confirm: {
                title: 'Delete chatbox',
                text: 'Are you sure you want to delete this chatbox theme?',
                word: title,
                confirmText: 'For delete this chatbox theme, type the name of the chatbox theme',
                textButton: 'Delete',
                onConfirm: () => {
                  id && deleteChatTheme(id);
                },
              },
            },
          ]}
        />
      </Popover>
    </div>
  );
};
