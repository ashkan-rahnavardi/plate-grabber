'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Modal = ({ closeModal }: { closeModal: () => void }) => {
	const [currentBlock, setCurrentBlock] = useState('');
	const router = useRouter();

	const handleContinue = () => {
		if (!currentBlock.trim()) {
			// Show an alert if the input is empty
			alert('Please enter a value for Current Block');
			return;
		}
		// Save the value to local storage
		localStorage.setItem('current-block', currentBlock);

		// Close the modal
		closeModal();

		router.push('/add-plate');
	};

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
						onChange={(e) => setCurrentBlock(e.target.value)}
					/>
				</div>
				<div className="flex justify-around mt-4">
					<button
						className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
						onClick={closeModal}
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

export default function AddPlate({ closeModal }: { closeModal: () => void }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button
				className="bg-black text-white py-2 px-4 rounded"
				type="button"
				onClick={() => {
					setShowModal(true);
				}}
			>
				Add Plate
			</button>

			{showModal && <Modal closeModal={() => setShowModal(false)} />}
		</>
	);
}
