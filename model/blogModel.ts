import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

export  const Blog = mongoose.model("Blog", blogSchema);
