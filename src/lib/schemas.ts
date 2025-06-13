// src/lib/schemas.ts
import { z } from 'zod';

const prioritiesSchema = z.object({
  vaporPotency: z.number().min(1).max(10),
  vaporComfort: z.number().min(1).max(10),
  portability: z.number().min(1).max(10),
  batteryLife: z.number().min(1).max(10),
  buildQuality: z.number().min(1).max(10),
  easeOfUse: z.number().min(1).max(10),
  maintenance: z.number().min(1).max(10),
  value: z.number().min(1).max(10),
});

export const userPreferencesSchema = z.object({
  cannabisExperience: z.enum(['novice', 'some-experience', 'experienced']).nullable(),
  primaryUse: z.enum(['medical', 'recreational', 'both']).nullable(),
  
  // Novice path specific - optional fields
  simplicityPreference: z.enum(['very-simple', 'some-features']).nullable().optional(),
  discretionImportance: z.enum(['very-important', 'somewhat', 'not-important']).nullable().optional(),
  
  // Experienced path specific - optional fields
  heatingMethod: z.enum(['convection', 'conduction', 'hybrid', 'no-preference']).nullable().optional(),
  airflowPreference: z.enum(['restricted', 'open', 'adjustable']).nullable().optional(),
  temperatureControl: z.enum(['precise', 'presets', 'simple']).nullable().optional(),
  
  // Common questions
  usagePattern: z.enum(['casual', 'daily', 'heavy', 'microdose']).nullable(),
  userType: z.enum(['flavor-chaser', 'on-the-go', 'home-primary', 'efficiency-focused']).nullable(),
  portability: z.enum(['pocket-size', 'portable', 'desktop', 'no-preference']).nullable(),
  budget: z.number().min(0), // Assuming budget can't be negative
  
  priorities: prioritiesSchema,
});

export type UserPreferencesFormData = z.infer<typeof userPreferencesSchema>;

// We can define schemas for individual steps later if needed for per-step validation
// For example:
// export const experienceStepSchema = userPreferencesSchema.pick({
//   cannabisExperience: true,
//   primaryUse: true,
// });
