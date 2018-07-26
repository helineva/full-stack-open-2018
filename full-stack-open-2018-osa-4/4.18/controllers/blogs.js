const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');
const User = require('../models/user.js');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}, { __v: 0 })
    .populate('user', { _id: 1, username: 1, name: 1 });
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

  const user = await User.findOne({});
  body.user = user['_id'];

  const blog = new Blog(body);
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  try {
    await Blog.findByIdAndRemove(id);

    response.status(204).end();
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'malformed id' });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  try {
    const newBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    response.json(newBlog);
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'malformed id' });
  }
});

module.exports = blogsRouter;
