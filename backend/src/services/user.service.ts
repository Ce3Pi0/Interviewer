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
  const currentUser = await User.findById(id);

  if (!currentUser) throw new HttpError("User not found", HTTP_NOT_FOUND.code);

  if (currentUser.type)
    throw new HttpError("User already has a type", HTTP_CONFLICT.code);

  currentUser.type = userType;

  await currentUser.save();

  return currentUser;
};
