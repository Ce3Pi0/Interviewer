import { IUserDocument } from "../models/User.model.js";
declare global {
  namespace Express {
    interface User extends UserDocument {
      _id?: any;
    }
    interface Request {
      user?: IUserDocument;
    }
  }
}
