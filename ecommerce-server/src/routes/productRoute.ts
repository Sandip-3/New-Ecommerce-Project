const express = require("express");
import { NextFunction, Request, Response } from "express";
import { singleUpload } from "../middlewares/multer";
const isAdmin = require("../middlewares/authMiddleware");
const {
  getProduct,
  createProduct,
  productCategories,
  latestProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
  searchAllProduct,
} = require("../controllers/productController");

const route = express.Router();

route.get("/allproduct", isAdmin, getProduct);
route.post("/createproduct", isAdmin, singleUpload, createProduct);
route.get("/latest", latestProducts);
route.get("/category", productCategories);
route.get('/all' , searchAllProduct)
route
  .route("/:id")
  .get(singleProduct)
  .put(isAdmin, singleUpload, updateProduct)
  .delete(isAdmin, deleteProduct);

module.exports = route;
