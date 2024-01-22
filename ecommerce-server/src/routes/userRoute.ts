const express = require("express");
const {
  getAllUser,
  createUser,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const isAdmin = require("../middlewares/authMiddleware");

const route = express.Router();

route.get("/all", isAdmin, getAllUser);
route.post("/register", createUser);
route.get("/:id", getUser);
route.delete("/:id", isAdmin, deleteUser);

module.exports = route;
