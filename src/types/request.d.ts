/**
 * @author Nick Neamtu
 * @file request.d.ts
 */

import { auth } from "firebase-admin";

declare module "express-serve-static-core" {
  /**
   * Extend Request interface in include user field for authorized requests.
   */
  interface Request {
    user?: auth.DecodedIdToken;
  }
}
