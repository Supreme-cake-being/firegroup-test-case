import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

const errorMessages = {
  "string.base": "{#label} must be a string",
  "string.empty": "{#label} cannot be empty",
  "any.required": "{#label} is required",
};

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    text: {
      type: String,
      required: [true, "Text is required"],
    },
    image: {
      url: { type: String },
      publicId: { type: String },
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

blogSchema.post("save", handleSaveError);

blogSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

blogSchema.post("findOneAndUpdate", handleSaveError);

export const blogCreateSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  image: Joi.object({
    url: Joi.string().uri().required(),
    publicId: Joi.string().required(),
  })
    .optional()
    .allow(null),
}).messages(errorMessages);

export const blogUpdateSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  image: Joi.object({
    url: Joi.string().uri().required(),
    publicId: Joi.string().required(),
  })
    .optional()
    .allow(null),
}).messages(errorMessages);

const Blog = model("blog", blogSchema);

export default Blog;
