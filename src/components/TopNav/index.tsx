import React from 'react';
import Search from './search';
import UserNav from './userNav';

export default function index() {
	return (
		<div className="flex w-full justify-between">
			<UserNav />
			<Search />
		</div>
	);
}
