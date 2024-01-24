'use server';
import { authOptions } from '@/app/_lib/authOptions';
import dbConnect from '@/app/_lib/dbConnect';
import FormModel from '@/models/form';
import UserModel from '@/models/user';
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
