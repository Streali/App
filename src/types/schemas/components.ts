import * as z from 'zod';

export const ShadowSchema = z.object({
  shadowColor: z.string(),
  shadowOffsetX: z.number(),
  shadowOffsetY: z.number(),
  shadowBlur: z.number(),
});

export type ShadowType = z.infer<typeof ShadowSchema>;

export const TextStyleSchema = z.object({
  fontFamily: z.string(),
  fontSize: z.number(),
  fontWeight: z.string(),
  color: z.string(),
  textAlign: z.string(),
  textDecoration: z.string(),
  fontStyle: z.string(),
  letterSpacing: z.number(),
  lineHeight: z.number(),
  textShadow: ShadowSchema,
});

export type TextStyleType = z.infer<typeof TextStyleSchema>;

export const BorderSchema = z.object({
  color: z.string(),
  width: z.number(),
  style: z.string(),
});

export type BorderType = z.infer<typeof BorderSchema>;

export const BorderSettingsSchema = z.object({
  top: BorderSchema,
  right: BorderSchema,
  bottom: BorderSchema,
  left: BorderSchema,
});

export type BorderSettingsType = z.infer<typeof BorderSettingsSchema>;

export const BorderRadiusSchema = z.object({
  top_left: z.number(),
  top_right: z.number(),
  bottom_right: z.number(),
  bottom_left: z.number(),
});

export type BorderRadiusType = z.infer<typeof BorderRadiusSchema>;

export const SpacingSchema = z.object({
  top: z.number(),
  right: z.number(),
  bottom: z.number(),
  left: z.number(),
});

export type SpacingType = z.infer<typeof SpacingSchema>;

export const BadgesSchema = z.object({
  enabled: z.boolean(),
  position: z.enum(['left', 'right']),
  style: z.enum(['twitch']),
  size: z.number(),
  space: z.number(),
  space_between: z.number(),
});

export type BadgesType = z.infer<typeof BadgesSchema>;

export const OrderSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export type OrderType = z.infer<typeof OrderSchema>;
