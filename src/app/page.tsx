'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

import TopNav from '@/components/TopNav';
import Dashboard from '@/containers/dashboard';

const Home: React.FC = () => {
	// const session = useSession();

	return (
		<>
			{/* <div>{session?.data?.user?.name}</div> */}
			{/* <button onClick={() => signOut()}>Logout</button> */}
			{/* <Dashboard /> */}
			<TopNav />
		</>
	);
};

export default Home;
