import { NextFunction, Response, Request } from "express";
import { OrderRequestBody } from "../types/type";
import { Order } from "../models/orderModel";
import { reduceStock } from "../utils/StockReducer";
import { invalidateCache } from "../utils/Revalidate";
import { myCache } from "../server";
import ErrorHandler from "../utils/utilityClass";
const asyncHandler = require("express-async-handler");

const getAllOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let getOrders;
      if (myCache.has("orders")) {
        getOrders = JSON.parse(myCache.get("orders")!);
      } else {
        getOrders = await Order.find({}).populate("user", "name");
        myCache.set("orders", JSON.stringify(getOrders));
      }
      res.status(201).json({
        success: true,
        getOrders,
      });
    } catch (error) {
      next(error);
    }
  }
);

const createOrder = asyncHandler(
  async (
    req: Request<{}, {}, OrderRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        shippingInfo,
        orderItems,
        user,
        discount,
        tax,
        subTotal,
        total,
        shippingCharge,
      } = req.body;
      if (!shippingInfo || !orderItems || !user || !subTotal || !total) {
        return next(new ErrorHandler("Please Provide Required Details", 400));
      }

      const order = await Order.create({
        shippingInfo,
        orderItems,
        user,
        discount,
        tax,
        subTotal,
        total,
        shippingCharge,
      });

      await reduceStock(orderItems);
      await invalidateCache({
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
    } catch (error) {
      next(error);
    }
  }
);

const userOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: user } = req.query;

    let userOrders;
    if (myCache.has(`user-orders-${user}`)) {
      userOrders = JSON.parse(myCache.get(`user-orders-${user}`) as string);
    } else {
      userOrders = await Order.find({ user });
      myCache.set(`user-orders-${user}`, JSON.stringify(userOrders));
    }
    res.status(201).json({
      success: true,
      message: "Your Orders",
      userOrders,
    });
  }
);

const singleOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    let singleOrder;
    if (myCache.has(`order-${id}`)) {
      singleOrder = JSON.parse(myCache.get(`order-${id}`) as string);
    } else {
      singleOrder = await Order.findById(id).populate("user", "name");
      if (!singleOrder) return next(new ErrorHandler("Invalid Order", 404));
      myCache.set(`order-${id}`, JSON.stringify(singleOrder));
    }
    res.status(201).json({
      success: true,
      message: "Single Orders",
      singleOrder,
    });
  }
);

const processOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
      if (!order) return next(new ErrorHandler("Order not found", 404));
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
      await invalidateCache({
        product: false,
        order: true,
        admin: true,
        userId: order?.user!,
        orderId: String(order?._id!),
      });
      res.status(201).json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

const deleteOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);

      await order?.deleteOne();
      await invalidateCache({
        product: false,
        order: true,
        admin: true,
        userId: order?.user!,
        orderId: String(order?._id!),
      });
      res.status(201).json({
        success: true,
        message: "Order Deleted",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = {
  getAllOrder,
  createOrder,
  userOrder,
  singleOrder,
  processOrder,
  deleteOrder,
};
