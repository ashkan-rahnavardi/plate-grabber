'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const Camera: React.FC = () => {
	const webcamRef = useRef<Webcam>(null);
	const [capturedImage, setCapturedImage] = useState<string | null>(null);

	const videoConstraints = {
		// facingMode: 'environment',
		facingMode: { ideal: 'environment' },
	};

	const capture = useCallback(() => {
		if (webcamRef.current) {
			const imageSrc = webcamRef.current.getScreenshot();
			setCapturedImage(imageSrc);
		}
	}, [webcamRef]);

	return (
		<div>
			<Webcam
				audio={false}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				width={640}
				height={480}
				videoConstraints={videoConstraints}
			/>
			<button onClick={capture}>Capture photo</button>
			{capturedImage && <img src={capturedImage} alt="Captured" />}
		</div>
	);
};
export default Camera;
