import { model, models, Schema } from "mongoose";

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, default: "" },
    image: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    readTime: { type: String, default: "5 min read" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const BlogPostModel = models.BlogPost || model("BlogPost", BlogPostSchema);
export default BlogPostModel;
