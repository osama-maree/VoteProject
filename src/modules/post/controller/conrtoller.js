import { postModel } from "../../../../DB/model/post.model.js";
import cloudinary from "../../../services/cloudinary.js";
import { pagination } from "../../../services/pagination.js";

export const createPost = async (req, res) => {
  try {
    const { title, caption } = req.body;

    let paths = [];
    for (let i of req.files) {
      const { secure_url } = await cloudinary.uploader.upload(i.path, {
        folder: "vot",
      });
      paths.push(secure_url);
    }
    const post = await postModel.create({
      title,
      caption,
      userId: req.user._id,
      image: paths,
    });
    res.status(201).json({ message: "success" });
  } catch (err) {
    res.status(400).json({ error: "internal error" });
  }
};
export const getPost = async (req, res) => {
  try {
    const {page,size}=req.query
    const {limit,skip}=pagination(page,size)
    const posts = await postModel.find({}).limit(limit).skip(skip);
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: "internal error" });
  }
};
export const getcomments = async (req, res) => {
  try {
    const comments = await postModel.find({}).populate({
      path: "commentsId",
      populate: {
        path: "userId",
        select: "userName profilePic",
      },
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ error: "internal error" });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postModel.findOneAndUpdate(
      { _id: postId },
      {
        $addToSet: { likes: req.user._id },
        $pull: { unlike: req.user._id },
      },
      { new: true }
    );
    res.status(200).json({ message: "success", post });
  } catch (err) {
    res.status(400).json({ error: "internal error" });
  }
};
export const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postModel.findOneAndUpdate(
      { _id: postId },
      {
        $addToSet: { unlike: req.user._id },
        $pull: { likes: req.user._id },
      },
      { new: true }
    );
    res.status(200).json({ message: "success", post });
  } catch (err) {
    res.status(400).json({ error: "internal error" });
  }
};
