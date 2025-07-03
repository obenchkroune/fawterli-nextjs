import { InvoiceForm } from '@/components/invoices/invoice-form';

type Params = { id: string };

type Props = {
	params: Params;
};

export default function EditInvoicePage({ params }: Props) {
	params; // TODO: use params.id

	return <InvoiceForm />;
}
