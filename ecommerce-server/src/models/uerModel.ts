import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "admin" | "user";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  age: number;
}

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "ID is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: [true, "Email already exist"],
      required: [true, "Email is required"],
      validate: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "Phot is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    dob: {
      type: Date,
      required: [true, "Date of Birth is required"],
    },
  },
  { timestamps: true }
);

userSchema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
});

export const User = mongoose.model<IUser>("User", userSchema);
 
