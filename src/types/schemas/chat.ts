import * as z from 'zod';
import {
  BorderSchema,
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
});

export const ChatThemeMessageSchema = z.object({
  text: TextStyleSchema,
  background: z.string(),
  shadow: ShadowSchema,
  border: BorderSettingsSchema,
  margin: SpacingSchema,
  padding: SpacingSchema,
  radius: BorderRadiusSchema,
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
});

export const ChatThemeSchema = z.object({
  id: z.string(),
  title: z.string(),
  global: ChatThemeGlobalSchema,
  message: ChatThemeMessageSchema,
  name: ChatThemeNameSchema,
});

export type ChatTheme = z.infer<typeof ChatThemeSchema>;
export type NameChat = z.infer<typeof ChatThemeNameSchema>;
export type GlobalChat = z.infer<typeof ChatThemeGlobalSchema>;
export type MessageChat = z.infer<typeof ChatThemeMessageSchema>;
