'use client';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table';

export const invoices = [
	{
		id: 'INV-001',
		date: '2024-01-15',
		customer: 'Acme Corp',
		amount: 2500.0,
		status: 'paid',
	},
	{
		id: 'INV-002',
		date: '2024-01-18',
		customer: 'TechStart Inc',
		amount: 1800.0,
		status: 'pending',
	},
	{
		id: 'INV-003',
		date: '2024-01-22',
		customer: 'Global Solutions',
		amount: 3200.0,
		status: 'paid',
	},
	{
		id: 'INV-004',
		date: '2024-01-25',
		customer: 'Innovation Labs',
		amount: 1500.0,
		status: 'overdue',
	},
	{
		id: 'INV-005',
		date: '2024-01-28',
		customer: 'Future Systems',
		amount: 2800.0,
		status: 'paid',
	},
	{
		id: 'INV-006',
		date: '2024-02-02',
		customer: 'Digital Dynamics',
		amount: 2100.0,
		status: 'pending',
	},
	{
		id: 'INV-007',
		date: '2024-02-05',
		customer: 'Smart Solutions',
		amount: 1900.0,
		status: 'paid',
	},
	{
		id: 'INV-008',
		date: '2024-02-08',
		customer: 'Tech Innovators',
		amount: 3500.0,
		status: 'overdue',
	},
];

function getStatusBadge(status: string) {
	switch (status) {
		case 'paid':
			return (
				<Badge className="bg-green-100 text-green-800 hover:bg-green-100">
					Paid
				</Badge>
			);
		case 'pending':
			return (
				<Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
					Pending
				</Badge>
			);
		case 'overdue':
			return (
				<Badge className="bg-red-100 text-red-800 hover:bg-red-100">
					Overdue
				</Badge>
			);
		default:
			return <Badge variant="secondary">{status}</Badge>;
	}
}

export default function InvoiceTable() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Invoices</CardTitle>
				<CardDescription>
					A list of your recent invoices and their current status.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Invoice</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Customer</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{invoices.map((invoice) => (
							<TableRow key={invoice.id}>
								<TableCell className="font-medium">{invoice.id}</TableCell>
								<TableCell>
									{new Date(invoice.date).toLocaleDateString()}
								</TableCell>
								<TableCell>{invoice.customer}</TableCell>
								<TableCell>${invoice.amount.toLocaleString()}</TableCell>
								<TableCell>{getStatusBadge(invoice.status)}</TableCell>
								<TableCell className="text-right">
									<Button variant="ghost" size="sm">
										View
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
