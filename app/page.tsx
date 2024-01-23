'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import Dashboard from './dashboard';

async function postData(url = '', data = {}) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	console.log(response);
	return response.json();
}

async function handleClick() {
	const data = { name: 'test' };
	console.log(data);

	try {
		const result = await postData('/api/checkdb', data);
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

const Home: React.FC = () => {
	const session = useSession();

	if (session) {
		console.log(session);
	}
	return (
		<>
			<button onClick={handleClick}>Test</button>
			<div>{session?.data?.user?.name}</div>
			<button onClick={() => signOut()}>Logout</button>
			<Dashboard />
		</>
	);
};

export default Home;
