'use client';

import { ColumnDef } from '@tanstack/react-table';

export type FormSummary = {
	id: string;
	date: string;
	reference: string;
	street: string;
	status: 'Submitted' | 'Completed' | 'In Progress';
};

export const columns: ColumnDef<FormSummary>[] = [
	{
		header: 'Date',
		accessorKey: 'date',
	},
	{
		header: 'Reference',
		accessorKey: 'reference',
	},
	{
		header: 'Street',
		accessorKey: 'street',
	},
	{
		header: 'Status',
		accessorKey: 'status',
	},
];
