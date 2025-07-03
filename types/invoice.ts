export interface LineItem {
	id: string;
	description: string;
	quantity: number;
	rate: number;
	amount: number;
}

export interface Invoice {
	id: string;
	invoiceNumber: string;
	clientName: string;
	clientEmail: string;
	clientAddress?: string;
	date: string;
	dueDate: string;
	status: 'draft' | 'pending' | 'paid' | 'overdue';
	items: LineItem[];
	subtotal: number;
	tax: number;
	discount: number;
	total: number;
	taxRate?: number;
	discountAmount?: number;
	notes?: string;
	customFields?: Record<string, any>;
}
