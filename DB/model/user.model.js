import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: Number,
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male",
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    profilePic: String,
    coverPic: Array,
    phone: {
      type: String,
    },
    role:{
      type:String,
      enum:["User","Admin"],
      default:"User"
    }
  },
  { timestamps: true }
);
export const userModel = model("user", userSchema);
