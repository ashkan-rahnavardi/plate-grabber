import { LicenseForm } from '@/types/licenseForm';
import mongoose, { Document, Schema } from 'mongoose';

// Save email as unique ID for each form, that's what will get used to display the proper forms to each user
// Have a buffer form with Reference: 'current' that will be used to store the current form being filled out
//

// export interface Forms extends Document {
// 	Reference: string;
// 	Sides: string;
// 	HundredBlock: [number];
// 	Street: string;
// 	StreetType: string;
// 	SignWord: string;
// 	InstallDate: string;
// 	InstallTime: string;
// 	Crew: string;
// 	Signature: string;
// 	Plates: { string: [string] };
// 	Email: string;
// }

interface Forms extends Document, Omit<LicenseForm, '_id'> {}

const FormSchema = new Schema<Forms>({
	reference: { type: String, required: true },
	email: { type: String, required: true },
	sides: { type: String, required: false },
	hundredBlocks: { type: String, required: false },
	street: { type: String, required: false },
	roadType: { type: String, required: false },
	signWording: { type: String, required: false },
	installDate: { type: String, required: false },
	installTime: { type: String, required: false },
	crew: { type: String, required: false },
	signature: { type: String, required: false },
	// Plates: { type: { string: [String] }, required: false },
});

export default mongoose.models.Form ||
	mongoose.model<Forms>('Form', FormSchema);
