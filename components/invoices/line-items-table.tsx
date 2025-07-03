'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';
import type { LineItem } from '@/types/invoice';

interface LineItemsTableProps {
	items: LineItem[];
}

export function LineItemsTable({ items }: LineItemsTableProps) {
	return (
		<div className="space-y-4">
			<div className="rounded-md border overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[40%]">Description</TableHead>
							<TableHead className="w-[15%]">Quantity</TableHead>
							<TableHead className="w-[20%]">Rate ($)</TableHead>
							<TableHead className="w-[20%]">Amount ($)</TableHead>
							<TableHead className="w-[5%]">
								<span className="sr-only">Actions</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{items.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className="text-center py-8 text-muted-foreground"
								>
									No line items added yet. Click "Add Item" to get started.
								</TableCell>
							</TableRow>
						) : (
							items.map((item) => (
								<TableRow key={item.id}>
									<TableCell>
										<Input
											value={item.description}
											placeholder="Item description"
											className="border-0 p-0 h-auto focus-visible:ring-0"
										/>
									</TableCell>
									<TableCell>
										<Input
											type="number"
											min="0"
											step="0.01"
											value={item.quantity}
											className="border-0 p-0 h-auto focus-visible:ring-0"
										/>
									</TableCell>
									<TableCell>
										<Input
											type="number"
											min="0"
											step="0.01"
											value={item.rate}
											className="border-0 p-0 h-auto focus-visible:ring-0"
										/>
									</TableCell>
									<TableCell className="font-medium">
										${item.amount.toFixed(2)}
									</TableCell>
									<TableCell>
										<Button
											variant="ghost"
											size="sm"
											className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
										>
											<Trash2 className="h-4 w-4" />
											<span className="sr-only">Remove item</span>
										</Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			<Button type="button" variant="outline" className="w-full bg-transparent">
				<Plus className="mr-2 h-4 w-4" />
				Add Item
			</Button>
		</div>
	);
}
