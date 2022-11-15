import * as z from 'zod';

export const EventType = {
  Follow: 10,
  Cheer: 20,
  Subscribe: 30,
  SubscriptionGift: 31,
  Raid: 40,
  HypeTrainBegin: 50,
  HypeTrainProgress: 51,
  HypeTrainEnd: 52,
  GoalBegin: 60,
  GoalEnd: 62,
} as const;

export const EventSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(EventType),
  created_at: z.string(),
  user_id: z.string(),
});
