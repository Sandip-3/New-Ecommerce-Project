import { NewProductRequestBody } from "./../types/type";
import { NextFunction, Request, Response } from "express";
import { Product } from "./../models/productModel";
import ErrorHandler from "../utils/utilityClass";
import { rm } from "fs";
const asyncHandler = require("express-async-handler");

const getProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allProducts = await Product.find({});
      res.status(201).json({
        success: true,
        allProducts,
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
      const latestProduct = await Product.find({})
        .sort({ createdAt: -1 })
        .limit(5);
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
      const allCategories = await Product.distinct("category");
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
      const singleProduct = await Product.findById(req.params.id);
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

      await product.save({});
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
};
