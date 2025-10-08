'use client';

import { useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'cash' | 'ewallet' | 'qris' | 'bank';
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'qris',
    name: 'QRIS',
    description: 'Scan QRIS untuk bayar',
    icon: 'payment_logo/qris.png',
    category: 'qris'
  },
  {
    id: 'lainnya',
    name: 'Lainnya ',
    description: 'Pilih Metode Lain Untuk Membayar',
    icon: 'payment_logo/xendit.png',
    category: 'bank'
  },
];

export default function PaymentPage() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('wulfCafeCart');
    if (savedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart data:', error);
        setCartItems([]);
      }
    }

    const savedName = localStorage.getItem('customerName');
    if (savedName) {
      setCustomerName(savedName);
    }
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredPayments = selectedCategory === 'all'
    ? paymentMethods
    : paymentMethods.filter(method => method.category === selectedCategory);

  const handlePayment = () => {
    if (!selectedPayment) {
      alert('Silakan pilih metode pembayaran terlebih dahulu');
      return;
    }

    alert(`Memproses pembayaran dengan ${selectedPayment.name}...\nTotal: Rp ${totalPrice.toLocaleString('id-ID')}`);

    localStorage.removeItem('wulfCafeCart');

    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  const handleBackToMenu = () => {
    window.location.href = '/checkout';
  };

  return (
    <div className="min-h-screen bg-[#F9F2ED] flex flex-col">
      {/* Header lebih lebar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToMenu}
              className="p-3 hover:bg-[#F9F2ED] rounded-xl transition-colors bg-[#F9F2ED] hover:bg-[#EDD6C8]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#313131] md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#313131] md:text-3xl lg:text-4xl">Metode Pembayaran</h1>
              <p className="text-[#5A5A5A] text-sm mt-1 md:text-base lg:text-lg">Pilih cara pembayaran yang nyaman</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Order Summary lebih lebar */}
          {cartItems.length > 0 ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E3E3E3] mb-6">
              <h2 className="font-bold text-[#313131] text-xl mb-4 md:text-2xl">Ringkasan Pesanan</h2>
              <div className="mb-3 pb-3 border-b">
                <span className="text-[#5A5A5A]">Nama Pemesan: </span>
                <span className="font-semibold text-[#313131]">{customerName}</span>
              </div>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-base md:text-lg py-2 border-b border-[#F9F2ED] last:border-b-0">
                    <span className="text-[#5A5A5A] flex-1">{item.name} x{item.quantity}</span>
                    <span className="font-medium text-[#313131] text-right min-w-[120px]">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#E3E3E3] pt-4 flex justify-between items-center">
                <span className="font-bold text-[#313131] text-lg md:text-xl">Total ({totalItems} item)</span>
                <span className="font-bold text-[#C67C4E] text-xl md:text-2xl lg:text-3xl">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#E3E3E3] mb-6 max-w-2xl mx-auto text-center">
              <div className="text-6xl mb-6"></div>
              <p className="text-[#5A5A5A] text-xl mb-4">Keranjang kosong</p>
              <button
                onClick={handleBackToMenu}
                className="mt-4 text-[#C67C4E] font-medium text-lg hover:underline bg-[#F9F2ED] hover:bg-[#EDD6C8] px-6 py-3 rounded-xl transition-colors"
              >
                Kembali ke Menu
              </button>
            </div>
          )}

          {/* Category Filter lebih lebar */}
          {cartItems.length > 0 && (
            <>

              {/* Payment Methods grid responsive */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPayments.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method)}
                    className={`bg-white rounded-2xl p-5 shadow-sm border-2 transition-all text-left hover:scale-[1.02] ${
                      selectedPayment?.id === method.id
                        ? 'border-[#C67C4E] bg-[#FFF8F3] shadow-lg'
                        : 'border-[#E3E3E3] hover:border-[#C67C4E]/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg">
                        <img src={method.icon} alt={method.name} className="w-8 h-8 object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#313131] text-lg md:text-xl mb-1">{method.name}</h3>
                        <p className="text-sm text-[#5A5A5A] md:text-base">{method.description}</p>
                      </div>
                      {selectedPayment?.id === method.id && (
                        <div className="w-8 h-8 rounded-full bg-[#C67C4E] flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {filteredPayments.length === 0 && (
                <div className="text-center py-16 max-w-2xl mx-auto">
                  <div className="text-6xl mb-4">😔</div>
                  <p className="text-[#5A5A5A] text-xl">Tidak ada metode pembayaran tersedia</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Bottom Payment Button lebih lebar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E3E3E3] shadow-2xl z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={handlePayment}
              disabled={!selectedPayment}
              className={`w-full font-bold py-4 rounded-xl transition-all duration-200 text-lg ${selectedPayment
                  ? 'bg-[#C67C4E] hover:bg-[#A0633E] text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                  : 'bg-[#E3E3E3] text-[#A0A0A0] cursor-not-allowed'
                } md:text-xl md:py-5`}
            >
              {selectedPayment ? `Bayar dengan ${selectedPayment.name}` : 'Pilih Metode Pembayaran'}
            </button>
            {selectedPayment && (
              <p className="text-center text-sm text-[#5A5A5A] mt-3 md:text-base">
                Total: Rp {totalPrice.toLocaleString('id-ID')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}