import mongoose, { InferSchemaType, Types } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }, // createdAt & updatedAt
);

export const User = mongoose.model("User", userSchema);

export type IUserDocument = InferSchemaType<typeof userSchema> & {
  _id?: Types.ObjectId;
};
