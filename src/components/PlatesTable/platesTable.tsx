import { columns } from '@/components/PlatesTable/columns';
import { DataTable } from '@/components/PlatesTable/data-table';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
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
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger>
							<h1>{street.name}</h1>
						</AccordionTrigger>
						<AccordionContent>
							<DataTable columns={columns} data={street.blocks} />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		);
	});
}

// <div key={street.name}>
// 	<h1>{street.name}</h1>
// 	<DataTable columns={columns} data={street.blocks} />
// </div>;
