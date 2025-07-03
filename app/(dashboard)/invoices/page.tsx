import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { InvoicesTable } from '@/components/invoices/invoices-table';
import { Plus, FileText, DollarSign, Clock, CheckCircle } from 'lucide-react';
import UserLayout from '@/components/layouts/user-layout';
import Link from 'next/link';
import { mockInvoices as invoices } from './[id]/page';

export default function InovoicesPage() {
	const stats = {
		total: invoices.length,
		paid: invoices.filter((inv) => inv.status === 'paid').length,
		pending: invoices.filter((inv) => inv.status === 'pending').length,
		overdue: invoices.filter((inv) => inv.status === 'overdue').length,
		totalAmount: invoices.reduce((sum, inv) => sum + inv.total, 0),
	};

	return (
		<UserLayout>
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 p-6 bg-background z-10 border-b">
				<div>
					<h1 className="text-2xl font-bold">Invoices</h1>
				</div>
				<Button className="w-full sm:w-auto" asChild>
					<Link href="/invoices/create">
						<Plus className="mr-2 h-4 w-4" />
						Create Invoice
					</Link>
				</Button>
			</div>
			<div className="container mx-auto p-6 space-y-6">
				{/* Stats Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Invoices
							</CardTitle>
							<FileText className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats.total}</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Paid</CardTitle>
							<CheckCircle className="h-4 w-4 text-green-600" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-green-600">
								{stats.paid}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Pending</CardTitle>
							<Clock className="h-4 w-4 text-yellow-600" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-yellow-600">
								{stats.pending}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Overdue</CardTitle>
							<Clock className="h-4 w-4 text-red-600" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-red-600">
								{stats.overdue}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Amount
							</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								${stats.totalAmount.toLocaleString()}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Invoices Table */}
				<Card>
					<CardHeader>
						<CardTitle>Recent Invoices</CardTitle>
						<CardDescription>
							A list of your recent invoices and their status
						</CardDescription>
					</CardHeader>
					<CardContent>
						<InvoicesTable invoices={invoices} />
					</CardContent>
				</Card>
			</div>
		</UserLayout>
	);
}
