import { Request } from 'express';
import { UserRecord, DecodedIdToken } from 'firebase-admin/lib/auth/';

declare global {
  namespace Express {
    interface Request {
      user: UserRecord; // Replace 'any' with your own type for the user object
      decodedToken: DecodedIdToken;
    }
  }
}
