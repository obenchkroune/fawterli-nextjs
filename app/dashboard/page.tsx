'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import InvoiceTable from '@/components/dashboard/invoice-table';
import DashboardMetrics from '@/components/dashboard/dashboard-metrics';
import RevenueChart from '@/components/dashboard/revenue-chart';
import RecentActivity from '@/components/dashboard/recent-activity';
import UserLayout from '@/components/layouts/user-layout';

export default function Dashboard() {
	return (
		<UserLayout>
			<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger className="-ml-1" />
				<div className="flex items-center gap-2">
					<h1 className="text-lg font-semibold">Dashboard</h1>
				</div>
			</header>
			<div className="flex-1 space-y-4 p-4 md:p-8">
				<DashboardMetrics />

				<div className="block md:grid md:gap-4 md:grid-cols-2 lg:grid-cols-7">
					<RevenueChart />
					<RecentActivity />
				</div>

				<InvoiceTable />
			</div>
		</UserLayout>
	);
}
