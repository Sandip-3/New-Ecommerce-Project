import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    price: {
      type: Number,
      required: [true, "Priece is Required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is Required"],
    },
    category: {
      type: String,
      required: [true, "Category is Required"],
      trim: true,
    },
    photo: {
      type: String,
      required: [true, "Photo is Required"],
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
