import { columns } from '@/components/PlatesTable/columns';
import { DataTable } from '@/components/PlatesTable/data-table';
import { LicenseForm } from '@/types/licenseForm';

export default function PlatesTable({ form }: { form: LicenseForm }) {
	const location = form.location;
	// if (form.location[0].name !== '') {
	return form.location.map((street) => {
		if (street.name === '') {
			return;
		}
		return (
			<div key={street.name}>
				<h1>{street.name}</h1>
				<DataTable columns={columns} data={street.blocks} />
			</div>
		);
	});
	// }
}
