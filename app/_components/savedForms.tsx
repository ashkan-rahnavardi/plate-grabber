'use client';

// TO DO: Make View/Delete buttons only show on the card that clicks them
// TO DO: Clicking view or delete should show a warning modal being like u sure or make sure to save changes

import { useState } from 'react';

export default function SavedForms({ storageHelper }: { storageHelper: any }) {
	const formIDs = storageHelper.getFormIDs();

	const [showModal, setShowModal] = useState(false);
	const [showID, setShowID] = useState('');
	const [showButtons, setShowButtons] = useState(false);

	const handleContinue = () => {
		storageHelper.changeCurrentForm(showID);
		setShowModal(false);
		window.location.reload();
	};

	const handleFormClick = (formID: string) => {
		setShowID(formID);
		setShowModal(true);
	};

	const Modal = () => {
		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
				<div className="bg-white p-8 rounded-md">
					<h1>Warning any unsaved changes will be lost if you continue</h1>
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
			<div className="flex flex-wrap justify-center">
				{formIDs.map((formID: string) => (
					<div
						key={formID}
						className="m-4 p-4 border rounded-md hover:bg-gray-100 cursor-pointer"
						// onClick={() => handleFormClick(formID)}
						onClick={() => setShowButtons(!showButtons)}
					>
						<p>Reference:</p>
						<h1 className="text-xl font-semibold">{formID}</h1>
						{showButtons && (
							<>
								<button>View</button>
								<button>Delete</button>
							</>
						)}
					</div>
				))}
			</div>
		</>
	);
}
