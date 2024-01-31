import TopNav from '@/components/TopNav';
import Dashboard from '@/containers/dashboard';
import { auth } from '@/services/auth';
import { UserSession } from '@/types/userSession';
import React from 'react';

export default async function Page() {
	const session = await auth();

	console.log(session);

	if (session && session.user) {
		const user = session.user as UserSession;
		return (
			<>
				<TopNav user={user} />
				{/* <Dashboard /> */}
			</>
		);
	}
}
