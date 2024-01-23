import mongoose, { Document, Schema } from 'mongoose';

// Save email as unique ID for each form, that's what will get used to display the proper forms to each user
// Have a buffer form with Reference: 'current' that will be used to store the current form being filled out
//

export interface Forms extends Document {
	Reference: string;
	Sides: string;
	HundredBlock: [number];
	Street: string;
	StreetType: string;
	SignWord: string;
	InstallDate: string;
	InstallTime: string;
	Crew: string;
	Signature: string;
	Plates: { string: [string] };
	Email: string;
}

const FormSchema = new Schema<Forms>({
	Reference: { type: String, required: true },
	Sides: { type: String, required: true },
	HundredBlock: { type: [Number], required: true },
	Street: { type: String, required: true },
	StreetType: { type: String, required: true },
	SignWord: { type: String, required: true },
	InstallDate: { type: String, required: true },
	InstallTime: { type: String, required: true },
	Crew: { type: String, required: true },
	Signature: { type: String, required: true },
	Plates: { type: { string: [String] }, required: true },
	Email: { type: String, required: true },
});

export default mongoose.models.Form ||
	mongoose.model<Forms>('Form', FormSchema);
