'use client';

import { useState } from 'react';

export default function ClearForm({ storageHelper }: { storageHelper: any }) {
	const [showModal, setShowModal] = useState(false);

	const handleClearLocalStorage = () => {
		storageHelper.clearCurrentForm();
		window.location.reload();
	};

	const Modal = () => {
		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
				<div className="bg-white p-8 rounded-md">
					<h1>Are you sure you wish to clear current form?</h1>
					<div className="flex justify-around mt-4">
						<button
							className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
							onClick={() => {
								setShowModal(false);
							}}
						>
							Back
						</button>
						<button
							className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mx-2"
							onClick={() => {
								handleClearLocalStorage();
							}}
						>
							Clear
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
				className="bg-red-500 text-white py-2 px-4 rounded mx-2 w-1/3"
				onClick={() => {
					setShowModal(true);
				}}
			>
				Clear form
			</button>
		</>
	);
}
