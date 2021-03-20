/**
 * @author Joe Paul
 * @file firebaseInit.ts
 */

import { NextFunction, Request, Response } from "express";
import * as firebase from "firebase-admin";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const decodeFirebaseIdToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(400).send({
      error: "You did not include an idToken for this request",
    });
  }

  try {
    // Use firebase-admin auth to verify the token passed in from the client header.
    // This is token is generated from the firebase client
    // Decoding this token returns the userpayload and all the other token claims you added while creating the custom token
    req.user = await firebase.auth().verifyIdToken(req.headers.authorization);

    next();
    return;
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Could not complete authorization request." });
  }
};
