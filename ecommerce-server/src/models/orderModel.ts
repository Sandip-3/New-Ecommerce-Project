import mongoose, { Mongoose } from "mongoose";
import { Product } from "./productModel";
import { User } from "./uerModel";

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: [true, "Please Enter Address"],
      },
      city: {
        type: String,
        required: [true, "Please Enter City"],
      },
      country: {
        type: String,
        required: [true, "Please Enter Country"],
      },
      pinCode: {
        type: Number,
        required: [true, "Please Enter Pincode"],
      },
    },
    user: {
      type: String,
      ref: User,
      required: [true],
    },
    subTotal: {
      type: Number,
      required: [true],
    },
    tax: {
      type: Number,
      required: [true],
    },
    discount: {
      type: Number,
      required: [true],
    },
    shippingCharge: {
      type: Number,
      required: [true],
    },
    total: {
      type: Number,
      required: [true, "Please Enter Pincode"],
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },
    orderItems: [
      {
        name: String,
        photo: String,
        price: Number,
        quantity: Number,
        productId: {
          type: mongoose.Types.ObjectId,
          ref: Product,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
