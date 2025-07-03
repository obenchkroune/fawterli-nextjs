'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Edit, Download, Send } from 'lucide-react';
import type { Invoice } from '@/types/invoice';

interface InvoicePreviewProps {
	invoice: Invoice;
}

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
	const handleDownload = () => {
		// In a real app, this would generate and download a PDF
		console.log('Download invoice:', invoice.invoiceNumber);
	};

	const handleSend = () => {
		// In a real app, this would send the invoice via email
		console.log('Send invoice:', invoice.invoiceNumber);
	};

	return (
		<>
			<div className="flex items-center justify-between mb-6 sticky top-0 p-6 border-b bg-background z-10">
				<div className="flex items-center space-x-4">
					<div>
						<h1 className="text-2xl font-bold">Invoice Preview</h1>
					</div>
				</div>
				<div className="flex space-x-2">
					<Button variant="outline">
						<Edit className="mr-2 h-4 w-4" />
						Edit
					</Button>
					<Button variant="outline" onClick={handleDownload}>
						<Download className="mr-2 h-4 w-4" />
						Download
					</Button>
					<Button onClick={handleSend}>
						<Send className="mr-2 h-4 w-4" />
						Send Invoice
					</Button>
				</div>
			</div>

			<Card className="container p-6 mx-auto">
				<CardContent className="p-8">
					{/* Header */}
					<div className="flex justify-between items-start mb-8">
						<div>
							<h1 className="text-3xl font-bold text-primary">INVOICE</h1>
							<p className="text-muted-foreground mt-1">
								#{invoice.invoiceNumber}
							</p>
						</div>
						<div className="text-right">
							<h2 className="text-xl font-semibold">Your Company</h2>
							<p className="text-muted-foreground">123 Business Street</p>
							<p className="text-muted-foreground">City, State 12345</p>
							<p className="text-muted-foreground">contact@company.com</p>
						</div>
					</div>

					{/* Invoice Details */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
						<div>
							<h3 className="font-semibold mb-2">Bill To:</h3>
							<div className="text-muted-foreground">
								<p className="font-medium text-foreground">
									{invoice.clientName}
								</p>
								<p>{invoice.clientEmail}</p>
								{invoice.clientAddress && (
									<p className="whitespace-pre-line">{invoice.clientAddress}</p>
								)}
							</div>
						</div>
						<div>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="font-medium">Invoice Date:</span>
									<span>{new Date(invoice.date).toLocaleDateString()}</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium">Due Date:</span>
									<span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium">Status:</span>
									<span className="capitalize">{invoice.status}</span>
								</div>
							</div>
						</div>
					</div>

					{/* Line Items */}
					<div className="mb-8">
						<div className="border rounded-lg overflow-hidden">
							<div className="bg-muted p-4 grid grid-cols-12 gap-4 font-medium">
								<div className="col-span-6">Description</div>
								<div className="col-span-2 text-center">Quantity</div>
								<div className="col-span-2 text-right">Rate</div>
								<div className="col-span-2 text-right">Amount</div>
							</div>
							{invoice.items.map((item, index) => (
								<div
									key={item.id}
									className={`p-4 grid grid-cols-12 gap-4 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}
								>
									<div className="col-span-6">{item.description}</div>
									<div className="col-span-2 text-center">{item.quantity}</div>
									<div className="col-span-2 text-right">
										${item.rate.toFixed(2)}
									</div>
									<div className="col-span-2 text-right font-medium">
										${item.amount.toFixed(2)}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Totals */}
					<div className="flex justify-end mb-8">
						<div className="w-full max-w-sm space-y-2">
							<div className="flex justify-between">
								<span>Subtotal:</span>
								<span>${invoice.subtotal.toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span>Tax ({invoice.taxRate || 0}%):</span>
								<span>${invoice.tax.toFixed(2)}</span>
							</div>
							{invoice.discountAmount && invoice.discountAmount > 0 && (
								<div className="flex justify-between text-green-600">
									<span>Discount:</span>
									<span>-${invoice.discountAmount.toFixed(2)}</span>
								</div>
							)}
							<Separator />
							<div className="flex justify-between text-lg font-bold">
								<span>Total:</span>
								<span>${invoice.total.toFixed(2)}</span>
							</div>
						</div>
					</div>

					{/* Notes */}
					{invoice.notes && (
						<div>
							<h3 className="font-semibold mb-2">Notes:</h3>
							<p className="text-muted-foreground whitespace-pre-line">
								{invoice.notes}
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</>
	);
}
