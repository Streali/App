import { Button, ButtonColor, ButtonSize } from '~/components/button/button';
import { Event } from '~/components/event/event';
import { Checkbox } from '~/components/forms/checkbox/checkbox';
import { toastr, ToastType } from '~/components/toast/toast';
import { useAuthUser } from '~/hooks/auth/use-auth-user';
import { useEventSource } from '~/hooks/core/use-event-source';
import { useUserEvent } from '~/hooks/event/use-user-events';
import { BaseEvent } from '~/types/schemas/event';

const listEvents = [
  {
    label: 'Follow',
    checked: true,
    type: 10,
  },
  {
    label: 'Bits',
    checked: true,
    type: 20,
  },
  {
    label: 'Subscribe',
    checked: true,
    type: 30,
  },
  {
    label: 'Subscription Gift',
    checked: true,
    type: 31,
  },
  {
    label: 'Raid',
    checked: true,
    type: 40,
  },
  {
    label: 'Hype Train Begin',
    checked: true,
    type: 50,
  },
  {
    label: 'Hype Train Progress',
    checked: true,
    type: 51,
  },
  {
    label: 'Hype Train End',
    checked: true,
    type: 52,
  },
  {
    label: 'Goal Begin',
    checked: true,
    type: 60,
  },
  {
    label: 'Goal End',
    checked: true,
    type: 61,
  },
];

type EventCheck = {
  label: string;
  checked: boolean;
  type: number;
};

export const Dashboard = () => {
  const [eventChecked, setEventChecked] = useState<EventCheck[]>([]);
  const [allEvents, setAllEvents] = useState<BaseEvent[]>([]);
  const { data: user } = useAuthUser();
  const { data: events } = useUserEvent();
  const eventSource = useEventSource<BaseEvent>({
    onEventReceived: (event) => setAllEvents((prev) => [...prev, event]),
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    const close = eventSource.listen([`/users/${user.id}/events`]);

    return () => close();
  }, [user]);

  const checkedEvents: EventCheck[] = eventChecked.filter((e) => e.checked);

  const handleEventChecked = (label: string, value: boolean) => {
    const currentList = [...eventChecked].map((item) => {
      if (item.label === label) {
        return {
          ...item,
          checked: value,
        };
      }
      return item;
    });

    localStorage.setItem('eventsDashboard', JSON.stringify(currentList));
    setEventChecked(currentList);
  };

  const handleEventSelectAll = () => {
    localStorage.setItem('eventsDashboard', JSON.stringify(listEvents));
    setEventChecked(listEvents);
  };

  const handleEmbedClick = () => {
    navigator.clipboard.writeText(`${window.location.host}/events`);
    toastr(
      ToastType.Success,
      'Embed link copied!',
      'Now you can add a new panel with this link on your streaming software.'
    );
  };

  useEffect(() => {
    const eventsDashboard = localStorage.getItem('eventsDashboard');
    if (eventsDashboard) {
      setEventChecked(JSON.parse(eventsDashboard));
    } else {
      setEventChecked(listEvents);
    }
  }, []);

  useEffect(() => {
    if (events) {
      setAllEvents(events);
    }
  }, [events]);

  return (
    <div className="grid grid-cols-2 gap-10 p-10">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-title text-4xl font-semibold">Event list</h1>
          <Button
            iconLeft="file-copy-line"
            color={ButtonColor.Accent}
            onClick={handleEmbedClick}
            size={ButtonSize.Small}
          >
            Add to OBS
          </Button>
        </div>
        <div className="mb-6 rounded-lg bg-dark-600 p-6">
          <Button className="mb-4" onClick={handleEventSelectAll} size={ButtonSize.Very_Small}>
            Select all
          </Button>
          <div className="flex flex-wrap gap-3">
            {eventChecked.map((event: EventCheck) => (
              <Checkbox
                key={event.label}
                label={event.label}
                checked={event.checked}
                onChange={(e) => {
                  handleEventChecked(event.label, e.target.checked);
                }}
              />
            ))}
          </div>
        </div>

        <div className="custom-scrollbar max-h-[calc(100vh_-_367px)] flex-1 overflow-y-auto rounded-lg pr-2">
          {allEvents
            ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .map((event) => {
              if (checkedEvents.find((e) => e.type === event.type)) {
                return <Event key={event.id} event={event} />;
              }
            })}
        </div>
      </div>
      <div className="flex h-[calc(100vh_-_80px)] flex-1 flex-col gap-10">
        <iframe
          src={`https://player.twitch.tv/?channel=${user?.username}&parent=${window.location.hostname}`}
          frameBorder="0"
          allowFullScreen
          scrolling="no"
          className="aspect-video w-full rounded-lg"
        ></iframe>
        <iframe
          className="w-full flex-1 rounded-lg"
          id="chat_embed"
          src={`https://www.twitch.tv/embed/${user?.username}/chat?parent=${window.location.hostname}&darkpopout`}
          height="500"
          width="350"
        ></iframe>
      </div>
    </div>
  );
};
