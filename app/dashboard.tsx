'use client';

import { useState } from 'react';
import AddPlate from './_components/addPlate';
import LicenseForm from './_components/licenseForm';
import ViewPlates from './_components/viewPlates';

// To Do: Make view plate in a dropdown like form
// To Do: Save button for form
// View saved forms

export default function Dashboard() {
	const [isFormVisible, setFormVisibility] = useState(true);
	const [isPlatesVisible, setPlatesVisibility] = useState(true);
	const [showModal, setShowModal] = useState(false);

	const handleClearLocalStorage = () => {
		// Remove all data from local storage except 'signature' and 'crew_initials'
		Object.keys(localStorage).forEach((key) => {
			if (key !== 'signature' && key !== 'crew_initials') {
				localStorage.removeItem(key);
			}
		});

		// Reload the form to reflect the changes
		window.location.reload();
	};

	return (
		<div className="p-4">
			<button
				className="bg-black text-white py-2 px-4 rounded mb-4"
				onClick={() => setFormVisibility(!isFormVisible)}
			>
				{isFormVisible ? 'Hide Form' : 'Show Form'}
			</button>

			{isFormVisible && <LicenseForm />}

			<div className="mb-4 flex items-center justify-center">
				<button
					className="bg-red-500 text-white py-2 px-4 rounded"
					onClick={handleClearLocalStorage}
				>
					Clear form
				</button>
			</div>
			<button
				className="bg-black text-white py-2 px-4 rounded mb-4"
				onClick={() => setPlatesVisibility(!isPlatesVisible)}
			>
				{isFormVisible ? 'Hide Plates' : 'Show Plates'}
			</button>

			{isPlatesVisible && <ViewPlates />}
			<div className="mb-4 flex items-center justify-center">
				<button
					className="bg-black text-white py-2 px-4 rounded"
					type="button"
					onClick={() => {
						setShowModal(true);
					}}
				>
					Add Plate
				</button>
			</div>
			{showModal && <AddPlate closeModal={() => setShowModal(false)} />}
		</div>
	);
}
