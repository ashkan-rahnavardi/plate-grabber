export default function SavedForms() {
	const forms = { ...localStorage };

	return (
		<div>
			{Object.entries(forms).map(([key, value]) => (
				<div key={key}>
					<h1>{key}</h1>
					<p>{value}</p>
				</div>
			))}
		</div>
	);
}
