const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { userId, content, image } = req.body;
    const post = new Post({ userId, content, image });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('userId', 'name profilePicture');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json({ message: 'Post liked', likes: post.likes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like post' });
  }
};
