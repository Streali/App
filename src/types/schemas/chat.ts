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

export const ChatAlignment = {
  left: 'left',
  center: 'center',
  right: 'right',
} as const;

export const ChatLayout = {
  stack: 'stack',
  inline: 'inline',
} as const;

export const ChatThemeGlobalSchema = z.object({
  space_between_messages: z.number(),
  alignment: z.nativeEnum(ChatAlignment),
  layout: z.nativeEnum(ChatLayout),
  order: OrderSchema,
  animation: z.string(),
});

export const ChatThemeContainerSchema = z.object({
  background_twitch_color: z.boolean(),
  background: z.string(),
  shadow: ShadowSchema,
  border: BorderSettingsSchema,
  margin: SpacingSchema,
  padding: SpacingSchema,
  radius: BorderRadiusSchema,
  full_width: z.boolean(),
  alignment: z.nativeEnum(ChatAlignment),
});

export const ChatThemeMessageSchema = z.object({
  text_twitch_color: z.boolean(),
  text: TextStyleSchema,
  background_twitch_color: z.boolean(),
  background: z.string(),
  shadow: ShadowSchema,
  border: BorderSettingsSchema,
  margin: SpacingSchema,
  padding: SpacingSchema,
  radius: BorderRadiusSchema,
  full_width: z.boolean(),
});

export const ChatThemeNameSchema = z.object({
  text_twitch_color: z.boolean(),
  text: TextStyleSchema,
  background_twitch_color: z.boolean(),
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
  container: ChatThemeContainerSchema,
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
  container: ChatThemeContainerSchema,
  message: ChatThemeMessageSchema,
  name: ChatThemeNameSchema,
});

export type TwitchMessage = z.infer<typeof TwitchMessageSchema>;
export type ChatTheme = z.infer<typeof ChatThemeSchema>;
export type NameChat = z.infer<typeof ChatThemeNameSchema>;
export type GlobalChat = z.infer<typeof ChatThemeGlobalSchema>;
export type MessageChat = z.infer<typeof ChatThemeMessageSchema>;
export type ContainerChat = z.infer<typeof ChatThemeContainerSchema>;
export type TwitchBadge = z.infer<typeof TwitchBadgeSchema>;
