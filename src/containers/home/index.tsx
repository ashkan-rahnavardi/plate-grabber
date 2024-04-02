import NewFormButton from '@/components/Buttons/newForm';
import { columns } from '@/components/DataTable/columns';
import { DataTable } from '@/components/DataTable/data-table';
import TopNav from '@/components/TopNav/homeNav';
import { FormsContext } from '@/services/FormsProvider';
import React, { useContext } from 'react';

export default function Page() {
	const { forms, updateForms } = useContext(FormsContext);

	return (
		<>
			<TopNav />

			<div className=" py-10">
				<DataTable columns={columns} data={forms} />
			</div>
			<div className="fixed bottom-0 left-0 p-4">
				<NewFormButton />
				<span className="ml-4">New Form</span>
			</div>
		</>
	);
}
