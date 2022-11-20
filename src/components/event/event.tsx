import {
  EventType,
  Event as EventTypes,
  FollowEvent,
  CheerEvent,
  SubscribeEvent,
  SubscriptionGiftEvent,
  RaidEvent,
  HypeTrainBeginEvent,
  HypeTrainProgressEvent,
  HypeTrainEndEvent,
  GoalBeginEvent,
  GoalEndEvent,
} from '~/types/schemas/event';
import { SubscribeTierToText } from '~/utils/event/subscribe-tier-to-text';
import './event.scss';

interface EventProps {
  event: EventTypes;
}

const EventTypeText: Record<typeof EventType[keyof typeof EventType], string> = {
  [EventType.Follow]: 'Follow',
  [EventType.Cheer]: 'Cheer',
  [EventType.Subscribe]: 'Subscribe',
  [EventType.SubscriptionGift]: 'Subscription Gift',
  [EventType.Raid]: 'Raid',
  [EventType.HypeTrainBegin]: 'Hype Train Begin',
  [EventType.HypeTrainProgress]: 'Hype Train Progress',
  [EventType.HypeTrainEnd]: 'Hype Train End',
  [EventType.GoalBegin]: 'Goal Begin',
  [EventType.GoalEnd]: 'Goal End',
};

const EventTypeMessage = {
  [EventType.Follow]: (event: FollowEvent) => (
    <p>
      <strong className="font-bold">{event.displayName}</strong> as followed you.
    </p>
  ),
  [EventType.Cheer]: (event: CheerEvent) => (
    <p>
      <strong className="font-bold">{event.isAnonymous ? 'Anonymous' : event.displayName}</strong>{' '}
      as cheered <strong>{event.bits} bits.</strong>.
    </p>
  ),
  [EventType.Subscribe]: (event: SubscribeEvent) => (
    <p>
      <strong className="font-bold">{event.displayName}</strong> as subscribed to you with{' '}
      <strong>{SubscribeTierToText(event.tier)} tier</strong>.
    </p>
  ),
  [EventType.SubscriptionGift]: (event: SubscriptionGiftEvent) => (
    <p>
      <strong className="font-bold">{event.isAnonymous ? 'Anonymous' : event.displayName}</strong>{' '}
      as gifted <strong>{event.total}</strong> subs to you.
    </p>
  ),
  [EventType.Raid]: (event: RaidEvent) => (
    <p>
      <strong className="font-bold">{event.displayName}</strong> as raided you with{' '}
      <strong>{event.viewers}</strong> viewers.
    </p>
  ),
  [EventType.HypeTrainBegin]: (event: HypeTrainBeginEvent) => (
    <p>
      A new hype train has started with <strong className="font-bold">{event.total}%</strong>.
    </p>
  ),
  [EventType.HypeTrainProgress]: (event: HypeTrainProgressEvent) => (
    <p>
      The hype train is now at level <strong className="font-bold">{event.level}</strong> with{' '}
      <strong>{event.progress}%</strong>.
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
  return (
    <>
      <div className="flex w-full items-center border-b border-dark-300 bg-dark-400 py-2 first-of-type:rounded-t-lg last-of-type:rounded-b-lg last-of-type:border-b-0">
        <span className="inline-flex h-full items-center border-r border-dark-300 px-3 text-xxs font-bold uppercase text-white">
          {EventTypeText[event.type]}
        </span>
        <div className="px-3 text-sm">
          {EventTypeMessage[event.type](event.payload as unknown as any)}
        </div>
      </div>
      {event.payload.message && (
        <div className="bg-dark-600 py-2 px-3">
          <p
            className="event inline w-full text-xs"
            dangerouslySetInnerHTML={{
              __html: event.payload.message.replaceAll(':scale:', '1.0'),
            }}
          ></p>
        </div>
      )}
    </>
  );
};
