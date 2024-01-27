import { Order } from "../models/orderModel";
import { Product } from "../models/productModel";
import { myCache } from "../server";
import { InvalidateCacheProps } from "../types/type";

export const invalidateCache = async ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "all-product",
      "latest-product",
      "all-category",
      
    ];
    if(typeof productId === "string") productKeys.push(`product-${productId}`);
if(typeof productId === "object") productId.forEach((i) => productKeys.push(`product-${i}`));
    myCache.del(productKeys);
  }
  if (order) {
    const orderkeys: string[] = [
      "orders",
      `user-orders-${userId}`,
      `order-${orderId}`,
    ];
    myCache.del(orderkeys);
  }
  if (admin) {
  }
};
