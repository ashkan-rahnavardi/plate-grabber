'use client';

import { useEffect } from 'react';

// Havent added 24hr checkbox yet

// TODO: fix time input

export default function LicenseForm() {
	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;

		console.log(name, value);
		localStorage.setItem(name, event.target.value);
	};

	// Function to load values from localStorage
	const loadValuesFromLocalStorage = () => {
		const inputElements = document.querySelectorAll('input, select, textarea');

		inputElements.forEach((inputElement) => {
			const name = inputElement.getAttribute('name');
			if (name) {
				const storedValue = localStorage.getItem(name);
				if (storedValue !== null) {
					inputElement.setAttribute('value', storedValue);
				}
			}
		});
	};

	useEffect(() => {
		// Call the function to load values when the component mounts
		loadValuesFromLocalStorage();
	}, []); // Empty dependency array ensures this effect runs only once when the component mounts

	const divStyle: string = 'mb-4 flex items-center';
	const labelStyle: string = 'text-sm font-bold mr-2 flex-shrink-0';
	const inputStyle: string = 'border rounded w-full py-2 px-3';

	return (
		<div className="flex-col p-4">
			<div className={divStyle}>
				<label className={labelStyle} htmlFor="reference">
					Reference #:
				</label>
				<input
					className={inputStyle}
					type="text"
					id="reference"
					name="reference"
					onChange={handleChange}
				/>
			</div>
			<div className={divStyle}>
				<label className={labelStyle} htmlFor="sides">
					On side(s) of
				</label>
				<select
					className={inputStyle}
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
			<div className={divStyle}>
				<label className={labelStyle} htmlFor="hundred_blocks">
					Hundred Block(s):{' '}
				</label>
				<input
					className={inputStyle}
					type="text"
					id="hundred_blocks"
					name="hundred_blocks"
					onChange={handleChange}
				/>
			</div>
			<div className={divStyle}>
				<label className={labelStyle} htmlFor="street/lane">
					Street/Lane:{' '}
				</label>
				<input
					className={inputStyle}
					type="text"
					id="street/lane"
					name="street/lane"
					onChange={handleChange}
				/>
			</div>
			<div className={divStyle}>
				<label className={labelStyle} htmlFor="road_type">
					Road Type{' '}
				</label>
				<select
					id="road_type"
					name="road_type"
					onChange={handleChange}
					className={inputStyle}
				>
					<option value="avenue">Avenue</option>
					<option value="street">Street</option>
					<option value="boulevard">Boulevard</option>
					<option value="crescent">Crescent</option>
					<option value="place">Place</option>
					<option value="drive">Drive</option>
				</select>
			</div>
			<div className={divStyle}>
				<label className={labelStyle} htmlFor="sign_wording">
					Sign Wording:{' '}
				</label>
				<input
					className={inputStyle}
					type="text"
					id="sign_wording"
					name="sign_wording"
					onChange={handleChange}
				/>
			</div>
			<div className={divStyle}>
				<label className={labelStyle} htmlFor="install_date">
					Install Date:{' '}
				</label>
				<input
					className={inputStyle}
					type="date"
					id="install_date"
					name="install_date"
					onChange={handleChange}
				/>
			</div>
			<div className={divStyle}>
				<label className={labelStyle} htmlFor="install_time">
					Install Time:{' '}
				</label>
				<input
					className={inputStyle}
					type="time"
					id="install_time"
					name="install_time"
					onChange={handleChange}
				/>
			</div>
			<div className={divStyle}>
				<label className={labelStyle} htmlFor="crew_initials">
					Crew Initials:{' '}
				</label>
				<input
					className={inputStyle}
					type="text"
					id="crew_initials"
					name="crew_initials"
					onChange={handleChange}
				/>
			</div>
			<div className={divStyle}>
				<label className={labelStyle} htmlFor="signature">
					Signature:{' '}
				</label>
				<input
					className={inputStyle}
					type="text"
					id="signature"
					name="signature"
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
