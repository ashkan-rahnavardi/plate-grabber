'use client';

import { ColumnDef } from '@tanstack/react-table';

export type FormSummary = {
	_id: string;
	date: string;
	reference: string;
	street: string;
	// status: 'Submitted' | 'Completed' | 'In Progress';
};

export const columns: ColumnDef<FormSummary>[] = [
	{
		accessorKey: 'date',
		header: () => <div className="text-right">Date</div>,
		cell: ({ row }) => {
			const date = row.getValue('date') as string;
			const [year, month, day] = date.split('-').map(Number);
			const formattedDate: Date = new Date(year, month - 1, day);
			const options: Intl.DateTimeFormatOptions = {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			};
			const formattedDateString: string = new Intl.DateTimeFormat(
				'en-US',
				options
			).format(formattedDate);

			return (
				<div className="text-right font-medium">{formattedDateString}</div>
			);
		},
	},
	{
		header: 'Reference',
		accessorKey: 'reference',
	},
	{
		header: 'Street',
		accessorKey: 'street',
	},
	// {
	// 	header: 'Status',
	// 	accessorKey: 'status',
	// },
];
