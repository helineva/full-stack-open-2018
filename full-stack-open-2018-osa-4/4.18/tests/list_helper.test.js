const totalLikes = require('../utils/list_helper.js').totalLikes;
const favoriteBlog = require('../utils/list_helper.js').favoriteBlog;
const mostBlogs = require('../utils/list_helper.js').mostBlogs;
const mostLikes = require('../utils/list_helper.js').mostLikes;
const blogData = require('./blog_data.js');

describe('total likes', () => {
  test('of an empty list is zero', () => {
    expect(totalLikes(blogData.emptyList)).toBe(0);
  });

  test('of a list with one blog equals the likes of the blog', () => {
    expect(totalLikes(blogData.oneBlogList)).toBe(5);
  });

  test('of a bigger list is calculated correctly', () => {
    expect(totalLikes(blogData.blogList)).toBe(36);
  });

});

describe('favorite blog', () => {
  test('of an empty list is null', () => {
    expect(favoriteBlog(blogData.emptyList)).toBe(null);
  });

  test('of a list with one blog is the blog', () => {
    expect(favoriteBlog(blogData.oneBlogList)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    });
  });

  test('of a bigger list is calculated correctly', () => {
    expect(favoriteBlog(blogData.blogList)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    });
  });
});

describe('author with most blogs', () => {
  test('of an empty list is null', () => {
    expect(mostBlogs(blogData.emptyList)).toBe(null);
  });

  test('of a list with one blog is the author of the blog', () => {
    expect(mostBlogs(blogData.oneBlogList)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    });
  });

  test('of a bigger list is calculated correctly', () => {
    expect(mostBlogs(blogData.blogList)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    });
  });
});

describe('author with most likes', () => {
  test('of an empty list is null', () => {
    expect(mostLikes(blogData.emptyList)).toBe(null);
  });

  test('of a list with one blog is the author of the blog', () => {
    expect(mostLikes(blogData.oneBlogList)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    });
  });

  test('of a bigger list is calculated correctly', () => {
    expect(mostLikes(blogData.blogList)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });
});
