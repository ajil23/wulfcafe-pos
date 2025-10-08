interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartSummaryProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onClearCart: () => void;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
}

export default function CartSummary({
  cart,
  isOpen,
  onClose,
  onClearCart,
  onUpdateQuantity,
}: CartSummaryProps) {
  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProceedToCheckout = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = '/checkout';
  };

  const handleClearCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClearCart();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 md:items-center md:justify-center" onClick={onClose}>
      <div
        className="bg-white w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-t-3xl md:rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#E3E3E3] flex justify-between items-center bg-[#F9F2ED]">
          <h2 className="text-xl font-bold text-[#313131] md:text-2xl">Pesanan Saya</h2>
          <button
            onClick={onClose}
            className="text-[#5A5A5A] hover:text-[#313131] p-2 hover:bg-white rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-[#5A5A5A] text-lg md:text-xl">Keranjang kosong</p>
              <p className="text-[#A0A0A0] text-sm mt-2 md:text-base">Tambahkan menu favoritmu</p>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-5">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center gap-4 p-4 rounded-xl bg-[#F9F2ED] hover:bg-[#EDD6C8] transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#313131] text-base md:text-lg truncate">{item.name}</div>
                    <div className="text-sm text-[#5A5A5A] md:text-base">Rp {item.price.toLocaleString('id-ID')}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-[#E3E3E3] rounded-full bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-[#313131] hover:bg-[#F9F2ED] rounded-l-full transition-colors md:w-10 md:h-10"
                        aria-label={`Kurangi ${item.name}`}
                      >
                        <span className="text-base font-bold md:text-lg">−</span>
                      </button>
                      <span className="px-3 font-bold text-[#313131] min-w-[2rem] text-center text-sm md:text-base md:min-w-[2.5rem]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-[#313131] hover:bg-[#F9F2ED] rounded-r-full transition-colors md:w-10 md:h-10"
                        aria-label={`Tambah ${item.name}`}
                      >
                        <span className="text-base font-bold md:text-lg">+</span>
                      </button>
                    </div>
                    <div className="text-right min-w-[90px] md:min-w-[100px]">
                      <div className="text-[#C67C4E] font-bold text-base md:text-lg">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E3E3E3] bg-white">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-[#5A5A5A] text-sm md:text-base">Total ({totalItems} item)</span>
                <div className="font-bold text-[#C67C4E] text-xl md:text-2xl lg:text-3xl">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </div>
              </div>
            </div>
            <div className="flex gap-3 md:gap-4">
              <button
                onClick={handleClearCart}
                className="flex-1 py-3.5 text-sm text-[#C67C4E] border-2 border-[#C67C4E] rounded-xl hover:bg-[#F9F2ED] transition-all duration-200 font-semibold md:text-base md:py-4"
              >
                Kosongkan
              </button>
              <button
                onClick={handleProceedToCheckout}
                className="flex-1 bg-[#C67C4E] hover:bg-[#A0633E] text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl md:text-base md:py-4"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}