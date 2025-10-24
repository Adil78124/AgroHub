import { z } from "zod";

/**
 * Научное исследование для каталога
 */
export const researchSchema = z.object({
  id: z.string(),
  category: z.string(),
  isPremium: z.boolean().optional().default(false),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  pages: z.number(),
  publishedAt: z.string(),
  requiresPurchases: z.boolean().optional().default(true),
});

export type Research = z.infer<typeof researchSchema>;

