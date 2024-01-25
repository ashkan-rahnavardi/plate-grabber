import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
	name: string;
	email: string;
	forms: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<User>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	forms: [{ type: Schema.Types.ObjectId, ref: 'Form' }],
});

export default mongoose.models.User || mongoose.model<User>('User', UserSchema);
