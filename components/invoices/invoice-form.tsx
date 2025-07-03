'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { LineItemsTable } from '@/components/invoices/line-items-table';
import { CalendarIcon, Eye, Save } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Invoice } from '@/types/invoice';
import { SidebarTrigger } from '../ui/sidebar';

interface InvoiceFormProps {
	invoice?: Invoice | null;
}

export function InvoiceForm({ invoice }: InvoiceFormProps) {
	const [formData, setFormData] = useState<Partial<Invoice>>({
		invoiceNumber: '',
		clientName: '',
		clientEmail: '',
		clientAddress: '',
		date: new Date().toISOString().split('T')[0],
		dueDate: '',
		status: 'pending',
		notes: '',
		items: [],
		subtotal: 0,
		tax: 0,
		discount: 0,
		total: 0,
		taxRate: 10,
		discountAmount: 0,
		customFields: {},
	});

	const [dateOpen, setDateOpen] = useState(false);
	const [dueDateOpen, setDueDateOpen] = useState(false);

	useEffect(() => {
		if (invoice) {
			setFormData(invoice);
		} else {
			const invoiceNumber = `INV-${String(Date.now()).slice(-6)}`;
			setFormData((prev) => ({ ...prev, invoiceNumber }));
		}
	}, [invoice]);

	return (
		<>
			<div className="flex items-center justify-between mb-6 sticky top-0 bg-background px-4 h-16 border-b z-10">
				<div className="flex items-center space-x-4">
					<div className="flex gap-2 items-center">
						<SidebarTrigger className="-ml-1" />
						<h1 className="text-lg font-semibold">
							{invoice ? 'Edit Invoice' : 'Create Invoice'}
						</h1>
					</div>
				</div>
				<div className="flex space-x-2">
					<Button variant="outline">
						<Eye className="mr-2 h-4 w-4" />
						Preview
					</Button>
					<Button>
						<Save className="mr-2 h-4 w-4" />
						Save Invoice
					</Button>
				</div>
			</div>
			<div className="container mx-auto p-6">
				<form className="space-y-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Invoice Details */}
						<Card>
							<CardHeader>
								<CardTitle>Invoice Details</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="invoiceNumber">Invoice Number</Label>
									<Input id="invoiceNumber" required />
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label>Invoice Date</Label>
										<Popover open={dateOpen} onOpenChange={setDateOpen}>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={cn(
														'w-full justify-start text-left font-normal',
														!formData.date && 'text-muted-foreground',
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{formData.date
														? format(new Date(formData.date), 'PPP')
														: 'Pick a date'}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar
													mode="single"
													selected={
														formData.date ? new Date(formData.date) : undefined
													}
													onSelect={(date) => {
														setFormData((prev) => ({
															...prev,
															date: date?.toISOString().split('T')[0],
														}));
														setDateOpen(false);
													}}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>

									<div className="space-y-2">
										<Label>Due Date</Label>
										<Popover open={dueDateOpen} onOpenChange={setDueDateOpen}>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={cn(
														'w-full justify-start text-left font-normal',
														!formData.dueDate && 'text-muted-foreground',
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{formData.dueDate
														? format(new Date(formData.dueDate), 'PPP')
														: 'Pick a date'}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar
													mode="single"
													selected={
														formData.dueDate
															? new Date(formData.dueDate)
															: undefined
													}
													onSelect={(date) => {
														setFormData((prev) => ({
															...prev,
															dueDate: date?.toISOString().split('T')[0],
														}));
														setDueDateOpen(false);
													}}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="status">Status</Label>
									<Select>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="draft">Draft</SelectItem>
											<SelectItem value="pending">Pending</SelectItem>
											<SelectItem value="paid">Paid</SelectItem>
											<SelectItem value="overdue">Overdue</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						{/* Client Details */}
						<Card>
							<CardHeader>
								<CardTitle>Client Details</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="clientName">Client Name</Label>
									<Input id="clientName" required />
								</div>

								<div className="space-y-2">
									<Label htmlFor="clientEmail">Client Email</Label>
									<Input id="clientEmail" type="email" required />
								</div>

								<div className="space-y-2">
									<Label htmlFor="clientAddress">Client Address</Label>
									<Textarea id="clientAddress" rows={3} />
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Line Items */}
					<Card>
						<CardHeader>
							<CardTitle>Line Items</CardTitle>
						</CardHeader>
						<CardContent>
							<LineItemsTable items={formData.items || []} />
						</CardContent>
					</Card>

					{/* Totals */}
					<Card>
						<CardHeader>
							<CardTitle>Invoice Totals</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
								<div className="space-y-2">
									<Label htmlFor="taxRate">Tax Rate (%)</Label>
									<Input
										id="taxRate"
										type="number"
										min="0"
										max="100"
										step="0.1"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="discount">Discount Amount ($)</Label>
									<Input id="discount" type="number" min="0" step="0.01" />
								</div>
							</div>

							<div className="space-y-2 text-right">
								<div className="flex justify-between">
									<span>Subtotal:</span>
									<span>${(formData.subtotal || 0).toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
									<span>Tax ({formData.taxRate || 0}%):</span>
									<span>${(formData.tax || 0).toFixed(2)}</span>
								</div>
								{(formData.discountAmount || 0) > 0 && (
									<div className="flex justify-between text-green-600">
										<span>Discount:</span>
										<span>-${(formData.discountAmount || 0).toFixed(2)}</span>
									</div>
								)}
								<div className="flex justify-between text-lg font-bold border-t pt-2">
									<span>Total:</span>
									<span>${(formData.total || 0).toFixed(2)}</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Notes */}
					<Card>
						<CardHeader>
							<CardTitle>Additional Notes</CardTitle>
						</CardHeader>
						<CardContent>
							<Textarea
								placeholder="Add any additional notes or terms..."
								rows={4}
							/>
						</CardContent>
					</Card>
				</form>
			</div>
		</>
	);
}
