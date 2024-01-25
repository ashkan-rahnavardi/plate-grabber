'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

import UserNav from '@/components/example/UserNav';
import Dashboard from '@/containers/dashboard';

import NavBar from '@/components/example/NavBar';

const Home: React.FC = () => {
	// const session = useSession();

	return (
		<>
			{/* <div>{session?.data?.user?.name}</div> */}
			{/* <button onClick={() => signOut()}>Logout</button> */}
			{/* <Dashboard /> */}
			<UserNav />
			<NavBar />
		</>
	);
};

export default Home;
