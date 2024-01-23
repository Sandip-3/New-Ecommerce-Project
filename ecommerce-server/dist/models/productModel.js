"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
    },
    price: {
        type: Number,
        required: [true, "Priece is Required"],
    },
    stock: {
        type: Number,
        required: [true, "Stock is Required"],
    },
    category: {
        type: String,
        required: [true, "Category is Required"],
        trim: true,
    },
    photo: {
        type: String,
        required: [true, "Photo is Required"],
    },
}, { timestamps: true });
exports.Product = mongoose_1.default.model("Product", productSchema);
