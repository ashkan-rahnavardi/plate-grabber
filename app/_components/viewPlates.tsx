'use client';

import { use, useEffect, useState } from 'react';

export default function ViewPlates() {
	const [plates, setPlates] = useState('{}');

	useEffect(() => {
		setPlates(localStorage.getItem('plates') || '{}');
	}, [plates]);

	let platesJSON = JSON.parse(plates || '{}');

	let platesString = JSON.stringify(platesJSON);

	return (
		<div>
			<h1>{platesString}</h1>
		</div>
	);
}
