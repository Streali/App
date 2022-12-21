import { AnimatePresence } from 'framer-motion';
import GoogleFontLoader from 'react-google-font-loader';
import EventListItem from '~/components/event-list/event-list-item/event-list-item';
import { useEventSource } from '~/hooks/core/use-event-source';
import { useEventList } from '~/hooks/event-list/use-event-list';
import { BaseEvent } from '~/types/schemas/event';

const eventType = {
  '10': 'follow',
  '20': 'cheer',
  '30': 'subscribe',
  '31': 'subscription_gift',
  '40': 'raid',
  '50': 'hype_train_begin',
  '52': 'hype_train_end',
  '60': 'goal_begin',
  '62': 'goal_end',
};

export const EventListEmbed = () => {
  const [events, setEvents] = useState<BaseEvent[]>([]);
  const { id } = useParams();
  const { data: theme, status } = useEventList(id!);

  const eventSource = useEventSource<BaseEvent>({
    onEventReceived: (event) => {
      console.log(event);
      setEvents((prev) => [...prev, event]);
    },
  });

  useEffect(() => {
    if (theme) {
      const close = eventSource.listen([`/users/${theme?.user_id}/events`]);

      return () => close();
    }
  }, [theme]);

  useEffect(() => {
    document.body.style.backgroundColor = 'transparent';
  }, []);

  if (!theme || status === 'error') {
    return <div>Loading...</div>;
  }

  const fonts = [
    {
      font: theme.theme.events.styles.all.message.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.all.name.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.follow.name.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.follow.message.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.subscribe.name.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.subscribe.message.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.subscription_gift.name.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.subscription_gift.message.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.raid.name.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.raid.message.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.cheer.name.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.cheer.message.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.hype_train_begin.name.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.hype_train_begin.message.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.hype_train_end.name.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.hype_train_end.message.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.goal_begin.name.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.goal_begin.message.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.goal_end.name.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
    {
      font: theme.theme.events.styles.goal_end.message.text_style.fontFamily,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    },
  ];

  return (
    <>
      <GoogleFontLoader fonts={fonts} />
      <div className="flex h-screen flex-1 flex-col items-end justify-end">
        {events.map((event, i) => {
          const eventsActivate = theme.theme.events_activate.map((e) => {
            return {
              label: e.label,
              value: parseInt(e.value),
            };
          });
          if (eventsActivate.find((e) => e.value === event.type)) {
            return (
              <AnimatePresence key={`${event.id}-${i}`}>
                <EventListItem
                  theme={theme.theme}
                  name={
                    theme.theme.events.texts[
                      eventType[event.type] as
                        | 'follow'
                        | 'cheer'
                        | 'subscribe'
                        | 'subscription_gift'
                        | 'raid'
                        | 'hype_train_begin'
                        | 'hype_train_end'
                        | 'goal_begin'
                        | 'goal_end'
                    ].name
                  }
                  message={
                    theme.theme.events.texts[
                      eventType[event.type] as
                        | 'follow'
                        | 'cheer'
                        | 'subscribe'
                        | 'subscription_gift'
                        | 'raid'
                        | 'hype_train_begin'
                        | 'hype_train_end'
                        | 'goal_begin'
                        | 'goal_end'
                    ].message
                  }
                  event={event}
                  type={
                    eventType[event.type] as
                      | 'follow'
                      | 'cheer'
                      | 'subscribe'
                      | 'subscription_gift'
                      | 'raid'
                      | 'hype_train_begin'
                      | 'hype_train_end'
                      | 'goal_begin'
                      | 'goal_end'
                  }
                />
              </AnimatePresence>
            );
          }
        })}
      </div>
    </>
  );
};
