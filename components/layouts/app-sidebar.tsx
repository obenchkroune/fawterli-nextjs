'use client';

import {
	BarChart3,
	CreditCard,
	FileText,
	Home,
	Settings,
	Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
	{
		title: 'Dashboard',
		icon: Home,
		url: '/dashboard',
	},
	{
		title: 'Invoices',
		icon: FileText,
		url: '/invoices',
	},
	{
		title: 'Customers',
		icon: Users,
		url: '#',
	},
	{
		title: 'Reports',
		icon: BarChart3,
		url: '#',
	},
	{
		title: 'Settings',
		icon: Settings,
		url: '#',
	},
];

export default function AppSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarHeader>
				<div className="flex items-center gap-2 px-4 py-2">
					<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
						<CreditCard className="size-4" />
					</div>
					<div className="flex flex-col gap-0.5 leading-none">
						<span className="font-semibold">Fawterli</span>
						<span className="text-xs text-muted-foreground">Dashboard</span>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={pathname.startsWith(item.url)}
									>
										<Link href={item.url}>
											<item.icon className="size-4" />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<Button
					variant="destructive"
					onClick={() => signOut({ redirectTo: '/' })}
				>
					Sign-Out
				</Button>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
