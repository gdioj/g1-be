import { Schema, model, Document, Types } from 'mongoose';
import mongoose from 'mongoose';

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  googleId: string;
  name: string;
  email: string;
  household?: Types.ObjectId;
}

const userSchema = new Schema<UserDocument>({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  household: { type: Schema.Types.ObjectId, ref: 'Household' },
});

export const User = mongoose.models.User || model<UserDocument>('User', userSchema);
