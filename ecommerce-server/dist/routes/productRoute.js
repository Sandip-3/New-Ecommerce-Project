"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const multer_1 = require("../middlewares/multer");
const isAdmin = require("../middlewares/authMiddleware");
const { getProduct, createProduct, productCategories, latestProducts, singleProduct, updateProduct, deleteProduct, searchAllProduct, } = require("../controllers/productController");
const route = express.Router();
route.get("/allproduct", isAdmin, getProduct);
route.post("/createproduct", isAdmin, multer_1.singleUpload, createProduct);
route.get("/latest", latestProducts);
route.get("/category", productCategories);
route.get('/all', searchAllProduct);
route
    .route("/:id")
    .get(singleProduct)
    .put(isAdmin, multer_1.singleUpload, updateProduct)
    .delete(isAdmin, deleteProduct);
module.exports = route;
