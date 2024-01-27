"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateCache = void 0;
const productModel_1 = require("../models/productModel");
const server_1 = require("../server");
const invalidateCache = async ({ product, order, admin, }) => {
    if (product) {
        const productKeys = [
            "all-product",
            "latest-product",
            "all-category",
        ];
        const productId = await productModel_1.Product.find({}).select("_id");
        productId.forEach((i) => {
            productKeys.push(`product-${i._id}`);
        });
        server_1.myCache.del(productKeys);
    }
    if (order) {
    }
    if (admin) {
    }
};
exports.invalidateCache = invalidateCache;
