'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LicenseForm, Street } from '@/types/licenseForm';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const columns: ColumnDef<LicenseForm>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'installDate',
		// header: () => <div className="text-left">Date</div>,
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Date
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},

		cell: ({ row }) => {
			const date = row.getValue('installDate') as string;
			const [year, month, day] = date.split('-').map(Number);
			const formattedDate: Date = new Date(year, month - 1, day);
			const options: Intl.DateTimeFormatOptions = {
				// year: 'numeric',
				month: 'short',
				day: 'numeric',
			};
			const formattedDateString: string = new Intl.DateTimeFormat(
				'en-US',
				options
			).format(formattedDate);

			return <div className="text-left font-medium">{formattedDateString}</div>;
		},
	},
	{
		accessorKey: 'reference',
		header: () => <div className="text-left">Reference</div>,
		cell: ({ row }) => {
			const reference = row.getValue('reference') as string;
			return <div className="text-left font-medium">{reference}</div>;
		},
	},
	{
		accessorKey: 'location',
		header: () => <div className="text-right">Street</div>,
		cell: ({ row }) => {
			const location = row.getValue('location') as Street[];

			// extract street names from location array
			const streets = location.map((street) => street.name).join(', ');
			return <div className="text-right font-medium">{streets}</div>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const form = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<DotsHorizontalIcon className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(form.reference)}
						>
							Copy form Reference
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href={`form/${form.reference}`}>View Form</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>Edit Form</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
