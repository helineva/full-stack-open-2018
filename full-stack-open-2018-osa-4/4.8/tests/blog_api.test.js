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

afterAll(() => {
  server.close();
});
