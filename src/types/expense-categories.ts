import { z } from 'zod';

export const Schema = z.object({
    categories: z.array(
        z.object({
            name: z.string().min(1),
            value: z.array(z.string()).min(1)
        })
    ).refine(items => {
        const names = new Set(items.map(item => item.name.trim()))
        return names.size === items.length
    }, { message: 'All items must be unique.' })
});

export type ExpenseCategories = z.infer<typeof Schema>;
