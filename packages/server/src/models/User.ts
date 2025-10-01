import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import type { UserRoles } from "../types/userTypes";

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  role: UserRoles;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware for password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method for password comparison
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
