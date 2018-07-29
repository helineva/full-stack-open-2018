const Blog = require('../models/blog.js');
const User = require('../models/user.js');

const getBlogs = () => ( Blog.find({}) );

const getUsers = () => ( User.find({}) );

module.exports = {
  getBlogs,
  getUsers
};
