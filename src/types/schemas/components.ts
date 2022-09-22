import * as z from 'zod';

export const ShadowSchema = z.object({
  shadowColor: z.string(),
  shadowOffsetX: z.number(),
  shadowOffsetY: z.number(),
  shadowBlur: z.number(),
});

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

export const BorderSchema = z.object({
  color: z.string(),
  width: z.number(),
  style: z.string(),
});

export const BorderSettingsSchema = z.object({
  top: BorderSchema,
  right: BorderSchema,
  bottom: BorderSchema,
  left: BorderSchema,
});

export const BorderRadiusSchema = z.object({
  topLeft: z.number(),
  topRight: z.number(),
  bottomRight: z.number(),
  bottomLeft: z.number(),
});

export const SpacingSchema = z.object({
  top: z.number(),
  right: z.number(),
  bottom: z.number(),
  left: z.number(),
});

export const BadgesSchema = z.object({
  enabled: z.boolean(),
  position: z.enum(['left', 'right']),
  style: z.enum(['twitch']),
  size: z.number(),
  space: z.number(),
  spaceBetween: z.number(),
});

export const OrderSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);
