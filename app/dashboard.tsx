'use client';

import { useState } from 'react';
import AddPlate from './_components/addPlate';
import ClearForm from './_components/clearForm';
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
		storageHelper.clearCurrentForm();
		window.location.reload();
	};

	const Form = () => {
		return (
			<>
				<div className="w-full flex flex-row-reverse pr-2">
					<ClearForm storageHelper={storageHelper} />
					{/* <button
						className="bg-red-500 text-white py-2 px-4 rounded mx-2 w-1/3"
						onClick={handleClearLocalStorage}
					>
						Clear form
					</button> */}
				</div>
				<LicenseForm storageHelper={storageHelper} />
				<div className="w-full flex justify-center mb-4">
					<AddPlate storageHelper={storageHelper} />
				</div>

				<div
					className={`flex justify-between ${
						isPlatesVisible ? '' : 'bg-gray-300'
					}`}
					onClick={() => setPlatesVisibility(!isPlatesVisible)}
				>
					<h1 className="font-bold">Plates:</h1>

					<h1>{isPlatesVisible ? '▲' : '▼'}</h1>
				</div>

				{isPlatesVisible && <ViewPlates storageHelper={storageHelper} />}

				<div className="my-4 flex items-center justify-center">
					<SaveForm storageHelper={storageHelper} />
				</div>
			</>
		);
	};

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
