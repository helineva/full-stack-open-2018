const Blog = require('../models/blog.js');

const getBlogs = () => ( Blog.find({}) );

module.exports = {
  getBlogs
};
