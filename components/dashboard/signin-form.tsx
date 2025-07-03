'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	FaGithub,
	FaGoogle,
	FaFacebook,
	FaTwitter,
	FaApple,
	FaDiscord,
} from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import type { ProviderId } from 'next-auth/providers';
import type { IconType } from 'react-icons/lib';
import { cn } from '@/lib/utils';

type StringLiteral<T> = T extends string
	? string extends T
		? never
		: T
	: never;

type ProviderItem = {
	name: StringLiteral<ProviderId>;
	icon: IconType;
	color: string;
	disabled: boolean;
};

export function SignInForm() {
	const oauthProviders: ProviderItem[] = [
		{
			name: 'google',
			icon: FaGoogle,
			color: 'hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-950',
			disabled: true,
		},
		{
			name: 'discord',
			icon: FaDiscord,
			color:
				'hover:bg-indigo-50 hover:border-indigo-200 dark:hover:bg-indigo-950',
			disabled: false,
		},
		{
			name: 'facebook',
			icon: FaFacebook,
			color: 'hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950',
			disabled: true,
		},
		{
			name: 'github',
			icon: FaGithub,
			color: 'hover:bg-gray-50 hover:border-gray-200 dark:hover:bg-gray-800',
			disabled: true,
		},
		{
			name: 'twitter',
			icon: FaTwitter,
			color: 'hover:bg-sky-50 hover:border-sky-200 dark:hover:bg-sky-950',
			disabled: true,
		},
		{
			name: 'apple',
			icon: FaApple,
			color: 'hover:bg-gray-50 hover:border-gray-200 dark:hover:bg-gray-800',
			disabled: true,
		},
	];

	return (
		<Card className="w-full max-w-md mx-auto shadow-lg">
			<CardHeader className="space-y-1 text-center">
				<CardTitle className="text-2xl font-bold tracking-tight">
					Welcome back
				</CardTitle>
				<CardDescription className="text-muted-foreground">
					Sign in to your account to continue
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* OAuth Providers */}
				<div className="space-y-3">
					<div className="grid grid-cols-2 gap-3">
						{oauthProviders.map((provider) => (
							<Button
								disabled={provider.disabled}
								key={provider.name}
								variant="outline"
								className={cn(
									provider.color,
									'w-full transition-colors capitalize',
								)}
								aria-label={`Sign in with ${provider.name}`}
								onClick={() => signIn(provider.name)}
							>
								<provider.icon className="mr-2 h-4 w-4" />
								{provider.name}
							</Button>
						))}
					</div>
				</div>

				{/* <div className="relative">
					<div className="absolute inset-0 flex items-center">
						<Separator className="w-full" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>

				<form className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email" className="text-sm font-medium">
							Email address
						</Label>
						<div className="relative">
							<Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="Enter your email"
								className="pl-10"
								required
								aria-describedby="email-error"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="password" className="text-sm font-medium">
								Password
							</Label>
							<Link
								href="/forgot-password"
								className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
							>
								Forgot password?
							</Link>
						</div>
						<div className="relative">
							<Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="Enter your password"
								className="pl-10"
								required
								aria-describedby="password-error"
							/>
						</div>
					</div>

					<Button type="submit" className="w-full" size="lg">
						Sign in
					</Button>
				</form> */}
			</CardContent>

			<CardFooter className="flex flex-col space-y-4">
				{/* <div className="text-center text-sm text-muted-foreground">
					{"Don't have an account? "}
					<Link
						href="/signup"
						className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
					>
						Sign up
					</Link>
				</div> */}

				<div className="text-center">
					<p className="text-xs text-muted-foreground">
						By signing in, you agree to our{' '}
						<Link
							href="/terms"
							className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
						>
							Terms of Service
						</Link>{' '}
						and{' '}
						<Link
							href="/privacy"
							className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
						>
							Privacy Policy
						</Link>
					</p>
				</div>
			</CardFooter>
		</Card>
	);
}
