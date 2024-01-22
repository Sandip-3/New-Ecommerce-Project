"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utilityClass_1 = __importDefault(require("../utils/utilityClass"));
const uerModel_1 = require("../models/uerModel");
const asyncHandler = require("express-async-handler");
const isAdmin = asyncHandler(async (req, res, next) => {
    const { id } = req.query;
    if (!id)
        return next(new utilityClass_1.default(`Not Logged In`, 401));
    const user = await uerModel_1.User.findById(id);
    if (!user)
        return next(new utilityClass_1.default("Unauthorized Access", 401));
    if (user.role !== "admin")
        return next(new utilityClass_1.default("Not authorized User", 401));
    next();
});
module.exports = isAdmin;
