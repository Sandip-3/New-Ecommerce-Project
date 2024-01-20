"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.default.Schema({
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
        validate: validator_1.default.default.isEmail,
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
}, { timestamps: true });
userSchema.virtual("age").get(function () {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
});
exports.User = mongoose_1.default.model("User", userSchema);
