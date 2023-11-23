'use client';

export default function ViewPlates({
	plates,
	setPlates,
}: {
	plates: string;
	setPlates: (plates: string) => void;
}) {
	let platesJSON = JSON.parse(plates || '{}');

	let platesString = JSON.stringify(platesJSON);

	return (
		<div>
			<h1>{platesString}</h1>
		</div>
	);
}
