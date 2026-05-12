import { Types } from "mongoose";
import { HttpError } from "../config/httpError.config.js";
import { HTTP_CONFLICT, HTTP_NOT_FOUND } from "../lib/httpError.js";
import { IUserDocument, User } from "../models/User.model.js";
import { TUserType } from "../types/user.types.js";

export const countUsersService = async () => {
  return await User.countDocuments({}).exec();
};

export const selectUserTypeService = async (
  id: Types.ObjectId,
  userType: TUserType,
) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: id, type: null },
    { $set: { type: userType } },
    { new: true },
  );

  if (!updatedUser) {
    const userExists = await User.findById(id);
    if (!userExists) {
      throw new HttpError("User not found", HTTP_NOT_FOUND.code);
    }
    throw new HttpError("User already has a type", HTTP_CONFLICT.code);
  }

  return updatedUser;
};
