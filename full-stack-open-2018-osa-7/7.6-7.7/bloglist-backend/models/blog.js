const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    url: String,
    likes: Number,
    comments: [String],
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }
);

blogSchema.statics.formatNoIdNoUser = function(blog) {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  };
};

blogSchema.statics.formatNoId = function(blog) {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user
  };
};

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
