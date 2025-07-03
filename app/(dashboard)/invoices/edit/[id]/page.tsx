import { InvoiceForm } from '@/components/invoices/invoice-form';
import UserLayout from '@/components/layouts/user-layout';

type Params = { id: string };

type Props = {
	params: Params;
};

export default function EditInvoicePage({ params }: Props) {
	params; // TODO: use params.id

	return (
		<UserLayout>
			<InvoiceForm />
		</UserLayout>
	);
}
