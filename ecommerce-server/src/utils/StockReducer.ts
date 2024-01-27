import { Product } from "../models/productModel";
import { OrderItemType } from "../types/type";
import ErrorHandler from "./utilityClass";

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new ErrorHandler("Product not found", 404);
    product.stock -= order.quantity;
    await product.save();
  }
};
