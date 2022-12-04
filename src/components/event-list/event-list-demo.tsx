import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { BaseEvent } from '~/types/schemas/event';
import { EventList } from '~/types/schemas/event-list';
import { fakeEvent } from '~/utils/event/fake-events';
import EventListItem from './event-list-item/event-list-item';

type EventListDemoProps = {
  theme: EventList;
};

const eventType = {
  10: 'follow',
  20: 'cheer',
  30: 'subscribe',
  31: 'subscription_gift',
  40: 'raid',
  50: 'hype_train_begin',
  52: 'hype_train_end',
  60: 'goal_begin',
  62: 'goal_end',
};

const choiceEvent = [10, 20, 30, 31, 40, 50, 52, 60, 62];

const EventListDemo = (props: EventListDemoProps) => {
  const { theme } = props;

  const [events, setEvents] = useState<BaseEvent[]>([]);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setEvents((d) => {
          if (d.length >= 50) d.shift();
          const newEvent: BaseEvent = fakeEvent(
            choiceEvent[Math.floor(Math.random() * choiceEvent.length)]
          );
          return [...d, newEvent];
        }),
      1250
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {events.map((event: BaseEvent) => (
        <AnimatePresence key={event.id}>
          <EventListItem
            theme={theme}
            name={
              theme.events.texts[
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
              theme.events.texts[
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
      ))}
    </>
  );
};

export default EventListDemo;
