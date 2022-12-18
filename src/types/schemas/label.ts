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
  title: z.string(),
  order: OrderSchema,
  container: LabelContainerSchema,
  label: LabelLabelSchema,
  value: LabelValueSchema,
});

export type Label = z.infer<typeof LabelSchema>;
