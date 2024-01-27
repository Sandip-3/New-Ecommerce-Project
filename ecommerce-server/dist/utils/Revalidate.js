"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateCache = void 0;
const server_1 = require("../server");
const invalidateCache = async ({ product, order, admin, userId, orderId, productId, }) => {
    if (product) {
        const productKeys = [
            "all-product",
            "latest-product",
            "all-category",
        ];
        if (typeof productId === "string")
            productKeys.push(`product-${productId}`);
        if (typeof productId === "object")
            productId.forEach((i) => productKeys.push(`product-${i}`));
        server_1.myCache.del(productKeys);
    }
    if (order) {
        const orderkeys = [
            "orders",
            `user-orders-${userId}`,
            `order-${orderId}`,
        ];
        server_1.myCache.del(orderkeys);
    }
    if (admin) {
    }
};
exports.invalidateCache = invalidateCache;
