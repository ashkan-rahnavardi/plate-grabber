'use server';
import dbConnect from '@/database/dbConnect';
import FormModel from '@/models/form';
import { LicenseForm, NewLicenseForm } from '@/types/licenseForm';

export async function saveForm(formData: NewLicenseForm) {
	await dbConnect();

	const newForm = new FormModel(formData);

	try {
		await newForm.save();

		return { success: true, message: 'Great success! Form Save' };
	} catch (err) {
		const error = err as Error;
		return { success: false, message: error.message || 'An error occurred' };
	}
}

export async function updateForm(formData: LicenseForm) {
	await dbConnect();

	try {
		await FormModel.findOneAndUpdate({ _id: formData._id }, formData);
		return { success: true, message: 'Great success! Form Updated' };
	} catch (err) {
		const error = err as Error;
		return { success: false, message: error.message || 'An error occurred' };
	}
}

export async function GetForms(email: string) {
	await dbConnect();

	if (email) {
		const formData = await FormModel.find({ email: email });
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

// export async function Save(formData: any) {
// 	await dbConnect();
// 	const session = await getServerSession(authOptions);
// 	const form = await FormModel.findOneAndUpdate(
// 		{ Reference: formData.Reference },
// 		formData
// 	);

// 	if (session) {
// 		const user = await UserModel.findOne({ email: session.user?.email ?? '' });
// 		if (form) {
// 			console.log('found and updated');
// 		} else {
// 			formData.Email = session.user?.email ?? '';
// 			const newForm = new FormModel(formData);
// 			try {
// 				await newForm.save();
// 				user.forms.push(newForm._id);
// 				await user.save();
// 				console.log('saved new form');
// 			} catch (err) {
// 				console.log(err);
// 			}
// 		}
// 	} else {
// 		console.log('no session');
// 	}
// }
