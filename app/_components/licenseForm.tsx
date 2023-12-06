'use client';

import { useEffect } from 'react';

export default function LicenseForm({ storageHelper }: { storageHelper: any }) {
	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;
		storageHelper.updateFormProperty(name, value);
	};

	const loadForm = () => {
		const inputElements = document.querySelectorAll('input, select, textarea');
		const form = storageHelper.getFormById('current');

		inputElements.forEach((element) => {
			const name = element.getAttribute('name');
			if (name) {
				if (name in form) {
					element.setAttribute('value', form[name]);
				}
			}
		});
	};

	useEffect(() => {
		loadForm();
	}, []);

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
				<label className="label-style" htmlFor="street">
					Street/Lane:{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="street"
					name="street"
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
				<label className="label-style" htmlFor="crew">
					Crew Initials:{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="crew"
					name="crew"
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
