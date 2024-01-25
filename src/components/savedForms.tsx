'use client';

import { useState } from 'react';

export default function SavedForms({ storageHelper }: { storageHelper: any }) {
	const formIDs = storageHelper.getFormIDs();

	const [showNoFormsModal, setShowNoFormsModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showID, setShowID] = useState('');
	const [viewID, setViewID] = useState('');
	const [viewModal, setViewModal] = useState(false);
	const [deleteSeclectedModal, setDeleteSelectedModal] = useState(false);

	const [selectedForms, setSelectedForms] = useState<string[]>([]);
	const [selectAllChecked, setSelectAllChecked] = useState(false);

	const handleSelectAll = () => {
		if (selectAllChecked) {
			setSelectedForms([]);
		} else {
			setSelectedForms(formIDs);
		}
		setSelectAllChecked(!selectAllChecked);
	};

	const handleSelect = (
		formID: string,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		event.stopPropagation();

		setSelectedForms((prevSelected) => {
			if (prevSelected.includes(formID)) {
				return prevSelected.filter((id) => id !== formID);
			} else {
				return [...prevSelected, formID];
			}
		});
	};

	const handleFormClick = (formID: string) => {
		setViewID(formID);

		if (showID === formID) {
			setShowID('');
		} else {
			setShowID(formID);
		}
	};

	const handleContinue = () => {
		storageHelper.changeCurrentForm(viewID);
		setShowModal(false);
		window.location.reload();
	};

	const noForms = () => {
		return <h1>No forms saved</h1>;
	};

	const handleDelete = () => {
		if (selectedForms.length === 0) {
			setShowNoFormsModal(true);
		} else {
			setShowModal(true);
			setDeleteSelectedModal(true);
		}
	};

	const handleDownload = () => {
		if (selectedForms.length === 0) {
			setShowNoFormsModal(true);
		} else {
			storageHelper.downloadSelectedForms(selectedForms);
		}
	};

	const DownloadDelete = () => {
		return (
			<div className="flex">
				<button
					className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mx-2"
					onClick={() => {
						handleDelete();
					}}
				>
					Delete Selected
				</button>
				<button
					className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mx-2"
					onClick={() => {
						handleDownload();
					}}
				>
					Download Selected
				</button>
			</div>
		);
	};

	const NoFormsModal = () => {
		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
				<div className="bg-white p-8 rounded-md">
					<h1>No Forms selected</h1>
					<div className="flex justify-around mt-4">
						<button
							className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
							onClick={() => {
								setShowNoFormsModal(false);
							}}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		);
	};

	const Modal = () => {
		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
				<div className="bg-white p-8 rounded-md">
					<h1>
						Warning any unsaved changes on current form will be lost if you
						continue
					</h1>

					{deleteSeclectedModal && (
						<>
							<br />
							<h1>Are you sure you wish to delete selected forms?</h1>
						</>
					)}

					<div className="flex justify-around mt-4">
						<button
							className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
							onClick={() => {
								setDeleteSelectedModal(false);
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

						{deleteSeclectedModal && (
							<button
								className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
								onClick={() => {
									storageHelper.deleteSelectedForms(selectedForms);
									window.location.reload();
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
			{showNoFormsModal && <NoFormsModal />}
			{showModal && <Modal />}
			<div className="flex flex-wrap justify-center flex-col items-center space-y-2">
				{formIDs.length === 0 ? (
					noForms()
				) : (
					<>
						<div className="mb-4">
							<input
								type="checkbox"
								checked={selectAllChecked}
								onChange={handleSelectAll}
							/>
							<span className="ml-2">Select All</span>
						</div>
						<DownloadDelete />
					</>
				)}
				{formIDs.map((formID: string) => (
					<div
						key={formID}
						className={`flex m-4 p-4 border rounded-md hover:bg-gray-100 cursor-pointer w-80 text-center justify-between`}
						onClick={() => handleFormClick(formID)}
					>
						<div onClick={(e) => e.stopPropagation()}>
							<input
								type="checkbox"
								checked={selectedForms.includes(formID)}
								onChange={(event) => handleSelect(formID, event)}
							/>
						</div>

						<h1 className="text-xl font-semibold">Ref: {' ' + formID}</h1>
						<button
							className={`bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mx-2 ${
								showID === formID ? '' : 'invisible'
							}`}
							onClick={() => {
								setShowModal(true);
								setViewModal(true);
							}}
						>
							View
						</button>
					</div>
				))}
			</div>
		</>
	);
}
