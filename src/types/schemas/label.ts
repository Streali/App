import { z } from 'zod';
import { ChatAlignment } from './chat';
import {
  BorderRadiusSchema,
  BorderSettingsSchema,
  OrderSchema,
  ShadowSchema,
  SpacingSchema,
  TextStyleSchema,
} from './components';

export const LabelContainerSchema = z.object({
  background: z.string(),
  shadow: ShadowSchema,
  border: BorderSettingsSchema,
  margin: SpacingSchema,
  padding: SpacingSchema,
  radius: BorderRadiusSchema,
  full_width: z.boolean(),
  alignment: z.nativeEnum(ChatAlignment),
});

export const LabelLabelSchema = z.object({
  show: z.boolean(),
  full_width: z.boolean(),
  content: z.string(),
  text: TextStyleSchema,
  background: z.string(),
  shadow: ShadowSchema,
  border: BorderSettingsSchema,
  margin: SpacingSchema,
  padding: SpacingSchema,
  radius: BorderRadiusSchema,
});

export const LabelValueSchema = z.object({
  full_width: z.boolean(),
  content: z.string(),
  text: TextStyleSchema,
  accent: TextStyleSchema,
  background: z.string(),
  shadow: ShadowSchema,
  border: BorderSettingsSchema,
  margin: SpacingSchema,
  padding: SpacingSchema,
  radius: BorderRadiusSchema,
});

export const LabelSchema = z.object({
  order: OrderSchema,
  container: LabelContainerSchema,
  label: LabelLabelSchema,
  value: LabelValueSchema,
});

export const LabelResponseSchema = z.object({
  theme: LabelSchema,
  id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  user_id: z.string(),
  title: z.string(),
  secret: z.string(),
});

export const LabelDataSchema = z.object({
  latestFollower: z.object({
    displayName: z.string(),
  }),
  latestSubscriber: z.object({
    displayName: z.string(),
  }),
  subscriptionCount: z.object({
    amount: z.number(),
  }),
  viewerCount: z.object({
    amount: z.number(),
  }),
  followerCount: z.object({
    amount: z.number(),
  }),
  lastCheerDonor: z.object({
    displayName: z.string(),
    amount: z.number(),
  }),
});

export type Label = z.infer<typeof LabelSchema>;
export type LabelData = z.infer<typeof LabelDataSchema>;
export type LabelResponse = z.infer<typeof LabelResponseSchema>;
