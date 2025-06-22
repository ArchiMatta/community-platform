import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Profile = () => {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    bio: '',
    profilePicture: ''
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const DEFAULT_AVATAR_URL = '/logo512.png'; 

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/users/${userId}`);
      const { name, bio, profilePicture } = res.data;
      setForm({
        name: name || '',
        bio: bio || '',
        profilePicture: profilePicture || ''
      });
    } catch (err) {
      alert('Failed to fetch profile');
      setForm(prevForm => ({ ...prevForm, profilePicture: DEFAULT_AVATAR_URL }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    } else {
      fetchProfile();
    }
  }, [userId, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${userId}`, form);
      alert('Profile updated!');
      fetchProfile();
    } catch (err) {
      alert('Failed to update profile');
      console.error('Profile update error:', err);
    }
  };

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
      setForm({ ...form, profilePicture: res.data.imageUrl });
      alert('Profile picture uploaded!');
    } catch (err) {
      console.error('Failed to upload image:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Your Profile</h2>
        {form.profilePicture ? (
          <img
            src={form.profilePicture}
            alt="Profile Preview"
            style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 16 }}
          />
        ) : (
          <img
            src={DEFAULT_AVATAR_URL} // Using the declared constant here
            alt="Default Avatar"
            style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 16 }}
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
        />
        {uploading && <p>Uploading profile picture...</p>}

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <textarea
          name="bio"
          rows="3"
          value={form.bio}
          onChange={handleChange}
          placeholder="Short bio"
        />
        <button type="submit" disabled={uploading}>Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;