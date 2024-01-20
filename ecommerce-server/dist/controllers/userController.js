"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uerModel_1 = require("../models/uerModel");
const utilityClass_1 = __importDefault(require("../utils/utilityClass"));
const asyncHandler = require("express-async-handler");
const getUser = asyncHandler(async (req, res) => {
    res.status(200).send({ message: "Get Method" });
});
const createUser = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, photo, _id, dob, role } = req.body;
        let user = await uerModel_1.User.findById(_id);
        if (user) {
            res.status(201).json({
                success: true,
                user: user,
            });
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
module.exports = { getUser, createUser };
