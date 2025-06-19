import { z } from 'zod';

export const VaporizerSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  manufacturer: z.string(),
  description: z.string().optional(), // Making description optional as it's used in ProductDisplayPage but not in example
  msrp: z.string().optional(), // Example shows "449" as string
  releaseDate: z.string().nullable().optional(),
  heatingMethod: z.string().nullable().optional(),
  tempControl: z.string().nullable().optional(),
  expertScore: z.string().nullable().optional(),
  userRating: z.string().nullable().optional(),
  bestFor: z.array(z.string()).optional(),
  imageUrl: z.string().url().optional(), // Keeping imageUrl optional
  // Removed: brand, price, createdAt, updatedAt
});

export type Vaporizer = z.infer<typeof VaporizerSchema>;
