import {
  BaseEvent,
  CheerEvent,
  FollowEvent,
  SubscriptionGiftEvent,
  RaidEvent,
  HypeTrainEndEvent,
  GoalBeginEvent,
  GoalEndEvent,
  SubscriptionMessageEvent,
} from '~/types/schemas/event';
import { SubscribeTierToText } from '~/utils/event/subscribe-tier-to-text';

export const EventMessageToText = (message: string, event: BaseEvent) => {
  const regex = /\*\*(.*?)\*\*/g;

  if (event.type === 10) {
    const payload = event.payload as FollowEvent;
    return message
      .replaceAll('{{pseudo}}', payload.displayName)
      .replaceAll(regex, `<span>$1</span>`);
  }

  if (event.type === 20) {
    const payload = event.payload as CheerEvent;
    return message
      .replaceAll(
        '{{pseudo}}',
        payload.isAnonymous ? 'Anonymous' : payload.displayName ? payload.displayName : 'Unknown'
      )
      .replaceAll('{{amount}}', payload.bits.toString())
      .replaceAll(regex, '<span>$1</span>');
  }

  if (event.type === 30) {
    const payload = event.payload as SubscriptionMessageEvent;
    return message
      .replaceAll('{{pseudo}}', payload.displayName)
      .replaceAll('{{tier}}', SubscribeTierToText(payload.tier))
      .replaceAll('{{months}}', payload.cumulativeMonths.toString())
      .replaceAll('{{streak}}', payload.streakMonths ? payload.streakMonths.toString() : '1')
      .replaceAll('{{duration}}', payload.durationMonths.toString())
      .replaceAll(regex, '<span>$1</span>');
  }

  if (event.type === 31) {
    const payload = event.payload as SubscriptionGiftEvent;
    return message
      .replaceAll(
        '{{pseudo}}',
        payload.isAnonymous ? 'Anonymous' : payload.displayName ? payload.displayName : 'Unknown'
      )
      .replaceAll('{{amount}}', payload.total.toString())
      .replaceAll(
        '{{cumulative}}',
        payload.cumulativeTotal ? payload.cumulativeTotal.toString() : '1'
      )
      .replaceAll('{{tier}}', SubscribeTierToText(payload.tier))
      .replaceAll(regex, '<span>$1</span>');
  }

  if (event.type === 40) {
    const payload = event.payload as RaidEvent;
    return message
      .replaceAll('{{pseudo}}', payload.displayName)
      .replaceAll('{{viewers}}', payload.viewers.toString())
      .replaceAll(regex, '<span>$1</span>');
  }

  if (event.type === 50) {
    const payload = event.payload as HypeTrainEndEvent;
    return message
      .replaceAll('{{level}}', payload.level.toString())
      .replaceAll(regex, '<span>$1</span>');
  }

  if (event.type === 52) {
    const payload = event.payload as HypeTrainEndEvent;
    return message
      .replaceAll('{{level}}', payload.level.toString())
      .replaceAll(regex, '<span>$1</span>');
  }

  if (event.type === 60) {
    const payload = event.payload as GoalBeginEvent;
    return message
      .replaceAll('{{amount}}', payload.currentAmount.toString())
      .replaceAll('{{target}}', payload.targetAmount.toString())
      .replaceAll('{{type}}', payload.type)
      .replaceAll(regex, '<span>$1</span>');
  }

  if (event.type === 62) {
    const payload = event.payload as GoalEndEvent;
    return message
      .replaceAll('{{amount}}', payload.currentAmount.toString())
      .replaceAll('{{target}}', payload.targetAmount.toString())
      .replaceAll('{{type}}', payload.type)
      .replaceAll(regex, '<span>$1</span>');
  }

  return message;
};
