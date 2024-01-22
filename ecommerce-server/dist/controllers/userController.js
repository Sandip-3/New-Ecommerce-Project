"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uerModel_1 = require("../models/uerModel");
const utilityClass_1 = __importDefault(require("../utils/utilityClass"));
const console_1 = require("console");
const asyncHandler = require("express-async-handler");
const getAllUser = asyncHandler(async (req, res, next) => {
    try {
        const allUser = await uerModel_1.User.find();
        return res.status(200).json({ success: true, users: allUser });
    }
    catch (error) {
        next(error);
    }
});
const createUser = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, photo, _id, dob, role } = req.body;
        let user = await uerModel_1.User.findById(_id);
        if (user) {
            res.status(201).json(user);
        }
        if (!name || !email || !photo || !_id || !dob) {
            next(new utilityClass_1.default("All Field Input Required", 400));
        }
        user = await uerModel_1.User.create({
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
    }
    catch (error) {
        next(error);
    }
});
// const generateJsonWebToken = (id) => {
//   return jwt.sign();
// };
const getUser = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await uerModel_1.User.findById(id);
        if (user) {
            return res.status(201).json({
                success: true,
                user: user,
            });
        }
        else {
            next(new utilityClass_1.default("No user Found", 404));
        }
    }
    catch (error) {
        next(error);
    }
});
const deleteUser = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await uerModel_1.User.findById(id);
        if (user) {
            await user.deleteOne();
            return res
                .status(200)
                .json({ message: `Deleted User ID ${id}`, success: true });
        }
        else {
            next(new utilityClass_1.default("No user to delete", 400));
        }
    }
    catch {
        next(console_1.error);
    }
});
module.exports = { getAllUser, createUser, getUser, deleteUser };
