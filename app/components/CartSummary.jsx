// app/components/CartSummary.jsx
export default function CartSummary({ cartItems }) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-bold">Keranjang</h2>
      <p className="mt-2">Item: {totalItems}</p>
      <p className="text-lg font-semibold">Total: Rp {totalPrice.toLocaleString()}</p>
      
      {totalItems > 0 && (
        <button className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Bayar Sekarang
        </button>
      )}
    </div>
  );
}