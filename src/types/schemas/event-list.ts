import { z } from 'zod';
import {
  BorderRadiusSchema,
  BorderSettingsSchema,
  ShadowSchema,
  SpacingSchema,
  TextStyleSchema,
} from './components';

export const EventListContainerStylesSchema = z.object({
  full_width: z.boolean(),
  background: z.string(),
  border: BorderSettingsSchema,
  margin: SpacingSchema,
  padding: SpacingSchema,
  radius: BorderRadiusSchema,
  shadow: ShadowSchema,
});

export const EventListMessageStylesSchema = z.object({
  text_style: TextStyleSchema,
  accent: TextStyleSchema,
  background: z.string(),
  border: BorderSettingsSchema,
  margin: SpacingSchema,
  padding: SpacingSchema,
  radius: BorderRadiusSchema,
  shadow: ShadowSchema,
});

export const EventListNameStylesSchema = z.object({
  hide: z.boolean(),
  text_style: TextStyleSchema,
  background: z.string(),
  border: BorderSettingsSchema,
  margin: SpacingSchema,
  padding: SpacingSchema,
  radius: BorderRadiusSchema,
  shadow: ShadowSchema,
});

export const EventListStylesSchema = z.object({
  container: EventListContainerStylesSchema,
  message: EventListMessageStylesSchema,
  name: EventListNameStylesSchema,
});

export const EventListTextsSchema = z.object({
  name: z.string(),
  message: z.string(),
});

export const EventListItemSchema = z.object({
  modify_all: z.boolean(),
  styles: z.object({
    all: EventListStylesSchema,
    follow: EventListStylesSchema,
    cheer: EventListStylesSchema,
    subscribe: EventListStylesSchema,
    subscription_gift: EventListStylesSchema,
    raid: EventListStylesSchema,
    hype_train_begin: EventListStylesSchema,
    hype_train_end: EventListStylesSchema,
    goal_begin: EventListStylesSchema,
    goal_end: EventListStylesSchema,
  }),
  texts: z.object({
    follow: EventListTextsSchema,
    cheer: EventListTextsSchema,
    subscribe: EventListTextsSchema,
    subscription_gift: EventListTextsSchema,
    raid: EventListTextsSchema,
    hype_train_begin: EventListTextsSchema,
    hype_train_end: EventListTextsSchema,
    goal_begin: EventListTextsSchema,
    goal_end: EventListTextsSchema,
  }),
});

export const EventListSchema = z.object({
  title: z.string(),
  events_activate: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  alignment: z.enum(['left', 'center', 'right']),
  events_spacing: z.number(),
  animation_in: z.string(),
  animation_out: z.optional(z.string()),
  delete_event: z.boolean(),
  duration_before_delete: z.number(),
  events: EventListItemSchema,
});

export const EventListResponseSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  theme: EventListSchema,
  user_id: z.string(),
});

export type EventList = z.infer<typeof EventListSchema>;
export type EventListContainerStyles = z.infer<typeof EventListContainerStylesSchema>;
export type EventListMessageStyles = z.infer<typeof EventListMessageStylesSchema>;
export type EventListNameStyles = z.infer<typeof EventListNameStylesSchema>;
export type EventListStyles = z.infer<typeof EventListStylesSchema>;
export type EventListTexts = z.infer<typeof EventListTextsSchema>;
export type EventListItem = z.infer<typeof EventListItemSchema>;
export type EventListResponse = z.infer<typeof EventListResponseSchema>;
