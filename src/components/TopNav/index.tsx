import { UserSession } from '@/types/userSession';
import React from 'react';
import Search from './search';
import UserNav from './userNav';

export default function index({ user }: { user: UserSession }) {
	return (
		<div className="flex w-full justify-between">
			<UserNav user={user} />
			<Search />
		</div>
	);
}
