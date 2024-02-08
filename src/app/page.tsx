import { GetForms } from '@/actions/actions';
import HomePage from '@/containers/home';
import { authOptions } from '@/lib/authOptions';
import { UserSession } from '@/types/userSession';
import { getServerSession } from 'next-auth/next';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { FormSummary } from '../components/DataTable/columns';

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
	const session = await getServerSession(authOptions);
	// const session = useSession();
	const data = await getData();

	if (session && session.user) {
		const user = session.user as UserSession;
		return <HomePage user={user} data={data} />;
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
