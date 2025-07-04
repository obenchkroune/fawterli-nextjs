import { z } from 'zod';

const envSchema = z.object({
	AUTH_SECRET: z.string().min(1),
	AUTH_DISCORD_ID: z.string().min(1),
	AUTH_DISCORD_SECRET: z.string().min(1),
	DATABASE_URL: z.string().min(1),
});

export const env = envSchema.parse(process.env);
