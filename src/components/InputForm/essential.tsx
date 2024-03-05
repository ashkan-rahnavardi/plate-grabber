import { Input } from '@/components/ui/input';
import { LicenseForm, NewLicenseForm } from '@/types/licenseForm';
import React from 'react';

export default function Essential({
	form,
	handleChange,
}: {
	form: LicenseForm | NewLicenseForm;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<>
			<div className="flex space-x-2 justify-between">
				<div>
					<label htmlFor="reference">Reference</label>
					<Input
						type="text"
						id="reference"
						name="reference"
						value={form?.reference}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="signWording">Sign Wording</label>
					<Input
						type="text"
						id="signWording"
						name="signWording"
						value={form?.signWording}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="flex space-x-2 justify-between">
				<div>
					<label htmlFor="signature">Signature</label>
					<Input
						type="text"
						id="signature"
						name="signature"
						value={form?.signature}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="crew">Crew</label>
					<Input
						type="text"
						id="crew"
						name="crew"
						value={form?.crew}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="flex space-x-2 justify-between">
				<div>
					<label htmlFor="installDate">Install Date</label>
					<Input
						type="date"
						id="installDate"
						name="installDate"
						value={form?.installDate}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="installTime">Install Time</label>
					<Input
						type="time"
						id="installTime"
						name="installTime"
						value={form?.installTime}
						onChange={handleChange}
					/>
				</div>
			</div>
		</>
	);
}
