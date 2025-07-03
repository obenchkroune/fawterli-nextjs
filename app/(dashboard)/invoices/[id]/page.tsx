import { InvoicePreview } from '@/components/invoices/invoice-preview';
import UserLayout from '@/components/layouts/user-layout';
import type { Invoice } from '@/types/invoice';
import { notFound } from 'next/navigation';

type Params = {
	id: string;
};

type Props = {
	params: Params;
};

export const mockInvoices: Invoice[] = [
	{
		id: '1',
		invoiceNumber: 'INV-001',
		clientName: 'Acme Corporation',
		clientEmail: 'billing@acme.com',
		date: '2024-01-15',
		dueDate: '2024-02-15',
		status: 'paid',
		subtotal: 2500,
		tax: 250,
		discount: 0,
		total: 2750,
		items: [
			{
				id: '1',
				description: 'Web Development',
				quantity: 1,
				rate: 2500,
				amount: 2500,
			},
		],
	},
	{
		id: '2',
		invoiceNumber: 'INV-002',
		clientName: 'Tech Solutions Inc',
		clientEmail: 'accounts@techsolutions.com',
		date: '2024-01-20',
		dueDate: '2024-02-20',
		status: 'pending',
		subtotal: 1800,
		tax: 180,
		discount: 100,
		total: 1880,
		items: [
			{
				id: '1',
				description: 'UI/UX Design',
				quantity: 2,
				rate: 800,
				amount: 1600,
			},
			{
				id: '2',
				description: 'Consultation',
				quantity: 1,
				rate: 200,
				amount: 200,
			},
		],
	},
];

export default function ViewInvoicePage({ params }: Props) {
	const invoice = mockInvoices.find((i) => i.id === params.id);
	if (!invoice) {
		return notFound();
	}

	return (
		<UserLayout>
			<InvoicePreview invoice={invoice} />
		</UserLayout>
	);
}
