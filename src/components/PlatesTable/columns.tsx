'use client';

import { Button } from '@/components/ui/button';
import { Blocks, Street } from '@/types/licenseForm';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Blocks>[] = [
	{
		accessorKey: 'number',
		header: 'Block',
		cell: ({ row }) => {
			const block = row.getValue('number') as string;
			return (
				<div className="flex flex-col">
					<span>{block}</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'side',
		header: 'Side',
		cell: ({ row }) => {
			const side = row.getValue('side') as string;
			return (
				<div className="flex flex-col">
					<span>{side}</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'plates',
		header: 'Plates',
		cell: ({ row }) => {
			const plates = row.getValue('plates') as string[];
			return (
				<div className="flex flex-col">
					{plates.map((plate, index) => (
						<div key={index} className="flex items-center">
							<span className="mr-2">{plate}</span>
						</div>
					))}
				</div>
			);
		},
	},
];
