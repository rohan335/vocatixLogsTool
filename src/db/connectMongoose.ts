/**
 * @author Nick Neamtu
 * @file connectMongoose.ts
 */

import mongoose from "mongoose";

/**
 * Connect to mongo db.
 * Only call once on server start.
 */
const connectMongoose = (): void => {
  mongoose.connect("mongodb://127.0.0.1:27017/legal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });
};

export default connectMongoose;
