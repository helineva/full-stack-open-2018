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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
