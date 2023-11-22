'use client';

// Havent added 24hr checkbox yet

// TODO: if values already stored in local storage, load them into the form
//       fix time input

export default function LicenseForm() {
	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;

		console.log(name, value);
		localStorage.setItem(name, event.target.value);
	};

	return (
		<div className=".flex-col">
			<div>
				<label>Reference #: </label>
				<input
					type="text"
					id="reference"
					name="reference"
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>On side(s) of </label>
				<select id="sides" name="sides" onChange={handleChange}>
					<option value="front">Both</option>
					<option value="north">North</option>
					<option value="south">South</option>
					<option value="west">West</option>
					<option value="east">East</option>
				</select>
			</div>
			<div>
				<label>Hundred Block(s): </label>
				<input
					type="text"
					id="hundred_blocks"
					name="hundred_blocks"
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Street/Lane: </label>
				<input
					type="text"
					id="street/lane"
					name="street/lane"
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Road Type </label>
				<select id="road_type" name="road_type" onChange={handleChange}>
					<option value="avenue">Avenue</option>
					<option value="street">Street</option>
					<option value="boulevard">Boulevard</option>
					<option value="crescent">Crescent</option>
					<option value="place">Place</option>
					<option value="drive">Drive</option>
				</select>
			</div>
			<div>
				<label>Sign Wording / Decals to Read: </label>
				<input
					type="text"
					id="sign_wording"
					name="sign_wording"
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Install Date: </label>
				<input
					type="date"
					id="install_date"
					name="install_date"
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Install Time: </label>
				<input
					type="time"
					id="install_time"
					name="install_time"
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Crew Initials: </label>
				<input
					type="text"
					id="crew_initials"
					name="crew_initials"
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Signature: </label>
				<input
					type="text"
					id="signature"
					name="signature"
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
