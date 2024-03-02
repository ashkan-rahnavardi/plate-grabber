'use client';

import HomePage from '@/containers/home';
import { FormsContext } from '@/services/FormsProvider';
import { UserSession } from '@/types/userSession';
import { useSession } from 'next-auth/react';
import React, { useContext } from 'react';

export default function Page() {
	const session = useSession();
	const forms = useContext(FormsContext);

	// console.log('forms from context', forms);

	if (session.data && session.data.user) {
		const user = session.data.user as UserSession;
		return <HomePage user={user} data={forms} />;
	} else {
		return <div>loading...</div>;
	}
}
