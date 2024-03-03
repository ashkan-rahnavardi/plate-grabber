import { LicenseForm } from '@/types/licenseForm';
import mongoose, { Document, Schema } from 'mongoose';

interface Forms extends Document, Omit<LicenseForm, '_id'> {}

const FormSchema = new Schema<Forms>({
	reference: { type: String, required: true },
	email: { type: String, required: true },
	sides: { type: String, required: false },
	hundredBlocks: { type: String, required: false },
	street: { type: String, required: true },
	roadType: { type: String, required: false },
	signWording: { type: String, required: false },
	installDate: { type: String, required: true },
	installTime: { type: String, required: false },
	crew: { type: String, required: false },
	signature: { type: String, required: false },
	// Plates: { type: { string: [String] }, required: false },
});

export default mongoose.models.Form ||
	mongoose.model<Forms>('Form', FormSchema);
