import { DecodedIdToken } from "firebase-admin/auth";

// this file is used to extend the Express Request object to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: DecodedIdToken;
    }
  }
}

export {};