'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

// TO DO:
// Create a data type which will be used to store the streets, blocks and plates

// The value which is entered in the Blocks input field will have to be split into an array of numbers or strings
//    - e.g, 100-500 will become [100, 200, 300, 400, 500]

// Dynamically create a data table for each street which gets added
//     - Each table will have a header with the street name
//     - Each table will have a row for each block
//     - Each row will have a column which side of the street it is on
//     - Each row will have a column for the plates on that block

export default function StreetInput() {
	const [streets, setStreets] = useState<string[]>([
		'Geogia st.',
		'Burrard st.',
		'Granville st.',
	]);

	const [newStreet, setNewStreet] = useState('');

	const handleAddStreet = () => {
		setStreets([...streets, newStreet]);
	};

	return (
		<div className="w-full ">
			<div className="flex pb-8">
				<div className="w-full flex justify-around space-x-4">
					<div>
						<label htmlFor="street">Street</label>
						<Input
							multiple
							type="text"
							id="street"
							name="street"
							value={newStreet}
							placeholder="e.g. Georgia St. "
							onChange={(e) => setNewStreet(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="blocks">Blocks</label>
						<Input
							multiple
							type="text"
							id="blocks"
							name="blocks"
							value={newStreet}
							placeholder="e.g. 100-500 "
							onChange={(e) => setNewStreet(e.target.value)}
						/>
					</div>
					<div className="self-end">
						<Button className="bottom-0" onClick={() => handleAddStreet()}>
							Add
						</Button>
					</div>
				</div>
			</div>
			{streets.map((street) => ' ' + street)}
		</div>
	);
}
