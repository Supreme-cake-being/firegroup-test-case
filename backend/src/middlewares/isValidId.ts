import { RequestHandler } from "express";
import { HttpError } from "helpers";
import { isValidObjectId } from "mongoose";

export const isValidId = (key: string): RequestHandler => {
  return (req, _, next) => {
    const params = req.params;

    if (!isValidObjectId(params[key])) {
      return next(HttpError(404, `Not found`));
    }
    next();
  };
};
