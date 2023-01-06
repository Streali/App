import { Accordion } from '~/components/accordion/accordion';
import { Button, ButtonSize } from '~/components/button/button';
import { Event } from '~/components/event/event';
import { Checkbox } from '~/components/forms/checkbox/checkbox';
import { useUser } from '~/hooks/auth/use-user';
import { useEventSource } from '~/hooks/core/use-event-source';
import { useEvents } from '~/hooks/event/use-events';
import { BaseEvent } from '~/types/schemas/event';

type EventCheck = {
  label: string;
  checked: boolean;
  type: number;
};

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
    type: 62,
  },
];

function useDynamicRenderKey(intervalInMs = 1_000 * 60) {
  const [renderKey, setRenderKey] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setRenderKey(Date.now());
    }, intervalInMs);
    return () => clearInterval(interval);
  }, []);

  return {
    renderKey,
  };
}

export default function Events() {
  const [eventChecked, setEventChecked] = useState<EventCheck[]>([]);
  const [allEvents, setAllEvents] = useState<BaseEvent[]>([]);
  const { data: events } = useEvents();
  const { renderKey } = useDynamicRenderKey();
  const { data: user } = useUser();
  const eventSource = useEventSource<BaseEvent>({
    onEventReceived: (event) => setAllEvents((prev) => [...prev, event]),
  });

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

  useEffect(() => {
    if (!user) {
      return;
    }

    const close = eventSource.listen([`/users/${user.id}/events`]);

    return () => close();
  }, [user]);

  const filteredEvent = allEvents
    ?.filter((e) => checkedEvents.map((c) => c.type).includes(e.type) && !e.replayed)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="p-5">
      <Accordion title="Filters">
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
      </Accordion>

      <div className="flex-1">
        {filteredEvent.map((event) => (
          <Event key={`${renderKey}-${event.id}`} event={event} />
        ))}
      </div>
    </div>
  );
}
