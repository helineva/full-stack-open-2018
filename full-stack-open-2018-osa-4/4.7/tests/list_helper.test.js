const totalLikes = require('../utils/list_helper.js').totalLikes;
const favoriteBlog = require('../utils/list_helper.js').favoriteBlog;
const mostBlogs = require('../utils/list_helper.js').mostBlogs;
const mostLikes = require('../utils/list_helper.js').mostLikes;

const emptyList = [];
const oneBlogList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
];
const blogList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];

describe('total likes', () => {
  test('of an empty list is zero', () => {
    expect(totalLikes(emptyList)).toBe(0);
  });

  test('of a list with one blog equals the likes of the blog', () => {
    expect(totalLikes(oneBlogList)).toBe(5);
  });

  test('of a bigger list is calculated correctly', () => {
    expect(totalLikes(blogList)).toBe(36);
  });

});

describe('favorite blog', () => {
  test('of an empty list is null', () => {
    expect(favoriteBlog(emptyList)).toBe(null);
  });

  test('of a list with one blog is the blog', () => {
    expect(favoriteBlog(oneBlogList)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    });
  });

  test('of a bigger list is calculated correctly', () => {
    expect(favoriteBlog(blogList)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    });
  });
});

describe('author with most blogs', () => {
  test('of an empty list is null', () => {
    expect(mostBlogs(emptyList)).toBe(null);
  });

  test('of a list with one blog is the author of the blog', () => {
    expect(mostBlogs(oneBlogList)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    });
  });

  test('of a bigger list is calculated correctly', () => {
    expect(mostBlogs(blogList)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    });
  });
});

describe('author with most likes', () => {
  test('of an empty list is null', () => {
    expect(mostLikes(emptyList)).toBe(null);
  });

  test('of a list with one blog is the author of the blog', () => {
    expect(mostLikes(oneBlogList)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    });
  });

  test('of a bigger list is calculated correctly', () => {
    expect(mostLikes(blogList)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });
});