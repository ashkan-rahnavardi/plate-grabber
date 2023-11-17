'use client';

import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const Camera: React.FC = () => {
	const webcamRef = useRef<Webcam>(null);

	const capture = () => {
		if (webcamRef.current) {
			const imageSrc = webcamRef.current.getScreenshot();
			// Do something with the imageSrc, like sending it to a server or updating state
		}
	};

	return (
		<div>
			<Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
			<button onClick={capture}>Capture photo</button>
		</div>
	);
};
export default Camera;
