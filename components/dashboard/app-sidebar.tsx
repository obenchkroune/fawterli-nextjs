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

const navItems = [
	{
		title: 'Dashboard',
		icon: Home,
		url: '#',
		isActive: true,
	},
	{
		title: 'Invoices',
		icon: FileText,
		url: '#',
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
									<SidebarMenuButton asChild isActive={item.isActive}>
										<a href={item.url}>
											<item.icon className="size-4" />
											<span>{item.title}</span>
										</a>
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
