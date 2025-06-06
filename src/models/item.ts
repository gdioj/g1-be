import { Schema, model, Document, Types } from "mongoose";

export interface ItemDocument extends Document {
  name: string;
  description?: string;
  brands: string[];
  price: number;
  checked: boolean;
  createdBy: Types.ObjectId;
  updatedAt: Date;
  household: Types.ObjectId;
}

const itemSchema = new Schema<ItemDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    brands: [{ type: String }],
    price: { type: Number, default: 0 },
    checked: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    household: {
      type: Schema.Types.ObjectId,
      ref: "Household",
      required: true,
    },
  },
  { timestamps: true }
);

export const Item = model<ItemDocument>("Item", itemSchema);
