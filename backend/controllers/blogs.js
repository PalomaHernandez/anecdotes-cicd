const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user;

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ?? 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  const populatedBlog = await Blog.findById(savedBlog.id).populate('user', {
    username: 1,
    name: 1,
  });
  response.status(201).json(populatedBlog);
});

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blogToDelete = await Blog.findById(request.params.id);

    if (!blogToDelete) {
      return response.status(404).json({ error: 'blog not found' });
    }

    if (blogToDelete.user.toString() !== user._id.toString()) {
      return response
        .status(403)
        .json({ error: 'unauthorized to delete this blog' });
    }

    await blogToDelete.deleteOne();
    response.status(204).end();
  },
);

blogsRouter.patch(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blogToUpdate = await Blog.findById(request.params.id);

    if (!blogToUpdate) {
      return response.status(404).json({ error: 'blog not found' });
    }

    if (blogToUpdate.user.toString() !== user._id.toString()) {
      return response
        .status(403)
        .json({ error: 'unauthorized to update this blog' });
    }

    const updatedFields = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedFields,
      { new: true, runValidators: true, context: 'query' },
    ).populate('user', { username: 1, name: 1 });

    response.status(200).json(updatedBlog);
  },
);

blogsRouter.put(
  '/:id/like',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' });
    }

    blog.likes += 1;
    const updatedBlog = await blog.save();
    const populatedBlog = await Blog.findById(updatedBlog.id).populate('user', {
      username: 1,
      name: 1,
    });

    response.status(200).json(populatedBlog);
  },
);

blogsRouter.put('/:id/comments', async (request, response) => {
  const { id } = request.params;
  const { comment } = request.body;

  const blog = await Blog.findById(id);

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  blog.comments = [...blog.comments, comment];

  const savedBlog = await blog.save();

  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', {
    username: 1,
    name: 1,
  });

  response.status(200).json(populatedBlog);
});

module.exports = blogsRouter;
