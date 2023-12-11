'use client';

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
	const [deleteAllModal, setDeleteAllModal] = useState(false);

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

					{deleteAllModal && (
						<>
							<br />
							<h1>Are you sure you wish to delete ALL forms?</h1>
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
						{deleteAllModal && (
							<button
								className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
								onClick={() => {
									storageHelper.deleteAllForms();
									setShowModal(false);
									window.location.reload();
								}}
							>
								Delete All
							</button>
						)}
					</div>
				</div>
			</div>
		);
	};

	const noForms = () => {
		return <h1>No forms saved</h1>;
	};

	const DownloadAllButtons = () => {
		return (
			<div className="flex">
				<button
					className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mx-2"
					onClick={() => {
						setShowModal(true);
						setDeleteAllModal(true);
					}}
				>
					Delete All
				</button>
				<button
					className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mx-2"
					onClick={() => {
						storageHelper.downloadAllForms();
					}}
				>
					Download All
				</button>
			</div>
		);
	};
	return (
		<>
			{showModal && <Modal />}
			<div className="flex flex-wrap justify-center flex-col items-center space-y-2">
				{formIDs.length === 0 ? noForms() : <DownloadAllButtons />}
				{formIDs.map((formID: string) => (
					<div
						key={formID}
						className={`m-4 p-4 border rounded-md hover:bg-gray-100 cursor-pointer w-64 text-center ${
							showButtonsForID[formID] ? 'h-24' : 'h-12' // Adjust the heights based on your design
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
