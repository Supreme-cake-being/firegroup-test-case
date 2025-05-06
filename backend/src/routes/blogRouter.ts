import express from "express";
import blogController from "controllers/blogController";
import { isEmptyBody, isValidId, upload } from "middlewares";
import { validateBody } from "decorators";
import { blogCreateSchema, blogUpdateSchema } from "models/Blog";

const blogRouter = express.Router();

blogRouter.get("/", blogController.getBlogs);

blogRouter.get("/:blogId", isValidId("blogId"), blogController.getBlogById);

blogRouter.post(
  "/",
  upload.single("image"),
  isEmptyBody,
  validateBody(blogCreateSchema),
  blogController.createBlog
);
