export default function AddPlate() {
	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;

		console.log(name, value);
		localStorage.setItem(name, event.target.value);
	};

	return (
		<div className="flex-col p-4">
			<div className="input-container">
				<label className="label-style" htmlFor="reference">
					Block #:
				</label>
				<input
					className="input-style"
					type="text"
					id="block"
					name="block"
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
