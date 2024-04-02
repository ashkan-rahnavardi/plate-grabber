'use client';

import { saveForm, updateForm } from '@/actions/actions';
import Essential from '@/components/InputForm/essential';
import StreetInput from '@/components/InputForm/street';
import PlatesTable from '@/components/PlatesTable/platesTable';
import TopNav from '@/components/TopNav/formNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormsContext } from '@/services/FormsProvider';
import { LicenseForm } from '@/types/licenseForm';
import { UserSession } from '@/types/userSession';
import { CameraIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
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
	const { forms, updateForms } = useContext(FormsContext);
	const session = useSession();

	// get form index
	const formIndex = forms.findIndex((form) => form.reference === params.id);

	// if form exists, get it, else get empty form
	const initialForm = formIndex !== -1 ? forms[formIndex] : emptyForm;

	// set form state
	const [form, setForm] = useState(initialForm);

	// const [form, setForm] = useState(
	// 	forms.find((form) => form.reference === params.id) || testForm
	// );

	// add email and signature to form , email is required to save form
	useEffect(() => {
		const user = session.data?.user as UserSession;

		setForm({ ...form, email: user.email, signature: user.name });
	}, []);

	// MAKE SURE THIS WORKS PROPERLY AND ALSO ACCOUNT FOR WHEN THE FORM INDEX
	// IS -1 AND THE FORM IS NOT FOUND
	useEffect(() => {
		if (formIndex !== -1) {
			const newForms = [...forms];
			newForms[formIndex] = form;
			updateForms(newForms);
		}
	}, [form]);

	// SAVE FORM TO DATABASE
	const handleSave = async () => {
		console.log('form', form);
		const result = await saveForm(form as LicenseForm);
		if (result.success) {
			alert(result.message); // Or set state to show a success message in your component
		} else {
			alert(result.message); // Or set state to show an error message
		}
	};

	// UPDATE FORM IN DATABASE
	const handleUpdate = async () => {
		const result = await updateForm(form as LicenseForm);

		if (result.success) {
			alert(result.message); // Or set state to show a success message in your component
		} else {
			alert(result.message); // Or set state to show an error message
		}
	};

	console.log('form', form);

	return (
		<>
			<TopNav />
			<div className="space-y-2 py-10 w-full">
				<Essential form={form} setForm={setForm} />
				<StreetInput form={form} setForm={setForm} />
				<PlatesTable form={form} />

				{/* Quick fix to get the button out of the way, need to make the parrent 
			div height full screen and then position these buttons at the bottom */}
				<div className="fixed bottom-0 bg-background w-full">
					<div className="flex justify-between p-4">
						{params.id === 'new' ? (
							<Button onClick={handleSave}>Save</Button>
						) : (
							<Button onClick={handleUpdate}>Update</Button>
						)}
						<Button className="mr-4">Add Plates</Button>
					</div>
				</div>
			</div>
		</>
	);
}
