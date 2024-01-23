"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = require("./../models/productModel");
const utilityClass_1 = __importDefault(require("../utils/utilityClass"));
const fs_1 = require("fs");
const asyncHandler = require("express-async-handler");
const getProduct = asyncHandler(async (req, res, next) => {
    try {
        const allProducts = await productModel_1.Product.find({});
        res.status(201).json({
            success: true,
            allProducts,
        });
    }
    catch (error) {
        next(error);
    }
});
const createProduct = asyncHandler(async (req, res, next) => {
    try {
        const { name, price, stock, category } = req.body;
        const photo = req.file;
        if (!photo)
            return next(new utilityClass_1.default("Please Select a Photo", 400));
        if (!name || !price || !stock || !category) {
            (0, fs_1.rm)(photo.path, () => {
                console.log("Deleted");
            });
            return next(new utilityClass_1.default("Add all field", 400));
        }
        const product = await productModel_1.Product.create({
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
    }
    catch (error) {
        next(error);
    }
});
const latestProducts = asyncHandler(async (req, res, next) => {
    try {
        const latestProduct = await productModel_1.Product.find({})
            .sort({ createdAt: -1 })
            .limit(5);
        return res.status(200).json({
            success: true,
            latestProduct,
        });
    }
    catch (error) {
        next(error);
    }
});
const productCategories = asyncHandler(async (req, res, next) => {
    try {
        const allCategories = await productModel_1.Product.distinct("category");
        return res.status(200).json({
            success: true,
            allCategories,
        });
    }
    catch (error) {
        next(error);
    }
});
const singleProduct = asyncHandler(async (req, res, next) => {
    try {
        const singleProduct = await productModel_1.Product.findById(req.params.id);
        return res.status(200).json({
            success: true,
            singleProduct,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateProduct = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price, stock, category } = req.body;
        const photo = req.file;
        const product = await productModel_1.Product.findById(id);
        if (!product)
            return next(new utilityClass_1.default("Product Don't Exist", 404));
        if (photo) {
            (0, fs_1.rm)(product.photo, () => {
                console.log("Old photo deleted");
            });
            product.photo = photo.path;
        }
        if (name)
            product.name = name;
        if (price)
            product.price = price;
        if (stock)
            product.stock = stock;
        if (category)
            product.category = category;
        await product.save({});
        return res.status(200).json({
            success: true,
            product,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteProduct = asyncHandler(async (req, res, next) => {
    try {
        const product = await productModel_1.Product.findById(req.params.id);
        if (!product) {
            return next(new utilityClass_1.default("Product don't exist", 404));
        }
        if (product) {
            (0, fs_1.rm)(product.photo, () => {
                console.log("Deleted Photo");
            });
        }
        await product?.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Deleted Product Success",
        });
    }
    catch (error) {
        next(error);
    }
});
module.exports = {
    getProduct,
    createProduct,
    latestProducts,
    productCategories,
    singleProduct,
    updateProduct,
    deleteProduct,
};