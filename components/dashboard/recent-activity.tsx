import { invoices } from './invoice-table';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '../ui/card';

export default function RecentActivity() {
	return (
		<Card className="col-span-3">
			<CardHeader>
				<CardTitle>Recent Activity</CardTitle>
				<CardDescription>Latest invoice updates</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{invoices.slice(0, 5).map((invoice) => (
						<div key={invoice.id} className="flex items-center">
							<div className="ml-4 space-y-1">
								<p className="text-sm font-medium leading-none">{invoice.id}</p>
								<p className="text-sm text-muted-foreground">
									{invoice.customer}
								</p>
							</div>
							<div className="ml-auto font-medium">
								${invoice.amount.toLocaleString()}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
