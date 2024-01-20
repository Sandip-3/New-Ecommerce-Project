import { NewUserRequestBody } from "./../types/type";
import { User } from "../models/uerModel";
import express, { NextFunction, Request, Response } from "express";
import { Jwt as jwt } from "jsonwebtoken";
import ErrorHandler from "../utils/utilityClass";
const asyncHandler = require("express-async-handler");

const getUser = asyncHandler(
  async (req: Request<{}, {}, NewUserRequestBody>, res: Response) => {
    res.status(200).send({ message: "Get Method" });
  }
);

const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, photo, _id, dob, role } = req.body;
      let user = await User.findById(_id);
      if (user) {
        res.status(201).json({
          success: true,
          user: user,
        });
      }

      if (!name || !email || !photo || !_id || !dob) {
        next(new ErrorHandler("All Field Input Required", 400));
      }

      user = await User.create({
        name,
        email,
        photo,
        _id,
        dob,
        role,
      });
      return res.status(201).json({
        success: true,
        user: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

// const generateJsonWebToken = (id) => {
//   return jwt.sign();
// };

module.exports = { getUser, createUser };
