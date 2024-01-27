import { myCache } from "./../server";
import { BaseQuery, NewProductRequestBody, SearchData } from "./../types/type";
import { NextFunction, Request, Response } from "express";
import { Product } from "./../models/productModel";
import ErrorHandler from "../utils/utilityClass";
import { rm } from "fs";
import { invalidateCache } from "../utils/Revalidate";
const asyncHandler = require("express-async-handler");

const getProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let allProducts;
      if (myCache.has("all-product")) {
        allProducts = JSON.parse(myCache.get("all-product")!);
      } else {
        allProducts = await Product.find({});
        myCache.set("all-product", JSON.stringify(allProducts));
      }
      res.status(201).json({
        success: true,
        allProducts,
      });
    } catch (error) {
      next(error);
    }
  }
);

const searchAllProduct = asyncHandler(
  async (
    req: Request<{}, {}, {}, SearchData>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { search, price, category, sort } = req.query;
      const page = Number(req.query.page) || 1;
      const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
      const skip = (page - 1) * limit;

      const baseQuery: BaseQuery = {};

      if (search) {
        baseQuery.name = {
          $regex: search,
          $options: "i",
        };
      }

      if (price) {
        baseQuery.price = {
          $lte: Number(price),
        };
      }
      if (category) {
        baseQuery.category = category;
      }

      const searchProduct = Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip);

      const [searchedProduct, filterProducts] = await Promise.all([
        searchProduct,
        Product.find(baseQuery),
      ]);

      const totalPage = Math.ceil(filterProducts.length / 8);
      res.status(201).json({
        success: true,
        searchedProduct,
        totalPage,
      });
    } catch (error) {
      next(error);
    }
  }
);

const createProduct = asyncHandler(
  async (
    req: Request<{}, {}, NewProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, price, stock, category } = req.body;
      const photo = req.file;
      if (!photo) return next(new ErrorHandler("Please Select a Photo", 400));
      if (!name || !price || !stock || !category) {
        rm(photo.path, () => {
          console.log("Deleted");
        });
        return next(new ErrorHandler("Add all field", 400));
      }
      const product = await Product.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photo: photo?.path,
      });
      await invalidateCache({ product: true });
      return res.status(201).json({
        success: true,
        product: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

const latestProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let latestProduct;
      if (myCache.has("latest-product")) {
        latestProduct = JSON.parse(myCache.get("latest-product")!);
      } else {
        myCache.set("latest-product", JSON.stringify(latestProduct));
      }
      return res.status(200).json({
        success: true,
        latestProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

const productCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let allCategories;
      if (myCache.has("all-category")) {
        allCategories = JSON.parse(myCache.get("all-category")!);
      } else {
        allCategories = await Product.distinct("category");
        myCache.set("all-category", JSON.stringify(allCategories));
      }

      return res.status(200).json({
        success: true,
        allCategories,
      });
    } catch (error) {
      next(error);
    }
  }
);

const singleProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      let singleProduct;
      if (myCache.has(`product-${id}`)) {
        singleProduct = JSON.parse(myCache.get(`product-${id}`)!);
      } else {
        singleProduct = await Product.findById(id);
        myCache.set(`product-${id}`, JSON.stringify(singleProduct));
      }
      return res.status(200).json({
        success: true,
        singleProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

const updateProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name, price, stock, category } = req.body;
      const photo = req.file;

      const product = await Product.findById(id);
      if (!product) return next(new ErrorHandler("Product Don't Exist", 404));

      if (photo) {
        rm(product.photo!, () => {
          console.log("Old photo deleted");
        });
        product.photo = photo.path;
      }
      if (name) product.name = name;
      if (price) product.price = price;
      if (stock) product.stock = stock;
      if (category) product.category = category;

      await product.save();
      await invalidateCache({ product: true });
      return res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
);

const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return next(new ErrorHandler("Product don't exist", 404));
      }
      if (product) {
        rm(product.photo!, () => {
          console.log("Deleted Photo");
        });
      }
      await product?.deleteOne();
      await invalidateCache({ product: true });
      return res.status(200).json({
        success: true,
        message: "Deleted Product Success",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = {
  getProduct,
  createProduct,
  latestProducts,
  productCategories,
  singleProduct,
  updateProduct,
  deleteProduct,
  searchAllProduct,
};
