import React, { useState } from 'react';
import api from '../api';
import Spinner from '../components/Spinner';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/signup', form);
      alert('Signup successful. You can now log in.');
    } catch (err) {
      alert(err.response.data.error || 'Signup failed');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container">
       {loading ? <Spinner /> : (
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input name="name" onChange={handleChange} placeholder="Name" required />
        <input name="email" onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
       )}
    </div>
  );
};

export default Signup;
