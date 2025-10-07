// app/components/MenuItem.jsx
export default function MenuItem({ item, onAddToCart }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <p className="text-gray-600 mt-1">{item.description}</p>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-lg font-bold text-green-600">
          Rp {item.price.toLocaleString()}
        </span>
        <button
          onClick={() => onAddToCart(item)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah
        </button>
      </div>
    </div>
  );
}