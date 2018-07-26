const supertest = require('supertest');
const { app, server } = require('../index.js');
const api = supertest(app);
const Blog = require('../models/blog.js');
const blogData = require('./blog_data.js');

beforeAll(async () => {
  await Blog.remove({});

  const blogObjects = blogData.blogList.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe('GET request to /api/blogs', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs');

    expect(response.body.length).toBe(blogData.blogList.length);
  });

  test('a specific blog is included in the returned blogs', async () => {
    const response = await api
      .get('/api/blogs');

    expect(response.body).toContainEqual(blogData.blogList[0]);
  });
});

describe('POST request to /api/blogs', () => {
  test('a valid blog can be added', async () => {
    await api
      .post('/api/blogs')
      .send(blogData.validBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api
      .get('/api/blogs');

    const blogs = response.body;
    expect(blogs.length).toBe(blogData.blogList.length + 1);

    const blogsFormatted = blogs.map(Blog.formatNoId);
    expect(blogsFormatted).toContainEqual(blogData.validBlog);
  });

  test('likes will be defaulted to zero', async () => {
    const response = await api
      .post('/api/blogs')
      .send(blogData.blogNoLikes);

    const blog = response.body;
    expect(blog.likes).toBe(0);
  });

  test('blog with no title will be responded with code 400', async () => {
    await api
      .post('/api/blogs')
      .send(blogData.blogNoTitle)
      .expect(400);
  });

  test('blog with no url will be responded with code 400', async () => {
    await api
      .post('/api/blogs')
      .send(blogData.blogNoUrl)
      .expect(400);
  });
});

afterAll(() => {
  server.close();
});
