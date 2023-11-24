'use client';

import { useState } from 'react';
import AddPlate from './_components/addPlate';
import LicenseForm from './_components/licenseForm';
import SaveForm from './_components/saveFrom';
import SavedForms from './_components/savedForms';
import ViewPlates from './_components/viewPlates';

// To Do: Make view plate in a dropdown like form
// To Do: Save button for form
// View saved forms

export default function Dashboard() {
	const [isFormVisible, setFormVisibility] = useState(true);
	const [isPlatesVisible, setPlatesVisibility] = useState(true);
	const [showModal, setShowModal] = useState(false);

	const [form, setForm] = useState('current');

	const handleClearLocalStorage = () => {
		// Remove all data from local storage except 'signature' and 'crew_initials'
		Object.keys(localStorage).forEach((key) => {
			localStorage.removeItem(key);
		});

		// Reload the form to reflect the changes
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

			{isFormVisible && <LicenseForm form={form} />}
			<button
				className="bg-black text-white py-2 px-4 rounded mb-4"
				onClick={() => setPlatesVisibility(!isPlatesVisible)}
			>
				{isPlatesVisible ? 'Hide Plates' : 'Show Plates'}
			</button>

			{isPlatesVisible && <ViewPlates />}
			<div className="mb-4 flex items-center justify-center">
				<button
					className="bg-red-500 text-white py-2 px-4 rounded mx-2"
					onClick={handleClearLocalStorage}
				>
					Clear form
				</button>
				<button
					className="bg-black text-white py-2 px-4 rounded mx-2"
					type="button"
					onClick={() => {
						setShowModal(true);
					}}
				>
					Add Plate
				</button>
				<SaveForm />
			</div>
			{showModal && <AddPlate closeModal={() => setShowModal(false)} />}
			<SavedForms />
		</div>
	);
}
