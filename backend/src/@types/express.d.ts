import { IUserDocument } from "../models/User.model.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}
