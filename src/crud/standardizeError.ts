/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @author Nick Neamtu
 * @file standardizeError.ts
 */

// TODO fix any types
const standardizeError = (err: any): any => {
  const error = {
    error: err,
  };
  if (err.name === "CastError") {
    error.error = `Invalid ${err.path}: ${err.value}`;
  }
  if (err.code === 11000) {
    const attemptedMatch = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
    if (attemptedMatch && attemptedMatch[0]) {
      let value = attemptedMatch[0];
      console.log(value);
      console.log(err.errmsg);
      console.log(err.index);
      if (err.errmsg.includes("index: uid")) {
        error.error = "Internal Server Error. Please try again!";
      } else {
        while (value.includes('"')) {
          value = value.replace('"', "");
        }
        error.error = `${value} is already taken. Please try again!`;
      }
    }
  }
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    let unpolished = `${errors.join(". ")}`;
    if (unpolished.includes("Error, expected `uid` to be unique")) {
      //console.log("got here 1")
      error.error = "Internal Server Error. Please try again!";
      return error;
    } else if (unpolished.includes("Error, expected `")) {
      let key = unpolished.substring(
        unpolished.indexOf("`", 0) + 1,
        unpolished.indexOf("`", unpolished.indexOf("`", 0) + 1)
      );
      key = key.charAt(0).toUpperCase() + key.slice(1);
      console.log("unpolished");
      console.log(unpolished);
      error.error = key + " is taken. Please try again!";
      return error;
    } else {
      unpolished = unpolished
        .replace("`", "")
        .replace("`", "")
        .replace("Path ", "");
      error.error = unpolished.charAt(0).toUpperCase() + unpolished.slice(1);
      return error;
    }
  }
  return error;
};

export default standardizeError;
