'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

import Dashboard from '@/containers/dashboard';

const Home: React.FC = () => {
	// const session = useSession();

	return (
		<>
			{/* <div>{session?.data?.user?.name}</div> */}
			{/* <button onClick={() => signOut()}>Logout</button> */}
			<Dashboard />
		</>
	);
};

export default Home;
