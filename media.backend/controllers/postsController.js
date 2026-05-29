const Post = require("../model/post");

exports.createPost = async (req, res, next) => {
    console.log('Received request body:', req.body); // Debugging line to check the request body
    const { userId, title, body, reactions, tags } = req.body;
    const newPost = new Post({
        userId,
        title,
        body,
        reactions,
        tags
    });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
};

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

exports.deletePost = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedItem = await Post.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(deletedItem);
    } catch (error) {
        next(error);
    }
};
