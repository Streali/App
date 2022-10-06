import * as z from 'zod';
import {
  ShadowSchema,
  BorderRadiusSchema,
  TextStyleSchema,
  SpacingSchema,
  BorderSettingsSchema,
} from './components';
import type { Milliseconds, Pixels } from '~/types/types/custom';

export const AlertElementGlobalSchema = z.object({
  type: z.enum(['text', 'image', 'video', 'lottie', 'audio']),
  id: z.string(),
  title: z.string(),
  color: z.string(),
  posX: z.number().transform((v) => v as Pixels),
  posY: z.number().transform((v) => v as Pixels),
  width: z.number().transform((v) => v as Pixels),
  height: z.number().transform((v) => v as Pixels),
  duration: z.number().transform((v) => v as Milliseconds),
  start_time: z.number(),
  animation_in: z.optional(z.string()),
  animation_out: z.optional(z.string()),
});

export const AlertElementTextSettingsSchema = z.object({
  content: z.string(),
  is_dynamic: z.boolean(),
  dynamic_content: z.string(),
  shadow: ShadowSchema,
  border: BorderSettingsSchema,
  background: z.string(),
  radius: BorderRadiusSchema,
  text: TextStyleSchema,
  padding: SpacingSchema,
});

export const AlertTextElementSchema = AlertElementGlobalSchema.extend({
  settings: AlertElementTextSettingsSchema,
});

export const AlertElementImageSettingsSchema = z.object({
  url: z.string(),
});

export const AlertImageElementSchema = AlertElementGlobalSchema.extend({
  settings: AlertElementImageSettingsSchema,
});

export const AlertElementVideoSettingsSchema = z.object({
  url: z.string(),
  muted: z.boolean(),
  loop: z.boolean(),
});

export const AlertVideoElementSchema = AlertElementGlobalSchema.extend({
  settings: AlertElementVideoSettingsSchema,
});

export const AlertElementAudioSettingsSchema = z.object({
  url: z.string(),
  muted: z.boolean(),
  loop: z.boolean(),
  volume: z.number(),
});

export const AlertAudioElementSchema = AlertElementGlobalSchema.extend({
  settings: AlertElementAudioSettingsSchema,
});

export const AlertElementLottieSettingsSchema = z.object({
  url: z.string(),
});

export const AlertLottieElementSchema = AlertElementGlobalSchema.extend({
  settings: AlertElementLottieSettingsSchema,
});

export const AlertElementSchema = z.union([
  AlertTextElementSchema,
  AlertImageElementSchema,
  AlertVideoElementSchema,
  AlertAudioElementSchema,
  AlertLottieElementSchema,
]);

export const AlertElementsSchema = AlertElementSchema.array();

export const AlertThemeSchema = z.object({
  id: z.string(),
  title: z.string(),
  user_id: z.string(),
  type: z.enum([
    'follow',
    'subscribe',
    'raid',
    'cheer',
    'subscription_gift',
    'hype_train_begin',
    'hype_train_progress',
    'hype_train_end',
    'goal_begin',
    'goal_end',
  ]),
  width: z.number(),
  height: z.number(),
  duration: z.number(),
  elements: AlertElementsSchema,
});

export type AlertTheme = z.infer<typeof AlertThemeSchema>;
export type AlertElement = z.infer<typeof AlertElementSchema>;
export type AlertElements = z.infer<typeof AlertElementsSchema>;
// Elements
export type AlertTextElement = z.infer<typeof AlertTextElementSchema>;
export type AlertImageElement = z.infer<typeof AlertImageElementSchema>;
export type AlertVideoElement = z.infer<typeof AlertVideoElementSchema>;
export type AlertAudioElement = z.infer<typeof AlertAudioElementSchema>;
export type AlertLottieElement = z.infer<typeof AlertLottieElementSchema>;
// Settings
export type AlertElementTextSettings = z.infer<typeof AlertElementTextSettingsSchema>;
export type AlertElementImageSettings = z.infer<typeof AlertElementImageSettingsSchema>;
export type AlertElementVideoSettings = z.infer<typeof AlertElementVideoSettingsSchema>;
export type AlertElementAudioSettings = z.infer<typeof AlertElementAudioSettingsSchema>;
export type AlertElementLottieSettings = z.infer<typeof AlertElementLottieSettingsSchema>;
