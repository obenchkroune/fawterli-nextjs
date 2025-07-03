import type { PropsWithChildren } from 'react';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import AppSidebar from './app-sidebar';

export default function UserLayout({ children }: PropsWithChildren) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	);
}
