import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    imageUrl: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const users = mongoose?.models?.users || mongoose?.model("users", userSchema);
export default users;
