import { authOptions } from '@/app/_lib/authOptions';
import { Avatar, Input } from '@nextui-org/react';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function Form() {
	const session = await getServerSession(authOptions);

	console.log(session);

	return (
		<div className="flex flex-col gap-4">
			<Avatar
				size="lg"
				isBordered
				radius="full"
				src="https://i.pravatar.cc/150?u=a04258114e29026708c"
			/>
			<div className="flex flex-col gap-2">
				<div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
					<Input type="email" label="Email" labelPlacement="outside-left" />
				</div>
			</div>
		</div>
	);
}
