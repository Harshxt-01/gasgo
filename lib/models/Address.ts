import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAddressDocument extends Document {
  userId: string;
  label: "Home" | "Work" | "Other";
  consumerNumber: string;
  houseFlat: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  contactPhone: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<IAddressDocument>(
  {
    userId: { type: String, required: true, index: true },
    label: { type: String, enum: ["Home", "Work", "Other"], default: "Home" },
    consumerNumber: { type: String, required: true },
    houseFlat: { type: String, required: true },
    street: { type: String, required: true },
    landmark: { type: String, default: "" },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    contactPhone: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const AddressModel: Model<IAddressDocument> =
  mongoose.models.Address ||
  mongoose.model<IAddressDocument>("Address", AddressSchema);

export default AddressModel;

