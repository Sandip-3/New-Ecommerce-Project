"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceStock = void 0;
const productModel_1 = require("../models/productModel");
const utilityClass_1 = __importDefault(require("./utilityClass"));
const reduceStock = async (orderItems) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await productModel_1.Product.findById(order.productId);
        if (!product)
            throw new utilityClass_1.default("Product not found", 404);
        product.stock -= order.quantity;
        await product.save();
    }
};
exports.reduceStock = reduceStock;
