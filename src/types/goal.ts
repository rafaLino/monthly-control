import { z } from 'zod';

export const Schema = z
  .object({
    incomes: z.coerce.number(),
    expenses: z.coerce.number(),
    investments: z.coerce.number()
  })
  .refine(
    (value) => {
      const sum = value.incomes + value.expenses + value.investments;
      return sum === 1;
    },
    { message: "Goal's sum should be 1" }
  );

export type Goal = z.infer<typeof Schema>;

export type StatusGoal = 'OK' | 'WARNING' | 'NOK';
