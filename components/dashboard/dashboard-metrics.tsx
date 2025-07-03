import { DollarSign, FileText, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { invoices } from './invoice-table';

export default function DashboardMetrics() {
	const totalRevenue = invoices.reduce(
		(sum, invoice) => sum + invoice.amount,
		0,
	);
	const paidInvoices = invoices.filter((invoice) => invoice.status === 'paid');
	const pendingInvoices = invoices.filter(
		(invoice) => invoice.status === 'pending',
	);
	const overdueInvoices = invoices.filter(
		(invoice) => invoice.status === 'overdue',
	);

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
					<DollarSign className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						${totalRevenue.toLocaleString()}
					</div>
					<p className="text-xs text-muted-foreground">
						+12.5% from last month
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
					<FileText className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{paidInvoices.length}</div>
					<p className="text-xs text-muted-foreground">
						$
						{paidInvoices
							.reduce((sum, inv) => sum + inv.amount, 0)
							.toLocaleString()}{' '}
						total
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Pending Invoices
					</CardTitle>
					<Calendar className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{pendingInvoices.length}</div>
					<p className="text-xs text-muted-foreground">
						$
						{pendingInvoices
							.reduce((sum, inv) => sum + inv.amount, 0)
							.toLocaleString()}{' '}
						awaiting
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Overdue Invoices
					</CardTitle>
					<TrendingUp className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{overdueInvoices.length}</div>
					<p className="text-xs text-muted-foreground">
						$
						{overdueInvoices
							.reduce((sum, inv) => sum + inv.amount, 0)
							.toLocaleString()}{' '}
						overdue
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
