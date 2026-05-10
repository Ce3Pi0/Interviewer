import { Types } from "mongoose";
import { IUserDocument } from "../models/User.model.js";

declare global {
  namespace Express {
    interface User extends IUserDocument {
      _id?: Types.ObjectId;
    }
    interface Request {
      user?: IUserDocument;
    }
  }
}
