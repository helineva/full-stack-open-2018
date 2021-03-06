const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    url: String,
    likes: Number
  }
);

blogSchema.statics.formatNoId = function(blog) {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  };
};

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
