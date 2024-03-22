import { columns } from '@/components/PlatesTable/columns';
import { DataTable } from '@/components/PlatesTable/data-table';
import { LicenseForm } from '@/types/licenseForm';

export default function PlatesTable({ form }: { form: LicenseForm }) {
	return form.location.map((street) => {
		return (
			<div key={street.name}>
				<h1>{street.name}</h1>
				<DataTable columns={columns} data={street.blocks} />
			</div>
		);
	});
}
