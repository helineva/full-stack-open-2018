const supertest = require('supertest');
const { app, server } = require('../index.js');
const api = supertest(app);
const Blog = require('../models/blog.js');
const User = require('../models/user.js');
const blogData = require('./blog_data.js');
const userData = require('./user_data.js');
const { getBlogs } = require('./test_helper.js');

beforeAll( async () => {
  await User.remove({});
  await new User(userData.user).save();
});

describe('GET request to /api/blogs', () => {

  beforeEach(async () => {
    await Blog.remove({});

    const blogObjects = blogData.blogList.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const blogs = await getBlogs();

    expect(blogs.length).toBe(blogData.blogList.length);
  });

  test('a specific blog is included in the returned blogs', async () => {
    const blogs = await getBlogs();

    expect(blogs.map(blog => blog.title))
      .toContain(blogData.blogList[0].title);
  });
});

afterAll(() => {
  server.close();
});
