import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api.js';
import { useAuth } from '../AuthContext.jsx';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { saveSession } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      saveSession(data);
      navigate('/templates');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} className="w-full border rounded p-2" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} className="w-full border rounded p-2" required />
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Login</button>
      </form>
      <p className="text-sm mt-4 text-gray-600">New here? <Link to="/register" className="text-indigo-600">Register</Link></p>
    </div>
  );
}
