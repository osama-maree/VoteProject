import { model, Schema, Types } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      unique: true,
      required: true,
    },

    image: Array,
    phone: {
      type: String,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "user",
    },
    likes: [{ type: Types.ObjectId, ref: "user" }],
    unlike: [{ type: Types.ObjectId, ref: "user" }],
    commentsId: [{ type: Types.ObjectId, ref: "comment" }],
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

postSchema.post("findOneAndUpdate", async function () {
  let afterUpdate = await this.model.findOne({ _id: this.getQuery()._id });

  afterUpdate.count = afterUpdate.likes.length - afterUpdate.unlike.length;
  afterUpdate.save();
});
export const postModel = model("post", postSchema);
