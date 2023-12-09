'use client';

import { useState } from 'react';
import AddPlate from './_components/addPlate';
import LicenseForm from './_components/licenseForm';
import SaveForm from './_components/saveFrom';
import SavedForms from './_components/savedForms';
import ViewPlates from './_components/viewPlates';
import { StorageHelperType, useStorage } from './_helper/storageContext';

export default function Dashboard() {
	const [isFormVisible, setFormVisibility] = useState(true);
	const [isPlatesVisible, setPlatesVisibility] = useState(true);
	const [isSavedVisible, setSavedVisibility] = useState(false);

	const storageHelper: StorageHelperType = useStorage();

	const handleClearLocalStorage = () => {
		Object.keys(localStorage).forEach((key) => {
			localStorage.removeItem(key);
		});

		window.location.reload();
	};

	return (
		<div className="p-4 flex flex-col">
			<button
				className="bg-black text-white py-2 px-4 rounded mb-4"
				onClick={() => setFormVisibility(!isFormVisible)}
			>
				{isFormVisible ? 'Hide Form' : 'Show Form'}
			</button>

			{isFormVisible && <LicenseForm storageHelper={storageHelper} />}
			<button
				className="bg-black text-white py-2 px-4 rounded mb-4"
				onClick={() => setPlatesVisibility(!isPlatesVisible)}
			>
				{isPlatesVisible ? 'Hide Plates' : 'Show Plates'}
			</button>

			{isPlatesVisible && <ViewPlates storageHelper={storageHelper} />}
			<button
				className="bg-black text-white py-2 px-4 rounded mb-4"
				onClick={() => setSavedVisibility(!isSavedVisible)}
			>
				{isSavedVisible ? 'Hide Saved Forms' : 'Show Saved Forms'}
			</button>

			{isSavedVisible && <SavedForms storageHelper={storageHelper} />}
			<div className="mb-4 flex items-center justify-center">
				<button
					className="bg-red-500 text-white py-2 px-4 rounded mx-2"
					onClick={handleClearLocalStorage}
				>
					Clear form
				</button>
				<AddPlate storageHelper={storageHelper} />
				<SaveForm storageHelper={storageHelper} />
			</div>
		</div>
	);
}
