'use server';
import dbConnect from '@/database/dbConnect';
import { authOptions } from '@/lib/authOptions';
import FormModel from '@/models/form';
import UserModel from '@/models/user';
import { UserSession } from '@/types/userSession';
import { getServerSession } from 'next-auth/next';

export async function Save(formData: any) {
	await dbConnect();
	const session = await getServerSession(authOptions);
	const form = await FormModel.findOneAndUpdate(
		{ Reference: formData.Reference },
		formData
	);

	if (session) {
		const user = await UserModel.findOne({ email: session.user?.email ?? '' });
		if (form) {
			console.log('found and updated');
		} else {
			formData.Email = session.user?.email ?? '';
			const newForm = new FormModel(formData);
			try {
				await newForm.save();
				user.forms.push(newForm._id);
				await user.save();
				console.log('saved new form');
			} catch (err) {
				console.log(err);
			}
		}
	} else {
		console.log('no session');
	}
}

export async function GetForms(userSession: UserSession) {
	await dbConnect();

	if (userSession) {
		const formData = await FormModel.find({ email: userSession.email });
		// convert to plain object
		const forms = formData.map((form) => {
			const obj = form.toObject();
			obj._id = obj._id.toString();
			return obj;
		});

		return forms;
	} else {
		return [];
	}
}

export async function GetForm(id: string) {
	await dbConnect();
	const form = await FormModel.findById(id);
	return form;
}
