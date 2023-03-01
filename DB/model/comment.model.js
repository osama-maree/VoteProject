import { model, Schema, Types } from "mongoose";

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "user",
    },
    postId: {
      type: Types.ObjectId,
      required: true,
      ref: "post",
    },
  },
  { timestamps: true }
);
export const commentModel = model("comment", commentSchema);
