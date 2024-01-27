import { Product } from "../models/productModel";
import { myCache } from "../server";
import { InvalidateCacheProps } from "../types/type";

export const invalidateCache = async ({
  product,
  order,
  admin,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "all-product",
      "latest-product",
      "all-category",
    ];
    const productId = await Product.find({}).select("_id");
    productId.forEach((i) => {
      productKeys.push(`product-${i._id}`);
    });
    myCache.del(productKeys);
  }
  if (order) {
  }
  if (admin) {
  }
};
