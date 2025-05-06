import { RequestHandler } from "express";
import { v2 as cloudinary } from "cloudinary";
import { unlink } from "fs/promises";
import { ctrlWrapper } from "decorators";
import { HttpError } from "helpers";
import Blog from "models/Blog";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const getBlogs: RequestHandler = async (_, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

const getBlogById: RequestHandler = async (req, res) => {
  const { blogId } = req.params;

  const blog = await Blog.find({ _id: blogId });
  if (!blog) {
    throw HttpError(404, "Not found");
  }

  res.json(blog);
};
