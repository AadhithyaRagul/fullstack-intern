import { useEffect, useState } from 'react';
import api from '../api.js';
import TemplateCard from '../components/TemplateCard.jsx';

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/favorites').then((r) => setItems(r.data)).finally(() => setLoading(false));
  }, []);

  const remove = async (t) => {
    await api.delete(`/favorites/${t.id}`);
    setItems((prev) => prev.filter((x) => x.id !== t.id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {loading ? <p>Loading...</p> : items.length === 0 ? <p className="text-gray-500">You have no favorites yet.</p> : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => <TemplateCard key={t.id} template={t} isFavorite onToggle={remove} />)}
        </div>
      )}
    </div>
  );
}
