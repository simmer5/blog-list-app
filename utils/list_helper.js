// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blogs) => {
        return sum + blogs.likes;
      }, 0);
};

const favoriteBlog = (blogs) => {
  const bestBlog = blogs.reduce((prev, curr) => {
    return prev.likes >= curr.likes ? prev : curr;
  });
  return bestBlog;
};

module.exports = { dummy, totalLikes, favoriteBlog };
