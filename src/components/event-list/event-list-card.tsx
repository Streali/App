import { useDeleteEventList } from '~/hooks/event-list/use-delete-event-list';
import { useExportEventList } from '~/hooks/event-list/use-export-event-list';
import { EventList } from '~/types/schemas/event-list';
import { fakeEvent } from '~/utils/event/fake-events';
import { Button, ButtonColor } from '../button/button';
import { PopoverNavigation } from '../popover/navigation/popover-navigation';
import { Popover } from '../popover/popover';
import { toastr, ToastType } from '../toast/toast';
import EventListItem from './event-list-item/event-list-item';

type EventListCardProps = {
  theme: EventList;
  id: string;
};

const EventListCard = (props: EventListCardProps) => {
  const { theme, id } = props;

  const [menuOpen, setMenuOpen] = useState(false);

  const { mutate: deleteEventList } = useDeleteEventList();
  const { mutate: exportEventList } = useExportEventList();

  theme.delete_event = false;

  return (
    <>
      <div className=" flex h-[250px] w-full items-center justify-center overflow-hidden  rounded-t-lg border-2 border-dark-400 bg-dark-600 p-6">
        <EventListItem
          theme={theme}
          name={'Follow'}
          message={'**Bertrand** follow the channel!'}
          event={fakeEvent(10)}
          type="follow"
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
                link: `/event-lists/${id}/edit`,
                icon: 'edit-box-line',
              },
              {
                title: 'Embed',
                onClick: () => {
                  navigator.clipboard.writeText(
                    `${window.location.origin.toString()}/event-lists/${id}/embed`
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
                  exportEventList(theme);
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
                    id && deleteEventList(id);
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

export default EventListCard;
