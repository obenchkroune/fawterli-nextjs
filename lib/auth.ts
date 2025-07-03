import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord';
import { env } from './env';
import { redirect } from 'next/navigation';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Discord({
			clientId: env.AUTH_DISCORD_ID,
			clientSecret: env.AUTH_DISCORD_SECRET,
		}),
	],
});

export async function getUser() {
	const session = await auth();
	if (!session?.user) {
		return redirect('/signin');
	}
	return session.user;
}
