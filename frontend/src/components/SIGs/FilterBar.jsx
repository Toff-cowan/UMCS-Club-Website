export default function FilterBar({ categories, active, setActive }) {
  return (
    <div className="flex justify-center gap-4 mb-8 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200
            ${active === cat 
              ? "bg-blue-600 text-white shadow-md" 
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

