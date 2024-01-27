"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { getAllOrder, createOrder, userOrder, singleOrder, processOrder, deleteOrder, } = require("../controllers/orderController");
const isAdmin = require("../middlewares/authMiddleware");
const route = express.Router();
route.get("/", isAdmin, getAllOrder);
route.get("/myorder", userOrder);
route.post("/createorder", createOrder);
route
    .route("/:id")
    .get(singleOrder)
    .put(isAdmin, processOrder)
    .delete(deleteOrder);
module.exports = route;
