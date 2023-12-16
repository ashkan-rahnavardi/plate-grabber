'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Modal = ({
	currentBlock,
	setCurrentBlock,
	setShowModal,
	handleContinue,
}: {
	currentBlock: string;
	setCurrentBlock: (currentBlock: string) => void;
	setShowModal: (showModal: boolean) => void;
	handleContinue: () => void;
}) => {
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
						value={currentBlock}
						onChange={(e) => {
							setCurrentBlock(e.target.value);
						}}
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

export default function AddPlate({ storageHelper }: { storageHelper: any }) {
	const [showModal, setShowModal] = useState(false);
	const [currentBlock, setCurrentBlock] = useState('');
	const router = useRouter();

	const handleContinue = () => {
		if (!currentBlock.trim()) {
			// Show an alert if the input is empty
			alert('Please enter a value for Current Block');
			return;
		}

		storageHelper.addCurrentBlock(currentBlock);

		setShowModal(false);

		router.push('/add-plate');
	};

	return (
		<>
			{showModal && (
				<Modal
					currentBlock={currentBlock}
					setCurrentBlock={setCurrentBlock}
					setShowModal={setShowModal}
					handleContinue={handleContinue}
				/>
			)}
			<button
				className="bg-blue-500 hover:gb-blue-600 text-white py-2 px-4 rounded mx-2 w-1/5"
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
