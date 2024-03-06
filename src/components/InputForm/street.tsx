'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { VirtualizedAutoComplete } from '@/components/Input/AutoComplete';
import { AllStreets } from '@/lib/streetNames';
import { LicenseForm } from '@/types/licenseForm';
import { useState } from 'react';

// TO DO:
// FIX STYLING FOR AUTOCOMPLETE AND BLOCK, MAYBE PUT BLOCK BELOW STREET AND HAVE THE BUTTON
// IN THE MIDDLE (HEIGHTWISE) OF THE TWO INPUTS

// The value which is entered in the Blocks input field will have to be split into an array of numbers or strings
//    - e.g, 100-500 will become [100, 200, 300, 400, 500]

// Dynamically create a data table for each street which gets added
//     - Each table will have a header with the street name
//     - Each table will have a row for each block
//     - Each row will have a column which side of the street it is on
//     - Each row will have a column for the plates on that block

export default function StreetInput({
	form,
	setForm,
}: {
	form: LicenseForm;
	setForm: React.Dispatch<React.SetStateAction<LicenseForm>>;
}) {
	const [streets, setStreets] = useState<string[]>(
		form.location.map((loc) => loc.name)
	);
	const [newStreet, setNewStreet] = useState('');

	const handleAddStreet = () => {
		setStreets([...streets, newStreet]);
	};

	return (
		<div className="w-full ">
			<div className="flex pb-8">
				<div className="w-full flex justify-between space-x-4">
					<div>
						<label htmlFor="street">Street</label>
						<VirtualizedAutoComplete options={AllStreets} />
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
