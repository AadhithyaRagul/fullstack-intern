import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';
import { useAuth } from '../AuthContext.jsx';
import TemplateCard from '../components/TemplateCard.jsx';

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [favIds, setFavIds] = useState(new Set());
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get('/templates', { params: { search, category } })
      .then((r) => setTemplates(r.data))
      .finally(() => setLoading(false));
  }, [search, category]);

  useEffect(() => {
    if (!user) return setFavIds(new Set());
    api.get('/favorites').then((r) => setFavIds(new Set(r.data.map((t) => t.id)))).catch(() => {});
  }, [user]);

  const toggle = async (t) => {
    if (!user) return navigate('/login');
    const next = new Set(favIds);
    if (favIds.has(t.id)) { await api.delete(`/favorites/${t.id}`); next.delete(t.id); }
    else { await api.post(`/favorites/${t.id}`); next.add(t.id); }
    setFavIds(next);
  };

  const categories = ['Portfolio', 'Landing Page', 'Dashboard', 'E-commerce', 'Blog'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Templates</h1>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..." className="flex-1 border rounded p-2" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded p-2">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      {loading ? <p>Loading...</p> : templates.length === 0 ? <p className="text-gray-500">No templates found.</p> : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => <TemplateCard key={t.id} template={t} isFavorite={favIds.has(t.id)} onToggle={toggle} />)}
        </div>
      )}
    </div>
  );
}
