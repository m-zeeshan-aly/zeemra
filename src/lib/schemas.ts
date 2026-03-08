import { z } from 'zod';

export const CartItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive().optional(), // we pass without quantity or with quantity in context
  emoji: z.string(),
  size: z.string().optional(),
  color: z.string().optional(),
});

export type CartItemAPI = z.infer<typeof CartItemSchema>;
