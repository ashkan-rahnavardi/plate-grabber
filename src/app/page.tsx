import { GetForms } from '@/actions/actions';
import NewFormButton from '@/components/Buttons/newForm';
import TopNav from '@/components/TopNav';
import Dashboard from '@/containers/dashboard';
import { auth } from '@/services/auth';
import { UserSession } from '@/types/userSession';
import React from 'react';
import { FormSummary, columns } from '../components/DataTable/columns';
import { DataTable } from '../components/DataTable/data-table';

// Look into refactoring sending down the user session as props down the tree vs getting it at the component level

async function getData(): Promise<FormSummary[]> {
	const forms = await GetForms();

	let data = forms.map((form) => {
		return {
			_id: form._id,
			date: form.InstallDate,
			reference: form.Reference,
			street: form.Street,
		};
	});

	return data;
}

export default async function Page() {
	const session = await auth();
	const data = await getData();

	console.log(data);
	console.log(session);

	if (session && session.user) {
		const user = session.user as UserSession;
		return (
			<>
				<TopNav user={user} />

				<div className="container mx-auto py-10">
					<DataTable columns={columns} data={data} />
				</div>
				<div className="fixed bottom-0 left-0 p-4">
					<NewFormButton />
				</div>
			</>
		);
	}
}

// export default function Page() {
// 	return (
// 		<>
// 			{/* <TopNav /> */}
// 			<Dashboard />
// 		</>
// 	);
// }
