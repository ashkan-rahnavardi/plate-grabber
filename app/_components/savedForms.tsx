'use client';

// Pass saved ids from dashboard so it refreshes on change

import { useState } from 'react';

export default function SavedForms({ storageHelper }: { storageHelper: any }) {
	const formIDs = storageHelper.getFormIDs();

	const [showModal, setShowModal] = useState(false);
	const [showID, setShowID] = useState('');
	const [showButtonsForID, setShowButtonsForID] = useState<{
		[key: string]: boolean;
	}>({});
	const [viewModal, setViewModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const handleDelete = () => {
		storageHelper.deleteForm(showID);
		setShowModal(false);
		window.location.reload();
	};

	const handleContinue = () => {
		storageHelper.changeCurrentForm(showID);
		setShowModal(false);
		window.location.reload();
	};

	const handleFormClick = (formID: string) => {
		setShowID(formID);

		setShowButtonsForID((prev) => ({ ...prev, [formID]: !prev[formID] }));
	};

	const Modal = () => {
		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
				<div className="bg-white p-8 rounded-md">
					<h1>
						Warning any unsaved changes on current form will be lost if you
						continue
					</h1>

					{deleteModal && (
						<>
							<br />
							<h1>Are you sure you wish to delete form {showID}?</h1>
						</>
					)}

					<div className="flex justify-around mt-4">
						<button
							className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
							onClick={() => {
								setDeleteModal(false);
								setViewModal(false);
								setShowModal(false);
							}}
						>
							Close
						</button>
						{viewModal && (
							<button
								className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
								onClick={() => {
									handleContinue();
								}}
							>
								Continue
							</button>
						)}
						{deleteModal && (
							<button
								className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
								onClick={() => {
									handleDelete();
								}}
							>
								Delete
							</button>
						)}
					</div>
				</div>
			</div>
		);
	};
	return (
		<>
			{showModal && <Modal />}
			<div className="flex flex-wrap justify-center">
				<button
					className="bg-green-500 hover:bg-blue-600 text-white py-2 px-4 rounded mx-2"
					onClick={() => {
						storageHelper.downloadAllForms();
						// formIDs.forEach((formID: string) => {
						// 	storageHelper.downloadForm(formID);
						// });
					}}
				>
					Download All
				</button>
				{formIDs.map((formID: string) => (
					<div
						key={formID}
						className={`m-4 p-4 border rounded-md hover:bg-gray-100 cursor-pointer w-64 text-center ${
							showButtonsForID[formID] ? 'h-32' : 'h-16' // Adjust the heights based on your design
						}`}
						onClick={() => handleFormClick(formID)}
					>
						<h1 className="text-xl font-semibold">Reference: {' ' + formID}</h1>
						{showButtonsForID[formID] && (
							<>
								<button
									className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mx-2"
									onClick={() => {
										setShowModal(true);
										setDeleteModal(true);
									}}
								>
									Delete
								</button>
								<button
									className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mx-2"
									onClick={() => {
										setShowModal(true);
										setViewModal(true);
									}}
								>
									View
								</button>
							</>
						)}
					</div>
				))}
			</div>
		</>
	);
}
