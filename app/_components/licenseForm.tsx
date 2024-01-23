'use client';
import debounce from '@/app/_helper/debounce';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function LicenseForm({ storageHelper }: { storageHelper: any }) {
	// const handleChange = (
	// 	event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	// ) => {
	// 	const { name, value } = event.target;
	// 	storageHelper.updateFormProperty(name, value);
	// };

	type FormData = {
		[key: string]: any; // Replace 'any' with more specific types if possible
	};

	const handleChange = debounce(
		async (event) => {
			const { name, value } = event.target;
			await saveFormDataToDatabase({ [name]: value });
		},
		1000 // 1000 milliseconds delay
	);

	const saveFormDataToDatabase = async (formData: FormData) => {
		try {
			await fetch('/api/saveFormData', {
				// Replace with your server endpoint
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
		} catch (error) {
			console.error('Error saving form data:', error);
		}
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
				<label className="label-style" htmlFor="Reference">
					Reference #:
				</label>
				<input
					className="input-style"
					type="text"
					id="Reference"
					name="Reference"
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="Sides">
					On side(s) of
				</label>
				<select
					className="input-style"
					id="Sides"
					name="Sides"
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
				<label className="label-style" htmlFor="HundredBlock">
					Hundred Block(s):{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="HundredBlock"
					name="HundredBlock"
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="Street">
					Street/Lane:{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="Street"
					name="Street"
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="StreetType">
					Road Type:{' '}
				</label>
				<select
					id="StreetType"
					name="StreetType"
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
				<label className="label-style" htmlFor="SignWord">
					Sign Wording:{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="SignWord"
					name="SignWord"
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="InstallDate">
					Install Date:{' '}
				</label>
				<input
					className="input-style"
					type="date"
					id="InstallDate"
					name="InstallDate"
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="InstallTime">
					Install Time:{' '}
				</label>
				<input
					className="input-style"
					type="time"
					id="InstallTime"
					name="InstallTime"
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="Crew">
					Crew Initials:{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="Crew"
					name="Crew"
					onChange={handleChange}
				/>
			</div>
			<div className="flex items-center">
				<label className="label-style" htmlFor="Signature">
					Signature:{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="Signature"
					name="Signature"
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
