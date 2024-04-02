import DarkToggle from '@/components/Buttons/darkToggle';
import React from 'react';
import UserNav from './userNav';

export default function index() {
	return (
		<div className="flex w-full justify-between">
			<UserNav />
			<DarkToggle />
		</div>
	);
}
