const postsRouter = require("express").Router();
const Blog = require("../models/post");

postsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

postsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});
postsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

postsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

postsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const post = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedPost = await Blog.findByIdAndUpdate(request.params.id, post, {
    new: true,
  });
  if (updatedPost) {
    response.json(updatedPost);
  } else {
    (err) => console.log(err);
  }
});

module.exports = postsRouter;