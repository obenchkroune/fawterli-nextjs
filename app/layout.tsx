import { Provider } from '@/components/ui/provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Fawterli',
	description: 'Generate and manage your invoices with ease!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			style={{ height: '100%' }}
			className={cn(inter.className, '')}
			suppressHydrationWarning
		>
			<body style={{ height: '100%' }}>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
