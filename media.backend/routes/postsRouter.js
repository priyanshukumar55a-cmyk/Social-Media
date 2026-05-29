const express = require('express');
const postsRouter = express.Router();
const postsController = require('../controllers/postsController');

postsRouter.get('/', postsController.getAllPosts);
postsRouter.post('/', postsController.createPost);
postsRouter.delete('/:id', postsController.deletePost);

module.exports = postsRouter;