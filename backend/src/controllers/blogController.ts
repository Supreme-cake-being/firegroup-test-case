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

const createBlog: RequestHandler = async (req, res) => {
  const { title, text } = req.body;
  const file = req.file;

  let image = null;

  if (file) {
    const cloudImage = await cloudinary.uploader.upload(file.path, {
      folder: `blogs/${title.replace(/\s/g, "_")}_${Date.now()}`,
      transformation: [
        { width: 800, height: 800, crop: "limit" }, // Resize if too big
        { quality: "auto" }, // Auto-compression
        { fetch_format: "auto" }, // Convert to WebP/AVIF if supported
      ],
    });

    image = {
      url: cloudImage.secure_url,
      publicId: cloudImage.public_id,
    };

    await unlink(file.path);
  }

  const blog = await Blog.create({
    title,
    text,
    image, // optional
  });

  res.status(201).json(blog);
};

const deleteBlog: RequestHandler = async (req, res) => {
  const { blogId } = req.params;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw HttpError(404, "Not found");
  }

  if (blog.image?.publicId) {
    try {
      await cloudinary.uploader.destroy(blog.image.publicId); // image deletion

      const folderPath = blog.image.publicId.substring(
        0,
        blog.image.publicId.lastIndexOf("/")
      );
      await cloudinary.api.delete_folder(folderPath); // folder of the image deletion
    } catch (error) {
      console.error("Failed to delete Cloudinary image:", error);
    }
  }

  await Blog.findByIdAndDelete(blogId);

  res.json({ message: "Blog deleted" });
};

const updateBlog: RequestHandler = async (req, res) => {
  const { blogId } = req.params;
  const { title, text } = req.body;
  const file = req.file;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw HttpError(404, "Not found");
  }

  let image = blog.image;

  if (file) {
    if (blog.image?.publicId) {
      await cloudinary.uploader.destroy(blog.image.publicId); // delete prev image

      const folderPath = blog.image.publicId.substring(
        0,
        blog.image.publicId.lastIndexOf("/")
      );
      await cloudinary.api.delete_folder(folderPath); // folder of the image deletion
    }

    // upload new image
    const cloudImage = await cloudinary.uploader.upload(file.path, {
      folder: `blogs/${blog.title.replace(/\s/g, "_")}_${Date.now()}`,
      transformation: [
        { width: 800, height: 800, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });

    image = {
      url: cloudImage.secure_url,
      publicId: cloudImage.public_id,
    };

    await unlink(file.path);
  }

  const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
    title,
    text,
    image, // optional
  });

  res.json(updatedBlog);
};

export default {
  getBlogs: ctrlWrapper(getBlogs),
  getBlogById: ctrlWrapper(getBlogById),
  createBlog: ctrlWrapper(createBlog),
  deleteBlog: ctrlWrapper(deleteBlog),
  updateBlog: ctrlWrapper(updateBlog),
};
