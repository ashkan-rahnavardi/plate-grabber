'use client';

import { useEffect, useState } from 'react';

/// ...
export default function ViewPlates() {
	const [plates, setPlates] = useState('{}');

	useEffect(() => {
		setPlates(localStorage.getItem('plates') || '{}');
	}, [plates]);

	let platesJSON = JSON.parse(plates || '{}') as Record<string, string[]>;

	const handlePlateChange = (
		blockNumber: string,
		plateIndex: number,
		newValue: string
	) => {
		// Update the plate value in the state
		const updatedPlates = { ...platesJSON };
		updatedPlates[blockNumber][plateIndex] = newValue;
		setPlates(JSON.stringify(updatedPlates));

		// Update the plate value in local storage
		localStorage.setItem('plates', JSON.stringify(updatedPlates));
	};

	return (
		<div>
			<h1>Stored Plates:</h1>
			<table>
				<thead>
					<tr>
						<th>Block Number</th>
						<th>Plates</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(platesJSON).map(([blockNumber, plateArray]) => (
						<tr key={blockNumber}>
							<td>{blockNumber}</td>
							<td>
								<table>
									<tbody>
										{[...Array(Math.ceil(plateArray.length / 3))].map(
											(_, rowIndex) => (
												<tr key={rowIndex}>
													{plateArray
														.slice(rowIndex * 3, (rowIndex + 1) * 3)
														.map((plate, index) => (
															<td key={index}>
																<input
																	className="w-full"
																	type="text"
																	value={plate}
																	onChange={(e) =>
																		handlePlateChange(
																			blockNumber,
																			rowIndex * 3 + index,
																			e.target.value
																		)
																	}
																/>
															</td>
														))}
												</tr>
											)
										)}
									</tbody>
								</table>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
