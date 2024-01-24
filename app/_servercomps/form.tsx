import { Input } from '@nextui-org/react';
import React from 'react';

export default function Form() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<h3 className="text-default-500 text-small">Without placeholder</h3>
				<div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
					<Input type="email" label="Email" labelPlacement="outside-left" />
				</div>
			</div>
		</div>
	);
}
