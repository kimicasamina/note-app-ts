import * as express from 'express';

// Extend the Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        // username: string;
      };
    }
  }
}
