'use client';

import Link from 'next/link';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from 'react-camera-pro';
import StorageHelper from '../_helper/storageHelper';

// TO DO: finish converting styled comp to tailwind

const Modal = ({
	closeModal,
	plate,
	currentBlock,
	image,
	setCurrentBlock,
	setPlate,
	storageHelper,
}: {
	closeModal: () => void;
	plate: string;
	image: string;
	currentBlock: string;
	setCurrentBlock: (currentBlock: string) => void;
	setPlate: (plate: string) => void;
	storageHelper: StorageHelper;
}) => {
	const updatePlate = (plate: string, block: string) => {
		storageHelper.addPlates(block, plate);
		closeModal();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 h-3/4">
			<div className="bg-white p-8 rounded-md">
				<img src={image} />
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
				<div className="input-container">
					<label className="label-style" htmlFor="plate">
						Plate:{' '}
					</label>
					<input
						className="input-style"
						type="text"
						id="plate"
						name="plate"
						value={plate}
						onChange={(e) => {
							setPlate(e.target.value);
						}}
					/>
				</div>
				<div className="flex justify-around mt-4">
					<button
						className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 py-2 px-4 rounded"
						onClick={closeModal}
					>
						Redo
					</button>
					<button
						className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
						onClick={() => {
							updatePlate(plate, currentBlock);
						}}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

const ProCam = () => {
	const storageHelper = new StorageHelper();

	const [image, setImage] = useState<string>('');
	const [currentBlock, setCurrentBlock] = useState<string>(
		storageHelper.getCurrentBlock()
	);
	const [plate, setPlate] = useState<string>('');
	const camera = useRef<CameraType>(null);
	const [showModal, setShowModal] = useState(false);

	const apiCall = async () => {
		if (image) {
			try {
				const response = await fetch('/api', {
					method: 'POST',
					body: JSON.stringify({ image: image }),
				});
				const jsonResponse = await response.json();
				const plate = jsonResponse.plate;
				setPlate(plate);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleTakePhoto = () => {
		if (camera.current) {
			const photo = camera.current.takePhoto();
			setImage(photo);
			setShowModal(true);
		}
	};

	useEffect(() => {
		apiCall();
	}, [image]);

	return (
		<>
			<div className="fixed w-full h-full">
				{showModal && (
					<Modal
						closeModal={() => setShowModal(false)}
						setPlate={setPlate}
						setCurrentBlock={setCurrentBlock}
						plate={plate}
						currentBlock={currentBlock}
						image={image}
						storageHelper={storageHelper}
					/>
				)}
				<Camera
					errorMessages={{
						noCameraAccessible:
							'No camera device accessible. Please connect your camera or try a different browser.',
						permissionDenied:
							'Permission denied. Please refresh and give camera permission.',
						switchCamera:
							'It is not possible to switch camera to different one because there is only one video device accessible.',
						canvas: 'Canvas is not supported.',
					}}
					ref={camera}
					aspectRatio="cover"
					facingMode="environment"
				/>
				<div className="bottom-0 right-0 fixed mb-5 mr-10">
					<button
						className="bg-slate-400 bg-opacity-70 text-white mx-1 py-2 px-4 rounded-full"
						onClick={handleTakePhoto}
					>
						<img src="https://img.icons8.com/ios/50/000000/compact-camera.png" />
					</button>
					<div className="mb-4 flex items-center justify-center">
						<Link href="/" className="bg-black text-white py-2 px-4 rounded">
							Home
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProCam;
