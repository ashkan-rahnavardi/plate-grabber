import NewFormButton from '@/components/Buttons/newForm';
import { columns } from '@/components/DataTable/columns';
import { DataTable } from '@/components/DataTable/data-table';
import TopNav from '@/components/TopNav';
import { FormsContext } from '@/services/FormsProvider';
import React, { useContext } from 'react';

// Look into refactoring sending down the user session as props down the tree vs getting it at the component level

export default function Page() {
	const forms = useContext(FormsContext);

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
