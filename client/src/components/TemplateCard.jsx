export default function TemplateCard({ template, isFavorite, onToggle }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col">
      <img src={template.thumbnail_url} alt={template.name} className="h-44 w-full object-cover" loading="lazy" />
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs uppercase tracking-wide text-indigo-500">{template.category}</span>
        <h3 className="text-lg font-semibold mt-1">{template.name}</h3>
        <p className="text-sm text-gray-600 mt-1 flex-1">{template.description}</p>
        <button
          onClick={() => onToggle(template)}
          className={`mt-4 w-full py-2 rounded-lg text-sm font-medium transition ${
            isFavorite ? 'bg-pink-100 text-pink-600 hover:bg-pink-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isFavorite ? '♥ Favorited (click to remove)' : '♡ Favorite'}
        </button>
      </div>
    </div>
  );
}
