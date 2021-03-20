/**
 * @author Nick Neamtu
 * @file demoLogger.ts
 */

import "colors";

import { NextFunction, Request, Response } from "express";

/**
 * Log request info
 * @param req Request object.
 * @param res Response object.
 * @param next NextFunction next middleware function.
 */
const demoLogger = (req: Request, res: Response, next: NextFunction): void => {
  const current_datetime = new Date();
  const formatted_date: string =
    (current_datetime.getMonth() + 1 < 10
      ? `0${current_datetime.getMonth() + 1}`
      : current_datetime.getMonth() + 1) +
    "-" +
    (current_datetime.getDate() < 10
      ? `0${current_datetime.getDate()}`
      : current_datetime.getDate()) +
    "-" +
    current_datetime.getFullYear() +
    " " +
    (current_datetime.getHours() < 10
      ? `0${current_datetime.getHours()}`
      : current_datetime.getHours()) +
    ":" +
    (current_datetime.getMinutes() < 10
      ? `0${current_datetime.getMinutes()}`
      : current_datetime.getMinutes()) +
    ":" +
    (current_datetime.getSeconds() < 10
      ? `0${current_datetime.getSeconds()}`
      : current_datetime.getSeconds()) +
    ":" +
    (current_datetime.getMilliseconds() < 10
      ? `0${current_datetime.getMilliseconds()}`
      : current_datetime.getMilliseconds());
  const method: string = req.method;
  const url: string = req.url;
  const status: number = res.statusCode;
  const txt =
    "[" +
    formatted_date.bold +
    "]" +
    " " +
    method.green +
    ":" +
    url +
    " " +
    status.toString().yellow.bold;
  console.log(txt);
  next();
};

export default demoLogger;
