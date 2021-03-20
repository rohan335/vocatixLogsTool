/**
 * @author Nick Neamtu
 * @file firebaseInit.ts
 */

import firebase from "firebase-admin";

/**
 * Initialize Firebase admin.
 * Only call once on server start.
 */
const firebaseInit = (): void => {
  firebase.initializeApp({
    credential: firebase.credential.cert(process.env),
    databaseURL: process.env["databaseURL"],
  });
};

export default firebaseInit;
