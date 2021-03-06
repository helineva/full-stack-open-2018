const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!('title' in body)) {
    return response.status(400).json({ error: 'title missing' });
  }

  if (!('url' in body)) {
    return response.status(400).json({ error: 'url missing' });
  }

  if (!('likes' in body)) {
    body['likes'] = 0;
  }

  const blog = new Blog(body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
