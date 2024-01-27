"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderModel_1 = require("../models/orderModel");
const StockReducer_1 = require("../utils/StockReducer");
const Revalidate_1 = require("../utils/Revalidate");
const server_1 = require("../server");
const utilityClass_1 = __importDefault(require("../utils/utilityClass"));
const asyncHandler = require("express-async-handler");
const getAllOrder = asyncHandler(async (req, res, next) => {
    try {
        let getOrders;
        if (server_1.myCache.has("orders")) {
            getOrders = JSON.parse(server_1.myCache.get("orders"));
        }
        else {
            getOrders = await orderModel_1.Order.find({}).populate("user", "name");
            server_1.myCache.set("orders", JSON.stringify(getOrders));
        }
        res.status(201).json({
            success: true,
            getOrders,
        });
    }
    catch (error) {
        next(error);
    }
});
const createOrder = asyncHandler(async (req, res, next) => {
    try {
        const { shippingInfo, orderItems, user, discount, tax, subTotal, total, shippingCharge, } = req.body;
        if (!shippingInfo || !orderItems || !user || !subTotal || !total) {
            return next(new utilityClass_1.default("Please Provide Required Details", 400));
        }
        const order = await orderModel_1.Order.create({
            shippingInfo,
            orderItems,
            user,
            discount,
            tax,
            subTotal,
            total,
            shippingCharge,
        });
        await (0, StockReducer_1.reduceStock)(orderItems);
        await (0, Revalidate_1.invalidateCache)({
            product: true,
            order: true,
            admin: true,
            userId: user,
            productId: order.orderItems.map((i) => String(i.productId)),
        });
        res.status(201).json({
            success: true,
            order,
        });
    }
    catch (error) {
        next(error);
    }
});
const userOrder = asyncHandler(async (req, res, next) => {
    const { id: user } = req.query;
    let userOrders;
    if (server_1.myCache.has(`user-orders-${user}`)) {
        userOrders = JSON.parse(server_1.myCache.get(`user-orders-${user}`));
    }
    else {
        userOrders = await orderModel_1.Order.find({ user });
        server_1.myCache.set(`user-orders-${user}`, JSON.stringify(userOrders));
    }
    res.status(201).json({
        success: true,
        message: "Your Orders",
        userOrders,
    });
});
const singleOrder = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    let singleOrder;
    if (server_1.myCache.has(`order-${id}`)) {
        singleOrder = JSON.parse(server_1.myCache.get(`order-${id}`));
    }
    else {
        singleOrder = await orderModel_1.Order.findById(id).populate("user", "name");
        if (!singleOrder)
            return next(new utilityClass_1.default("Invalid Order", 404));
        server_1.myCache.set(`order-${id}`, JSON.stringify(singleOrder));
    }
    res.status(201).json({
        success: true,
        message: "Single Orders",
        singleOrder,
    });
});
const processOrder = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await orderModel_1.Order.findById(id);
        if (!order)
            return next(new utilityClass_1.default("Order not found", 404));
        switch (order.status) {
            case "Processing":
                order.status = "Shipped";
                break;
            case "Shipped":
                order.status = "Delivered";
                break;
            default:
                order.status = "Delivered";
                break;
        }
        await order.save();
        await (0, Revalidate_1.invalidateCache)({
            product: false,
            order: true,
            admin: true,
            userId: order?.user,
            orderId: String(order?._id),
        });
        res.status(201).json({
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteOrder = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await orderModel_1.Order.findById(id);
        await order?.deleteOne();
        await (0, Revalidate_1.invalidateCache)({
            product: false,
            order: true,
            admin: true,
            userId: order?.user,
            orderId: String(order?._id),
        });
        res.status(201).json({
            success: true,
            message: "Order Deleted",
        });
    }
    catch (error) {
        next(error);
    }
});
module.exports = {
    getAllOrder,
    createOrder,
    userOrder,
    singleOrder,
    processOrder,
    deleteOrder,
};
