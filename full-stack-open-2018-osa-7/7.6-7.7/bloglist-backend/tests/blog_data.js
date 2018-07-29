const emptyList = [];

const oneBlogList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '5b3e30854db07c19d6e7fcf9',
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
    user: '5b3e30854db07c19d6e7fcf9',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '5b3e30854db07c19d6e7fcf9',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '5b3e30854db07c19d6e7fcf9',
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    likes: 10,
    user: '5b3e30854db07c19d6e7fcf9',
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '5b3e30854db07c19d6e7fcf9',
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '5b3e30854db07c19d6e7fcf9',
    __v: 0
  }
];

const validBlog = {
  title: 'Learn You a Haskell for Great Good!',
  author: 'Miran Lipovača',
  url: 'http://learnyouahaskell.com/introduction',
  likes: 8
};

const blogNoLikes = {
  title: 'This blog will not be liked',
  author: 'Unpopular Author',
  url: 'http://blogwithnolik.es'
};

const blogNoTitle = {
  author: 'B. Logger',
  url: 'http://blogwithnotit.le',
  likes: 4
};

const blogNoUrl = {
  title: 'My first blog',
  author: 'L. Bogger',
  likes: 2
};

module.exports = {
  emptyList,
  oneBlogList,
  blogList,
  validBlog,
  blogNoLikes,
  blogNoUrl,
  blogNoTitle
};
