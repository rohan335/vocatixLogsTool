/**
 * @author Nick Neamtu
 * @file server.ts
 */

import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { decodeFirebaseIdToken } from "./auth/auth";
import firebaseInit from "./auth/firebaseInit";
import connectMongoose from "./db/connectMongoose";
import demoLogger from "./logging/demoLogger";

// Make sure .env with Firebase project info is in the root of the directory or this will fail.
dotenv.config();

// Only call these once on server start.
firebaseInit();
connectMongoose();

const port = process.env["PORT"] || 3000;

const app = express();

// Middleware.
app.use(demoLogger);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(decodeFirebaseIdToken);

// When testing, let supertest find the first available port so no port collisions occur between jest workers.
if (process.env["NODE_ENV"] !== "test") {
  app.listen(port, () => console.log(`Server listening on port ${port}...`));
}

export default {};
