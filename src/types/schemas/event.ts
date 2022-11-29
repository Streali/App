import { z } from 'zod';

export const EventType = {
  Follow: '10',
  Cheer: '20',
  Subscribe: '30',
  SubscriptionGift: '31',
  Raid: '40',
  HypeTrainBegin: '50',
  //HypeTrainProgress: '51',
  HypeTrainEnd: '52',
  GoalBegin: '60',
  GoalEnd: '62',
} as const;

export const SubscriptionTier = {
  Prime: 'prime',
  1000: '1000',
  2000: '2000',
  3000: '3000',
} as const;

const GoalType = {
  Follow: 'follow',
  Subscription: 'subscription',
  SubscriptionCount: 'subscription_count',
  NewSubscription: 'new_subscriptions',
  NewSubscriptionCount: 'new_subscriptions_count',
} as const;

export const FollowEventSchema = z.object({
  displayName: z.string(),
  username: z.string(),
  providerId: z.string(),
});

export const CheerEventSchema = z.object({
  displayName: z.string().nullable(),
  username: z.string().nullable(),
  providerId: z.string().nullable(),
  message: z.string(),
  bits: z.number(),
  isAnonymous: z.boolean(),
});

export const SubscriptionMessageEventSchema = z.object({
  displayName: z.string(),
  username: z.string(),
  providerId: z.string(),
  cumulativeMonths: z.number(),
  durationMonths: z.number(),
  streakMonths: z.number().nullable(),
  message: z.string().nullable(),
  tier: z.nativeEnum(SubscriptionTier),
});

export const SubscriptionGiftEventSchema = z.object({
  displayName: z.string().nullable(),
  username: z.string().nullable(),
  providerId: z.string().nullable(),
  cumulativeTotal: z.number().nullable(),
  total: z.number(),
  isAnonymous: z.boolean(),
  tier: z.nativeEnum(SubscriptionTier),
});

export const RaidEventSchema = z.object({
  displayName: z.string(),
  username: z.string(),
  providerId: z.string(),
  viewers: z.number(),
});

export const HypeTrainBeginEventSchema = z.object({
  total: z.number(),
  progress: z.number(),
  goal: z.number(),
  startedAt: z.string(),
  expiresAt: z.string(),
});

export const HypeTrainProgressEventSchema = z.object({
  level: z.number(),
  total: z.number(),
  progress: z.number(),
  goal: z.number(),
  startedAt: z.string(),
  expiresAt: z.string(),
});

export const HypeTrainEndEventSchema = z.object({
  level: z.number(),
  total: z.number(),
  topContributions: z.array(z.record(z.string(), z.string().or(z.number()))),
  lastContribution: z.record(z.string(), z.string().or(z.number())).optional(),
  startedAt: z.string(),
  expiresAt: z.string(),
  cooldownEndsAt: z.string(),
});

export const GoalBeginEventSchema = z.object({
  type: z.nativeEnum(GoalType),
  description: z.string(),
  currentAmount: z.number(),
  targetAmount: z.number(),
  startedAt: z.string(),
});

export const GoalEndEventSchema = z.object({
  type: z.nativeEnum(GoalType),
  description: z.string(),
  isAchieved: z.boolean(),
  currentAmount: z.number(),
  targetAmount: z.number(),
  startedAt: z.string(),
  endedAt: z.string(),
});

export const EventSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  type: z.nativeEnum(EventType),
  payload: z.union([
    CheerEventSchema,
    SubscriptionMessageEventSchema,
    SubscriptionGiftEventSchema,
    RaidEventSchema,
    HypeTrainBeginEventSchema,
    //HypeTrainProgressEventSchema,
    HypeTrainEndEventSchema,
    GoalBeginEventSchema,
    GoalEndEventSchema,
    FollowEventSchema,
  ]),
});

export type FollowEvent = z.infer<typeof FollowEventSchema>;
export type CheerEvent = z.infer<typeof CheerEventSchema>;
export type SubscriptionMessageEvent = z.infer<typeof SubscriptionMessageEventSchema>;
export type SubscriptionGiftEvent = z.infer<typeof SubscriptionGiftEventSchema>;
export type RaidEvent = z.infer<typeof RaidEventSchema>;
export type HypeTrainBeginEvent = z.infer<typeof HypeTrainBeginEventSchema>;
export type HypeTrainProgressEvent = z.infer<typeof HypeTrainProgressEventSchema>;
export type HypeTrainEndEvent = z.infer<typeof HypeTrainEndEventSchema>;
export type GoalBeginEvent = z.infer<typeof GoalBeginEventSchema>;
export type GoalEndEvent = z.infer<typeof GoalEndEventSchema>;
export type BaseEvent = z.infer<typeof EventSchema>;
