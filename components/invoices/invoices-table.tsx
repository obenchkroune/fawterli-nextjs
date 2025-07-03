'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Eye, Edit, Trash2, Search } from 'lucide-react';
import type { Invoice } from '@/types/invoice';

interface InvoicesTableProps {
	invoices: Invoice[];
}

export function InvoicesTable({ invoices }: InvoicesTableProps) {
	const [searchTerm, setSearchTerm] = useState('');

	const filteredInvoices = invoices.filter(
		(invoice) =>
			invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
			invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'paid':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
			case 'overdue':
				return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center space-x-2">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search invoices..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-8"
					/>
				</div>
			</div>

			<div className="rounded-md border overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Invoice #</TableHead>
							<TableHead>Client</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Due Date</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Amount</TableHead>
							<TableHead className="w-[50px]">
								<span className="sr-only">Actions</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredInvoices.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={7}
									className="text-center py-8 text-muted-foreground"
								>
									No invoices found
								</TableCell>
							</TableRow>
						) : (
							filteredInvoices.map((invoice) => (
								<TableRow key={invoice.id}>
									<TableCell className="font-medium">
										{invoice.invoiceNumber}
									</TableCell>
									<TableCell>
										<div>
											<div className="font-medium">{invoice.clientName}</div>
											<div className="text-sm text-muted-foreground">
												{invoice.clientEmail}
											</div>
										</div>
									</TableCell>
									<TableCell>
										{new Date(invoice.date).toLocaleDateString()}
									</TableCell>
									<TableCell>
										{new Date(invoice.dueDate).toLocaleDateString()}
									</TableCell>
									<TableCell>
										<Badge
											className={getStatusColor(invoice.status)}
											variant="secondary"
										>
											{invoice.status.charAt(0).toUpperCase() +
												invoice.status.slice(1)}
										</Badge>
									</TableCell>
									<TableCell className="text-right font-medium">
										${invoice.total.toLocaleString()}
									</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" className="h-8 w-8 p-0">
													<span className="sr-only">Open menu</span>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem>
													<Eye className="mr-2 h-4 w-4" />
													Preview
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Edit className="mr-2 h-4 w-4" />
													Edit
												</DropdownMenuItem>
												<DropdownMenuItem className="text-red-600 dark:text-red-400">
													<Trash2 className="mr-2 h-4 w-4" />
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
