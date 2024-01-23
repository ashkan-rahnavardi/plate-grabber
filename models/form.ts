import mongoose, { Document, Schema } from 'mongoose';

export interface Forms extends Document {
	name: string;
	street: string;
}

const FormSchema = new Schema<Forms>({
	name: { type: String, required: true },
	street: { type: String, required: true },
});

export default mongoose.models.Form ||
	mongoose.model<Forms>('Form', FormSchema);
