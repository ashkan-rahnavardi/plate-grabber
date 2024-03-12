'use client';
import { VirtualizedAutoComplete } from '@/components/Input/AutoComplete';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AllStreets } from '@/lib/streetNames';
import { parseRangeByHundreds } from '@/lib/utils';
import { Blocks, LicenseForm, Street } from '@/types/licenseForm';
import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

/* 
TO DO: 

UPDATE FORM CONTEXT PROPERLY WHEN ADDING A NEW STREET

Dynamically create a data table for each street which gets added
     - Each table will have a header with the street name
     - Each table will have a row for each block
     - Each row will have a column which side of the street it is on
     - Each row will have a column for the plates on that block
*/

// VirtualizedAutoComplete doesn't work properly if the options are not all lowercase
// Not sure why, but I wasted a lot of time trying to figure out what was going on
function lowerCaseAllStreets(): string[] {
	const lowerCaseStreets = AllStreets.map((street) => street.toLowerCase());
	return lowerCaseStreets;
}
const loweredAllStreeets = lowerCaseAllStreets();

export default function StreetInput({
	form,
	setForm,
}: {
	form: LicenseForm;
	setForm: React.Dispatch<React.SetStateAction<LicenseForm>>;
}) {
	const [location, setLocation] = useState<Street[]>(form.location);

	const [newStreet, setNewStreet] = useState<string>('');
	const [newBlocks, setNewBlocks] = useState<string>('');

	const createNewBlocks = (): Blocks[] => {
		const blocks = parseRangeByHundreds(newBlocks).map((block) => {
			return {
				number: block,
				side: 'Both',
				plates: [],
			};
		});
		return blocks;
	};

	const createNewStreet = (): Street => {
		return {
			name: newStreet,
			blocks: createNewBlocks(),
		};
	};

	const handleAddLocation = () => {
		const newLocation = createNewStreet();
		setNewStreet('');
		setNewBlocks('');
		setLocation([...location, newLocation]);
		setForm({ ...form, location: [...location, newLocation] });
		console.log('form', form);
	};

	return (
		<>
			<div className="flex justify-between space-x-2">
				<div className="flex flex-col space-y-2">
					<div className="flex flex-col">
						<label htmlFor="street">Street</label>
						<VirtualizedAutoComplete
							options={loweredAllStreeets}
							selectedOption={newStreet}
							setSelectedOption={setNewStreet}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="blocks">Blocks</label>
						<Input
							multiple
							type="text"
							id="blocks"
							name="blocks"
							value={newBlocks}
							placeholder="e.g. 100-500 "
							onChange={(e) => setNewBlocks(e.target.value)}
						/>
					</div>
				</div>
				<div className="self-center ">
					<Button onClick={() => handleAddLocation()}>
						<PlusIcon className="mr-2 h-4 w-4" /> Add
					</Button>
				</div>
			</div>
		</>
	);
}
