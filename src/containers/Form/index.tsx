'use client';

import { saveForm, updateForm } from '@/actions/actions';
import StreetInput from '@/components/Input/street';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormsContext } from '@/services/FormsProvider';
import { LicenseForm } from '@/types/licenseForm';
import { UserSession } from '@/types/userSession';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const emptyForm = {
	reference: '',
	email: '',
	sides: '',
	hundredBlocks: '',
	street: '',
	roadType: '',
	signWording: '',
	installDate: '',
	installTime: '',
	crew: '',
	signature: '',
};

export default function Form() {
	const params = useParams();
	const forms = useContext(FormsContext);
	const session = useSession();
	const [form, setForm] = useState(
		forms.find((form) => form.reference === params.id) || emptyForm
	);

	const streets = ['Georgia St.', 'Burrard St.', 'Granville St.'];

	// add email and signature to form , email is required to save form
	useEffect(() => {
		const user = session.data?.user as UserSession;

		setForm({ ...form, email: user.email, signature: user.name });
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSave = async () => {
		const result = await saveForm(form as LicenseForm);
		if (result.success) {
			alert(result.message); // Or set state to show a success message in your component
		} else {
			alert(result.message); // Or set state to show an error message
		}
	};
	const handleUpdate = async () => {
		const result = await updateForm(form as LicenseForm);

		if (result.success) {
			alert(result.message); // Or set state to show a success message in your component
		} else {
			alert(result.message); // Or set state to show an error message
		}
	};

	return (
		<div className="space-y-2 ">
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
			<StreetInput />

			{/* <div>
				<label htmlFor="sides">Sides</label>
				<Input
					type="text"
					id="sides"
					name="sides"
					value={form?.sides}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="hundredBlocks">Hundred Blocks</label>
				<Input
					type="text"
					id="hundredBlocks"
					name="hundredBlocks"
					value={form?.hundredBlocks}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="street">Street</label>
				<Input
					type="text"
					id="street"
					name="street"
					value={form?.street}
					placeholder="e.g. Georgia St. "
					onChange={handleChange}
				/>
			</div> */}

			{/* Quick fix to get the button out of the way, need to make the parrent 
			div height full screen and then position these buttons at the bottom */}
			<div className="absolute bottom-52">
				{params.id === 'new' ? (
					<Button onClick={handleSave}>Save</Button>
				) : (
					<Button onClick={handleUpdate}>Update</Button>
				)}
			</div>
		</div>
	);
}
