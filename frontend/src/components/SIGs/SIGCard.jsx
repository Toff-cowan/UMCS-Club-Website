export default function SIGCard({ name, description, icon }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
      {icon && (
        <img 
          src={icon} 
          alt={name} 
          className="w-16 h-16 mb-4 object-contain"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.style.display = 'none';
          }}
        />
      )}
      <h3 className="text-xl font-bold mb-2 text-gray-800">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

