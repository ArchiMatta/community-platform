import React, { useEffect, useState } from 'react';
import api from '../api';
import Spinner from '../components/Spinner';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts', err);
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (postId) => {
    try {
      await api.post(`/posts/${postId}/like`);
      fetchPosts(); // refresh feed after like
    } catch (err) {
      alert('Failed to like post');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="container">
      <h2>Feed</h2>
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to post!</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="post-card">
            <div className="post-header">
              <img src={post.userId?.profilePicture || 'https://via.placeholder.com/40'} alt="avatar" className="avatar" />
              <strong>{post.userId?.name || 'Anonymous'}</strong>
            </div>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="post" className="post-image" />}
            <button onClick={() => likePost(post._id)}>👏 {post.likes}</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
