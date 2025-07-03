import { InvoiceForm } from '@/components/invoices/invoice-form';
import UserLayout from '@/components/layouts/user-layout';

export default function EditInvoicePage() {
	return (
		<UserLayout>
			<InvoiceForm />
		</UserLayout>
	);
}
