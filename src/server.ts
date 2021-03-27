/**
 * @author Nick Neamtu
 * @file server.ts
 */

//imports
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { decodeFirebaseIdToken } from "./auth/auth";
import firebaseInit from "./auth/firebaseInit";
import demoLogger from "./logging/demoLogger";
import bodyParser from "body-parser"
import * as loggers from "./logging/logger";

// Make sure .env with Firebase project info is in the root of the directory or this will fail.
dotenv.config();

// Only call these once on server start.
firebaseInit();

const port = process.env["PORT"] || 3000;

const app = express();

// Middleware.
app.use(demoLogger);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(decodeFirebaseIdToken);
//Middleware specific to logging server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// When testing, let supertest find the first available port so no port collisions occur between jest workers.
if (process.env["NODE_ENV"] !== "test") {

  app.post('/post-test', (req, res) => {
    //I hate Ts variables using references, so this is the only way I could get it to make a copy of the JSON object that was not a reference 😐
    //Fuck you Ts
    var temp = JSON.parse(JSON.stringify(req.body));
    //remove the type in the copy, since keeping it in would be redundant. its already the log in as "level"
    delete temp['type'];
    
    //if statements to sort the request level to the correct logger
    //logs with the ccorrect logger
    if(req.body.type == "error") {loggers.errorLogger.log(req.body.type, temp, 200)}
    if(req.body.type == "warn") {loggers.warnLogger.log(req.body.type, temp, 200)}
    if(req.body.type == "info") {loggers.infoLogger.log(req.body.type, temp, 200)}
    if(req.body.type == "http") {loggers.httpLogger.log(req.body.type, temp, 200)}
    if(req.body.type == "verbose") {loggers.verboseLogger.log(req.body.type, temp, 200)}
    if(req.body.type == "debug") {loggers.debugLogger.log(req.body.type, temp, 200)}
    if(req.body.type == "silly") {loggers.sillyLogger.log(req.body.type, temp, 200)}
    
    //returns HTTP OK 200 🚀🚀🚀
    res.sendStatus(200);
  })

  app.listen(port, () => console.log(`Server listening on port ${port}...`));
}

export default {};