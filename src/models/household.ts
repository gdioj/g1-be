import { Schema, model, Document, Types } from 'mongoose';

export interface HouseholdDocument extends Document {
  name: string;
  shortDescription?: string;
  members: Types.ObjectId[];
  createdAt: Date;
}

const householdSchema = new Schema<HouseholdDocument>({
  name: { type: String, required: true },
  shortDescription: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: { createdAt: true, updatedAt: false } }); // Add timestamps

export const Household = model<HouseholdDocument>('Household', householdSchema);
