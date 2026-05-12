import { Types } from "mongoose";
import { HttpError } from "../config/httpError.config.js";
import { HTTP_FORBIDDEN, HTTP_NOT_FOUND } from "../lib/httpError.js";
import { Problem } from "../models/Problem.model.js";
import { IUserDocument, User } from "../models/User.model.js";

export const getCountProblemsService = async () => {
  return await Problem.countDocuments({}).exec();
};

export const getAllProblemsService = async () => {
  const problems = await Problem.find({});
  return problems;
};

export const createProblemService = async (
  user: IUserDocument,
  data: Record<string, unknown>,
) => {
  if (user.type !== "interviewer")
    throw new HttpError("Unauthorized", HTTP_FORBIDDEN.code);

  const problem = await Problem.create(data);
  return problem;
};

export const getProblemByIdService = async (id: string) => {
  const problem = await Problem.findById(id);

  if (!problem) throw new HttpError("Problem not found", HTTP_NOT_FOUND.code);

  return problem;
};
