import { NewUserRequestBody } from "./../types/type";
import { User } from "../models/uerModel";
import express, { NextFunction, Request, Response, response } from "express";
import { Jwt as jwt } from "jsonwebtoken";
import ErrorHandler from "../utils/utilityClass";
import { error } from "console";
const asyncHandler = require("express-async-handler");

const getAllUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allUser = await User.find();
      return res.status(200).json({ success: true, users: allUser });
    } catch (error) {
      next(error);
    }
  }
);

const createUser = asyncHandler(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, email, photo, _id, dob, role } = req.body;
      let user = await User.findById(_id);
      if (user) {
        res.status(201).json(user);
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

const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (user) {
        return res.status(201).json({
          success: true,
          user: user,
        });
      } else {
        next(new ErrorHandler("No user Found", 404));
      }
    } catch (error) {
      next(error);
    }
  }
);

const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (user) {
        await user.deleteOne();
        return res
          .status(200)
          .json({ message: `Deleted User ID ${id}`, success: true });
      } else {
        next(new ErrorHandler("No user to delete", 400));
      }
    } catch {
      next(error);
    }
  }
);

module.exports = { getAllUser, createUser, getUser, deleteUser };
