import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserDocument extends Document {
  name: string;
  email: string;
  phone: string;
  consumerNumber: string;
  avatarUrl?: string;
  role: "consumer" | "admin";
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    consumerNumber: { type: String, required: true, unique: true },
    avatarUrl: { type: String },
    role: { type: String, enum: ["consumer", "admin"], default: "consumer" },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

export const UserModel: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);

export default UserModel;

