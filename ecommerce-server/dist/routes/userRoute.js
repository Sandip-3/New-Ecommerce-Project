"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { getUser, createUser } = require("../controllers/userController");
const route = express.Router();
route.get("/", getUser);
route.post("/register", createUser);
module.exports = route;
