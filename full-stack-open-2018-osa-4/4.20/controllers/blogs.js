const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}, { __v: 0 })
    .populate('user', { _id: 1, username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  try {
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    if (!('title' in body)) {
      return response.status(400).json({ error: 'title missing' });
    }

    if (!('url' in body)) {
      return response.status(400).json({ error: 'url missing' });
    }

    const likes = 'likes' in body ? body['likes'] : 0;
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes,
      user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message });
    } else {
      console.log(exception);
      response.status(500).json({ error: 'there is a problem...' });
    }
  }
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
