"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGO_URL);
        console.log(`Connected to Database ${conn.connection.host}`);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
module.exports = connectDB;
