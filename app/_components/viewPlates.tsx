'use client';

import { useEffect, useState } from 'react';

/// ...

interface PlatesData {
	[key: string]: string[];
}

export default function ViewPlates({ storageHelper }: { storageHelper: any }) {
	const [plates, setPlates] = useState<PlatesData>({});

	useEffect(() => {
		setPlates(storageHelper.getPlates());
	}, []);

	const handlePlateChange = (
		blockNumber: string,
		plateIndex: number,
		newValue: string
	) => {
		// Update the plate value in the state
		const updatedPlates = { ...plates };
		updatedPlates[blockNumber][plateIndex] = newValue;

		setPlates(updatedPlates);

		storageHelper.updatePlate(blockNumber, newValue, plateIndex);
	};

	return (
		<div>
			{/* <h1>Stored Plates:</h1> */}
			<table>
				{/* <thead>
					<tr className="mx-4">
						<th>Block Number</th>
						<th>Plates</th>
					</tr>
				</thead> */}
				<tbody>
					{Object.entries(plates).map(([blockNumber, plateArray]) => (
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
