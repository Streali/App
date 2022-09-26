import * as z from 'zod';
import {
  OrderSchema,
  ShadowSchema,
  TextStyleSchema,
  SpacingSchema,
  BorderRadiusSchema,
  BadgesSchema,
  BorderSettingsSchema,
} from './components';

export const ChatThemeGlobalSchema = z.object({
  space_between_messages: z.number(),
  alignment: z.enum(['left', 'center', 'right']),
  layout: z.enum(['stack', 'inline']),
  order: OrderSchema,
  animation: z.string(),
});

export const ChatThemeMessageSchema = z.object({
  text: TextStyleSchema,
  background: z.string(),
  shadow: ShadowSchema,
  border: BorderSettingsSchema,
  margin: SpacingSchema,
  padding: SpacingSchema,
  radius: BorderRadiusSchema,
  full_width: z.boolean(),
});

export const ChatThemeNameSchema = z.object({
  text: TextStyleSchema,
  background: z.string(),
  shadow: ShadowSchema,
  border: BorderSettingsSchema,
  margin: SpacingSchema,
  padding: SpacingSchema,
  radius: BorderRadiusSchema,
  badges: BadgesSchema,
  full_width: z.boolean(),
});

export const ChatThemeSchema = z.object({
  id: z.string(),
  title: z.string(),
  global: ChatThemeGlobalSchema,
  message: ChatThemeMessageSchema,
  name: ChatThemeNameSchema,
  user_id: z.string(),
});

export const TwitchBadgeSchema = z.object({
  admin: z.boolean(),
  broadcaster: z.boolean(),
  moderator: z.boolean(),
  partner: z.boolean(),
  vip: z.boolean(),
  artist: z.boolean(),
});

const TwitchMessageSchema = z.object({
  id: z.optional(z.string()),
  username: z.optional(z.string()),
  twitch: z.optional(z.string()),
  emotes: z.any(),
  date: z.date(),
  message: z.string(),
  badges: TwitchBadgeSchema,
  mod: z.optional(z.boolean()),
  subscriber: z.optional(z.boolean()),
  color: z.optional(z.string()),
});

export const ChatExportThemeSchema = z.object({
  global: ChatThemeGlobalSchema,
  message: ChatThemeMessageSchema,
  name: ChatThemeNameSchema,
});

export type TwitchMessage = z.infer<typeof TwitchMessageSchema>;
export type ChatTheme = z.infer<typeof ChatThemeSchema>;
export type NameChat = z.infer<typeof ChatThemeNameSchema>;
export type GlobalChat = z.infer<typeof ChatThemeGlobalSchema>;
export type MessageChat = z.infer<typeof ChatThemeMessageSchema>;
export type TwitchBadge = z.infer<typeof TwitchBadgeSchema>;
