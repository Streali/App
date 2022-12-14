import {
  EventType,
  BaseEvent,
  FollowEvent,
  CheerEvent,
  SubscriptionMessageEvent,
  SubscriptionGiftEvent,
  RaidEvent,
  HypeTrainBeginEvent,
  HypeTrainEndEvent,
  GoalBeginEvent,
  GoalEndEvent,
} from '~/types/schemas/event';
import { Icon } from '~/components/icon/icon';
import { useReplayEvent } from '~/hooks/event/use-replay-event';
import { HumanDate } from '~/utils/date/human-date';
import { SubscribeTierToText } from '~/utils/event/subscribe-tier-to-text';
import './event.scss';

interface EventProps {
  event: BaseEvent;
}

const EventTypeText: Record<typeof EventType[keyof typeof EventType], string> = {
  [EventType.Follow]: '💜',
  [EventType.Cheer]: '💰',
  [EventType.Subscribe]: '🔔',
  [EventType.SubscriptionGift]: '🎁',
  [EventType.Raid]: '📢',
  [EventType.HypeTrainBegin]: '🚂',
  [EventType.HypeTrainEnd]: '🚂',
  [EventType.GoalBegin]: '🎯',
  [EventType.GoalEnd]: '🎯',
};

const EventTypeMessage = {
  [EventType.Follow]: (event: FollowEvent) => (
    <p>
      <strong className="font-bold">{event.displayName}</strong> followed you.
    </p>
  ),
  [EventType.Cheer]: (event: CheerEvent) => (
    <p>
      <strong className="font-bold">{event.isAnonymous ? 'Anonymous' : event.displayName}</strong>{' '}
      cheered <strong>{event.bits} bits</strong>.
    </p>
  ),
  [EventType.Subscribe]: (event: SubscriptionMessageEvent) => (
    <p>
      <strong className="font-bold">{event.displayName}</strong> subscribed with{' '}
      <strong>{SubscribeTierToText(event.tier)} tier</strong>.
    </p>
  ),
  [EventType.SubscriptionGift]: (event: SubscriptionGiftEvent) => (
    <p>
      <strong className="font-bold">{event.isAnonymous ? 'Anonymous' : event.displayName}</strong>{' '}
      gifted <strong>{event.total}</strong> subs.
    </p>
  ),
  [EventType.Raid]: (event: RaidEvent) => (
    <p>
      <strong className="font-bold">{event.displayName}</strong> raided you with{' '}
      <strong>{event.viewers}</strong> viewers.
    </p>
  ),
  [EventType.HypeTrainBegin]: (event: HypeTrainBeginEvent) => (
    <p>
      A new hype train has started with <strong className="font-bold">{event.total}%</strong>.
    </p>
  ),
  [EventType.HypeTrainEnd]: (event: HypeTrainEndEvent) => (
    <p>
      The hype train is ended at level <strong className="font-bold">{event.level}</strong> with{' '}
      <strong>{event.total}%</strong>.
    </p>
  ),
  [EventType.GoalBegin]: (event: GoalBeginEvent) => (
    <p>
      A new <strong className="font-bold">{event.type}</strong> goal has started with{' '}
      <strong className="font-bold">{event.targetAmount} target</strong>.
    </p>
  ),
  [EventType.GoalEnd]: (event: GoalEndEvent) => (
    <p>
      The <strong className="font-bold">{event.type}</strong> goal has ended with{' '}
      <strong className="font-bold">{event.currentAmount}</strong>.
    </p>
  ),
};

export const Event = (props: EventProps) => {
  const { event } = props;

  const { mutate: replay } = useReplayEvent();

  return (
    <>
      <div className="flex w-full items-center divide-x divide-dark-300 border-b border-dark-300 bg-dark-400 py-2 first-of-type:rounded-t-lg last-of-type:rounded-b-lg last-of-type:border-b-0">
        <span className="inline-flex h-full items-center px-3 font-bold uppercase text-white">
          {EventTypeText[event.type]}
        </span>

        <div className="w-9 shrink-0 text-center text-dark-100">{HumanDate(event.created_at)}</div>

        <div className="flex-grow px-3">
          {EventTypeMessage[event.type](event.payload as any)}
          {'message' in event.payload && event.payload.message && (
            <div className="mt-1 text-light-200">
              <p
                className="event inline w-full"
                dangerouslySetInnerHTML={{
                  __html: `"${event.payload.message.replaceAll(':scale:', '1.0')}"`,
                }}
              ></p>
            </div>
          )}
        </div>

        <button onClick={() => replay(event.id)}>
          <Icon
            name="refresh-line"
            className="h-6 w-6 cursor-pointer px-3 text-dark-100 transition-colors duration-150 hover:text-white"
          />
        </button>
      </div>
    </>
  );
};
