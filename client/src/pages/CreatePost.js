import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const CreatePost = () => {
  const [form, setForm] = useState({ content: '', image: '' });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large (max 5MB)');
      return;
    }

    const data = new FormData();
    data.append('image', file);

    try {
      setUploading(true);
      const res = await api.post('/upload', data);
      setForm({ ...form, image: res.data.imageUrl });
    } catch {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    if (!userId) return alert('Please log in first.');

    try {
      await api.post('/posts', { ...form, userId });
      alert('Post created!');
      navigate('/feed');
    } catch {
      alert('Failed to create post');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Create Post</h2>
        <textarea
          name="content"
          rows="4"
          onChange={handleChange}
          placeholder="What's on your mind?"
          required
        />
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {uploading && <Spinner />}
        {form.image && <img src={form.image} alt="preview" className="post-image" />}
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
