'use client';

import { useState } from 'react';

export default function SaveForm({ storageHelper }: { storageHelper: any }) {
	const [showModal, setShowModal] = useState(false);
	const [errorSaving, setErrorSaving] = useState(false);

	const handleSave = () => {
		setErrorSaving(!storageHelper.saveCurrentForm());
		setShowModal(true);
	};

	const Modal = () => {
		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
				<div className="bg-white p-8 rounded-md">
					{errorSaving && (
						<div className="text-red-500 mb-4">
							Please fill in all required fields
						</div>
					)}
					{!errorSaving && (
						<div className="text-green-500 mb-4">Form saved successfully</div>
					)}
					<div className="flex justify-around mt-4">
						<button
							className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
							onClick={() => {
								if (!errorSaving) {
									window.location.reload();
								}
								setShowModal(false);
								setErrorSaving(false);
							}}
						>
							Continue
						</button>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			{showModal && <Modal />}
			<button
				className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-1/5"
				onClick={() => {
					handleSave();
				}}
			>
				Save
			</button>
		</>
	);
}
