import { Blocks, LicenseForm, Street } from '@/types/licenseForm';
import mongoose, { Document, Schema } from 'mongoose';

const BlocksSchema = new Schema<Blocks>({
	number: { type: String, required: true },
	side: { type: String, required: true },
	plates: [{ type: [String], required: false }],
});

const StreetSchema = new Schema<Street>({
	name: { type: String, required: true },
	blocks: [BlocksSchema],
});

interface Forms extends Document, LicenseForm {
	_id?: string;
}

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
	location: [StreetSchema],
	// Plates: { type: { string: [String] }, required: false },
});

export default mongoose.models.Form ||
	mongoose.model<Forms>('Form', FormSchema);
