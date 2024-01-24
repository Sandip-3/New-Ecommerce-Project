"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myCache = void 0;
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./utils/Connect");
const errorMiddleware = require("./middlewares/errorMiddleware");
const node_cache_1 = __importDefault(require("node-cache"));
dotenv.config();
const app = express();
connect();
exports.myCache = new node_cache_1.default();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", require("./routes/userRoute"));
app.use("/product", require("./routes/productRoute"));
app.use("/src/uploads", express.static("src/uploads"));
app.use(errorMiddleware);
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server Running in http://localhost:${PORT}`);
});
