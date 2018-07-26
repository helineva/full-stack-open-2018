const dummy = (blogs) => (1);

const totalLikes = (blogs) => (
  blogs.reduce((sum, blog) => (sum + blog.likes), 0)
);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let favBlog = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > favBlog.likes) {
      favBlog = blog;
    }
  });

  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const authors = {};
  blogs.forEach(blog => {
    if (blog.author in authors) {
      authors[blog.author]++;
    } else {
      authors[blog.author] = 1;
    }
  });

  const result = {
    author: null,
    blogs: 0
  };

  for (let author in authors) {
    if (authors[author] > result['blogs']) {
      result['author'] = author;
      result['blogs'] = authors[author];
    }
  }

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
