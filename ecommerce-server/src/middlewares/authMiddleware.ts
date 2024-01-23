import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utilityClass";
import { User } from "../models/uerModel";
const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (!id) return next(new ErrorHandler(`Not Logged In`, 401));
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("Unauthorized Access", 401));
    if (user.role !== "admin")
      return next(new ErrorHandler("Not authorized User", 401));
    next();
  }
);

module.exports = isAdmin;
