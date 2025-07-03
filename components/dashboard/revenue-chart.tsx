import { AreaChart } from 'recharts';
import { Area } from 'recharts';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '../ui/card';
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '../ui/chart';

const chartData = [
	{ month: 'Jan', revenue: 8500, invoices: 12 },
	{ month: 'Feb', revenue: 12400, invoices: 18 },
	{ month: 'Mar', revenue: 15200, invoices: 22 },
	{ month: 'Apr', revenue: 11800, invoices: 16 },
	{ month: 'May', revenue: 18600, invoices: 28 },
	{ month: 'Jun', revenue: 16200, invoices: 24 },
];

const chartConfig = {
	revenue: {
		label: 'Revenue',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export default function RevenueChart() {
	return (
		<Card className="col-span-4">
			<CardHeader>
				<CardTitle>Revenue Overview</CardTitle>
				<CardDescription>
					Monthly revenue trends for the past 6 months
				</CardDescription>
			</CardHeader>
			<CardContent className="pl-2">
				<ChartContainer config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<defs>
							<linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-revenue)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-revenue)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<Area
							dataKey="revenue"
							type="natural"
							fill="url(#fillRevenue)"
							fillOpacity={0.4}
							stroke="var(--chart-1)"
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
