"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productModel_1 = require("./productModel");
const uerModel_1 = require("./uerModel");
const orderSchema = new mongoose_1.default.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, "Please Enter Address"],
        },
        city: {
            type: String,
            required: [true, "Please Enter City"],
        },
        country: {
            type: String,
            required: [true, "Please Enter Country"],
        },
        pinCode: {
            type: Number,
            required: [true, "Please Enter Pincode"],
        },
    },
    user: {
        type: String,
        ref: uerModel_1.User,
        required: [true],
    },
    subTotal: {
        type: Number,
        required: [true],
    },
    tax: {
        type: Number,
        required: [true],
    },
    discount: {
        type: Number,
        required: [true],
    },
    shippingCharge: {
        type: Number,
        required: [true],
    },
    total: {
        type: Number,
        required: [true, "Please Enter Pincode"],
    },
    status: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered"],
        default: "Processing",
    },
    orderItems: [
        {
            name: String,
            photo: String,
            price: Number,
            quantity: Number,
            productId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: productModel_1.Product,
            },
        },
    ],
}, { timestamps: true });
exports.Order = mongoose_1.default.model("Order", orderSchema);
