import { Request } from 'express';
import { UserDocument } from './models/user';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}

export interface Context {
  req: Request;
}
