/**
 * Validation Schemas using Zod
 */

import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .trim(),
  password: z
    .string()
    .min(3, 'Password must be at least 3 characters'),
});

export const pokemonQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'number']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type PokemonQuery = z.infer<typeof pokemonQuerySchema>;
