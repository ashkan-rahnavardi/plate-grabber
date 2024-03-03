'use client';

import { saveForm, updateForm } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormsContext } from '@/services/FormsProvider';
import { LicenseForm } from '@/types/licenseForm';
import { UserSession } from '@/types/userSession';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

// TO DO:
// When the form is either saved or updated, the user should be redirected to the home page.
// There should first be an alert displayed to show if its been saved or what the issue was, then the user
// gets redirected

// Make the the formContext is also updated, either via refresh or by updating the context directly.

// make the the forms that are displayed in the home page are also updated

//Change the layout of the forms to be more readable and user frienddly, everything doesn't
// have to be in one line.

// Will have to restucture the form Model as well to make sense with the new layout
// Each road has a block and each block has sides, so the form should be structured in a way that

// Delete form needs to be added as well to the overview
// change the actions column to be a view/edit icon
// being able to delete or download selected forms

const emptyForm = {
	// _id: '',
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
		<div>
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
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="roadType">Road Type</label>
				<Input
					type="text"
					id="roadType"
					name="roadType"
					value={form?.roadType}
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
			{params.id === 'new' ? (
				<Button onClick={handleSave}>Save</Button>
			) : (
				<Button onClick={handleUpdate}>Update</Button>
			)}
		</div>
	);
}
