// components/CartSummary.jsx
export default function CartSummary({
  cart,
  isOpen,
  onClose,
  onClearCart,
}) {
  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 md:items-center md:justify-center" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md max-h-[80vh] overflow-hidden rounded-t-2xl md:rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-[#E3E3E3] flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#313131]">Pesanan Saya</h2>
          <button
            onClick={onClose}
            className="text-[#5A5A5A] hover:text-[#313131]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[50vh]">
          {cart.length === 0 ? (
            <p className="text-[#5A5A5A] text-center py-8">Keranjang kosong</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <div className="font-medium text-[#313131]">{item.name}</div>
                    <div className="text-sm text-[#5A5A5A]">Rp {item.price.toLocaleString('id-ID')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#C67C4E]">{item.quantity}x</div>
                    <div className="text-[#C67C4E] font-bold">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-[#E3E3E3]">
            <div className="flex justify-between mb-3">
              <span className="text-[#5A5A5A]">Total ({totalItems} item)</span>
              <span className="font-bold text-[#C67C4E]">Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClearCart();
                }}
                className="flex-1 py-2.5 text-sm text-[#C67C4E] border border-[#C67C4E] rounded-lg hover:bg-[#F9F2ED] transition-colors"
              >
                Kosongkan
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex-1 bg-[#C67C4E] hover:bg-[#A0633E] text-white font-bold py-2.5 rounded-lg transition-colors"
              >
                Lanjut Bayar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}