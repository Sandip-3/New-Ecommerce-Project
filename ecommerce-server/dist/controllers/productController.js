"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./../server");
const productModel_1 = require("./../models/productModel");
const utilityClass_1 = __importDefault(require("../utils/utilityClass"));
const fs_1 = require("fs");
const Revalidate_1 = require("../utils/Revalidate");
const asyncHandler = require("express-async-handler");
const getProduct = asyncHandler(async (req, res, next) => {
    try {
        let allProducts;
        if (server_1.myCache.has("all-product")) {
            allProducts = JSON.parse(server_1.myCache.get("all-product"));
        }
        else {
            allProducts = await productModel_1.Product.find({});
            server_1.myCache.set("all-product", JSON.stringify(allProducts));
        }
        res.status(201).json({
            success: true,
            allProducts,
        });
    }
    catch (error) {
        next(error);
    }
});
const searchAllProduct = asyncHandler(async (req, res, next) => {
    try {
        const { search, price, category, sort } = req.query;
        const page = Number(req.query.page) || 1;
        const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
        const skip = (page - 1) * limit;
        const baseQuery = {};
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
        const searchProduct = productModel_1.Product.find(baseQuery)
            .sort(sort && { price: sort === "asc" ? 1 : -1 })
            .limit(limit)
            .skip(skip);
        const [searchedProduct, filterProducts] = await Promise.all([
            searchProduct,
            productModel_1.Product.find(baseQuery),
        ]);
        const totalPage = Math.ceil(filterProducts.length / 8);
        res.status(201).json({
            success: true,
            searchedProduct,
            totalPage,
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
        await (0, Revalidate_1.invalidateCache)({ product: true });
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
        let latestProduct;
        if (server_1.myCache.has("latest-product")) {
            latestProduct = JSON.parse(server_1.myCache.get("latest-product"));
        }
        else {
            server_1.myCache.set("latest-product", JSON.stringify(latestProduct));
        }
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
        let allCategories;
        if (server_1.myCache.has("all-category")) {
            allCategories = JSON.parse(server_1.myCache.get("all-category"));
        }
        else {
            allCategories = await productModel_1.Product.distinct("category");
            server_1.myCache.set("all-category", JSON.stringify(allCategories));
        }
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
        const id = req.params.id;
        let singleProduct;
        if (server_1.myCache.has(`product-${id}`)) {
            singleProduct = JSON.parse(server_1.myCache.get(`product-${id}`));
        }
        else {
            singleProduct = await productModel_1.Product.findById(id);
            server_1.myCache.set(`product-${id}`, JSON.stringify(singleProduct));
        }
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
        await product.save();
        await (0, Revalidate_1.invalidateCache)({ product: true });
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
        await (0, Revalidate_1.invalidateCache)({ product: true });
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
    searchAllProduct,
};
