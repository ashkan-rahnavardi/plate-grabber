'use client';
import { VirtualizedAutoComplete } from '@/components/Input/AutoComplete';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AllStreets } from '@/lib/streetNames';
import { merge, parseRangeByHundreds } from '@/lib/utils';
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
		const isRange = newBlocks.includes('-');
		let blockNumbers: string[] = [];

		if (isRange) {
			blockNumbers = parseRangeByHundreds(newBlocks);
		} else {
			let flooredBlock = Math.floor(Number(newBlocks) / 100) * 100;
			blockNumbers = [flooredBlock.toString()];
		}

		const blocks = blockNumbers.map((block) => {
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

	const validInput = () => {
		if (newStreet === '' || newBlocks === '') {
			alert('Please fill out both fields');
			return false;
		}
		return true;
	};

	const mergeBlocks = (
		existingBlocks: Blocks[],
		newBlocks: Blocks[]
	): Blocks[] => {
		// Define a predicate that compares blocks by their 'number' property
		const blockPredicate = (a: Blocks, b: Blocks) => a.number === b.number;

		// Use the merge function with the custom predicate
		return merge<Blocks>(existingBlocks, newBlocks, blockPredicate);
	};

	const handleAddLocation = () => {
		if (validInput()) {
			const newLocation = createNewStreet();
			setNewStreet('');
			setNewBlocks('');

			const streetIndex = location.findIndex(
				(loc) => loc.name === newLocation.name
			);

			if (streetIndex !== -1) {
				// Street exists, merge blocks
				const updatedBlocks = mergeBlocks(
					location[streetIndex].blocks,
					newLocation.blocks
				);
				const updatedLocation = {
					...location[streetIndex],
					blocks: updatedBlocks,
				};
				const newLocations = [...location];
				newLocations[streetIndex] = updatedLocation;
				setLocation(newLocations);
				setForm({ ...form, location: newLocations });
			} else if (location[0].name === '') {
				// If the first street is empty, replace it with the new street
				const newLocations = [newLocation];
				setLocation(newLocations);
				setForm({ ...form, location: newLocations });
			} else {
				// Street doesn't exist, add new street
				const newLocations = [...location, newLocation];
				setLocation(newLocations);
				setForm({ ...form, location: newLocations });
			}
		}
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
