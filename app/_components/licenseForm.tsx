'use client';

import { useEffect } from 'react';

// Havent added 24hr checkbox yet

// TODO: fix time input

export default function LicenseForm({ form }: { form: string }) {
	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;

		// Load the existing form from localStorage or initialize an empty form
		const storedForm = JSON.parse(localStorage.getItem('current') || '{}');

		// Update the corresponding property in the form
		storedForm[name] = value;

		// Store the updated form in localStorage
		localStorage.setItem('current', JSON.stringify(storedForm));

		console.log(name, value);
	};

	const loadValuesFromLocalStorage = () => {
		const inputElements = document.querySelectorAll('input, select, textarea');

		inputElements.forEach((inputElement) => {
			const name = inputElement.getAttribute('name');
			if (name) {
				// Load the form from localStorage or initialize an empty form
				const storedForm = JSON.parse(localStorage.getItem(form) || '{}');

				// Check if the property exists in the stored form
				if (name in storedForm) {
					// Update the input value with the stored value
					inputElement.setAttribute('value', storedForm[name]);
				}
			}
		});
	};

	// // Function to load values from localStorage
	// const loadValuesFromLocalStorage = () => {
	// 	const inputElements = document.querySelectorAll('input, select, textarea');

	// 	inputElements.forEach((inputElement) => {
	// 		const name = inputElement.getAttribute('name');
	// 		if (name) {
	// 			const storedValue = localStorage.getItem(name);
	// 			if (storedValue !== null) {
	// 				inputElement.setAttribute('value', storedValue);
	// 			}
	// 		}
	// 	});
	// };

	useEffect(() => {
		// Call the function to load values when the component mounts
		loadValuesFromLocalStorage();
	}, []); // Empty dependency array ensures this effect runs only once when the component mounts

	return (
		<div className="flex-col p-4">
			<div className="input-container">
				<label className="label-style" htmlFor="reference">
					Reference #:
				</label>
				<input
					className="input-style"
					type="text"
					id="reference"
					name="reference"
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="sides">
					On side(s) of
				</label>
				<select
					className="input-style"
					id="sides"
					name="sides"
					onChange={handleChange}
				>
					<option value="front">Both</option>
					<option value="north">North</option>
					<option value="south">South</option>
					<option value="west">West</option>
					<option value="east">East</option>
				</select>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="hundred_blocks">
					Hundred Block(s):{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="hundred_blocks"
					name="hundred_blocks"
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="street/lane">
					Street/Lane:{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="street/lane"
					name="street/lane"
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="road_type">
					Road Type:{' '}
				</label>
				<select
					id="road_type"
					name="road_type"
					onChange={handleChange}
					className="input-style"
				>
					<option value="avenue">Avenue</option>
					<option value="street">Street</option>
					<option value="boulevard">Boulevard</option>
					<option value="crescent">Crescent</option>
					<option value="place">Place</option>
					<option value="drive">Drive</option>
				</select>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="sign_wording">
					Sign Wording:{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="sign_wording"
					name="sign_wording"
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="install_date">
					Install Date:{' '}
				</label>
				<input
					className="input-style"
					type="date"
					id="install_date"
					name="install_date"
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="install_time">
					Install Time:{' '}
				</label>
				<input
					className="input-style"
					type="time"
					id="install_time"
					name="install_time"
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="crew_initials">
					Crew Initials:{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="crew_initials"
					name="crew_initials"
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="signature">
					Signature:{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="signature"
					name="signature"
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
