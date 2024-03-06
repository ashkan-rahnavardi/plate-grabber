'use client';

import { saveForm, updateForm } from '@/actions/actions';
import Essential from '@/components/InputForm/essential';
import StreetInput from '@/components/InputForm/street';
import TopNav from '@/components/TopNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormsContext } from '@/services/FormsProvider';
import { LicenseForm } from '@/types/licenseForm';
import { UserSession } from '@/types/userSession';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const emptyForm: LicenseForm = {
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
	location: [
		{
			name: '',
			blocks: [
				{
					number: '',
					side: '',
					plates: [''],
				},
			],
		},
	],
};

const testForm: LicenseForm = {
	reference: '4206969',
	email: '',
	sides: '',
	hundredBlocks: '',
	street: 'Georgia St.',
	roadType: '',
	signWording: 'No parking',
	installDate: '2024-04-02',
	installTime: '16:20',
	crew: 'Ash, Rusty',
	signature: '',
	location: [
		{
			name: 'Georgia St.',
			blocks: [
				{
					number: '100',
					side: 'North',
					plates: ['ABC123', 'DEF456'],
				},
			],
		},
	],
};

export default function Form() {
	const params = useParams();
	const forms = useContext(FormsContext);
	const session = useSession();
	const [form, setForm] = useState(
		forms.find((form) => form.reference === params.id) || testForm
	);

	// add email and signature to form , email is required to save form
	useEffect(() => {
		const user = session.data?.user as UserSession;

		setForm({ ...form, email: user.email, signature: user.name });
	}, []);

	const handleSave = async () => {
		console.log('form', form);
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
		<>
			<TopNav />
			<div className="space-y-2 py-10">
				<Essential form={form} setForm={setForm} />
				<StreetInput form={form} setForm={setForm} />

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
		</>
	);
}
