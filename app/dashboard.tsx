'use client';

import { useState } from 'react';
import Form from './_components/form';
import SavedForms from './_components/savedForms';
import { StorageHelperType, useStorage } from './_helper/storageContext';

export default function Dashboard() {
	const [isFormVisible, setFormVisibility] = useState(true);
	const [isSavedVisible, setSavedVisibility] = useState(false);

	const storageHelper: StorageHelperType = useStorage();

	return (
		<div className="p-4 flex flex-col min-h-screen">
			<button
				className="bg-black text-white py-2 px-4 rounded mb-4"
				onClick={() => setFormVisibility(!isFormVisible)}
			>
				{isFormVisible ? 'Hide Form' : 'Show Form'}
			</button>

			{isFormVisible && <Form />}
			<button
				className="bg-black text-white py-2 px-4 rounded mb-4"
				onClick={() => setSavedVisibility(!isSavedVisible)}
			>
				{isSavedVisible ? 'Hide Saved Forms' : 'Show Saved Forms'}
			</button>

			{isSavedVisible && <SavedForms storageHelper={storageHelper} />}
		</div>
	);
}
