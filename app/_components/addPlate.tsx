'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddPlate({ storageHelper }: { storageHelper: any }) {
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { value } = event.target;
		storageHelper.setCurrentBlock(value);
	};

	const handleContinue = () => {
		const currentBlock = storageHelper.getCurrentBlock();
		if (!currentBlock.trim()) {
			// Show an alert if the input is empty
			alert('Please enter a value for Current Block');
			return;
		}

		// Close the modal
		setShowModal(false);

		router.push('/add-plate');
	};

	const Modal = () => {
		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
				<div className="bg-white p-8 rounded-md">
					<div className="input-container">
						<label className="label-style" htmlFor="current-block">
							Current Block:{' '}
						</label>
						<input
							className="input-style"
							type="text"
							id="current-block"
							name="current-block"
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="flex justify-around mt-4">
						<button
							className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
							onClick={() => {
								setShowModal(false);
							}}
						>
							Close
						</button>
						<button
							className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
							onClick={() => {
								handleContinue();
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
				className="bg-black text-white py-2 px-4 rounded mx-2"
				type="button"
				onClick={() => {
					setShowModal(true);
				}}
			>
				Add Plate
			</button>
		</>
	);
}
