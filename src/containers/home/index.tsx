import NewFormButton from '@/components/Buttons/newForm';
import { columns } from '@/components/DataTable/columns';
import { DataTable } from '@/components/DataTable/data-table';
import TopNav from '@/components/TopNav';
import { LicenseForm } from '@/types/licenseForm';
import { UserSession } from '@/types/userSession';
import React from 'react';

// Look into refactoring sending down the user session as props down the tree vs getting it at the component level

export default function Page({
	user,
	data,
}: {
	user: UserSession;
	data: LicenseForm[];
}) {
	console.log(data);
	return (
		<>
			<TopNav user={user} />

			<div className=" py-10">
				<DataTable columns={columns} data={data} />
			</div>
			<div className="fixed bottom-0 left-0 p-4">
				<NewFormButton />
				<span className="ml-4">New Form</span>
			</div>
		</>
	);
}
