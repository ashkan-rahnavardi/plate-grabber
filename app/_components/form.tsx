'use client';

import { useState } from 'react';
import AddPlate from '../_components/addPlate';
import ClearForm from '../_components/clearForm';
import SaveForm from '../_components/saveFrom';
import ViewPlates from '../_components/viewPlates';
import { StorageHelperType, useStorage } from '../_helper/storageContext';
import { Save } from '../actions';
import FormInputs from './formInputs';

export default function Form() {
	const emptyForm = {
		Reference: 'Current',
		Sides: '',
		HundredBlock: [],
		Street: '',
		StreetType: '',
		SignWord: '',
		InstallDate: '',
		InstallTime: '',
		Crew: '',
		Signature: '',
		Plates: {},
	};

	const storageHelper: StorageHelperType = useStorage();

	const [formData, setFormData] = useState(emptyForm);
	const [isPlatesVisible, setPlatesVisibility] = useState(true);

	const handleChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<>
			<div className="w-full flex flex-row-reverse pr-2">
				<ClearForm storageHelper={storageHelper} />
			</div>
			<FormInputs data={formData} handleChange={handleChange} />
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
				{/* <SaveForm storageHelper={storageHelper} /> */}
				<button
					className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-1/3"
					onClick={() => {
						// handleSave();
						Save(formData);
					}}
				>
					Save
				</button>
			</div>
			<button onClick={() => console.log(formData)}>Log</button>
		</>
	);
}
