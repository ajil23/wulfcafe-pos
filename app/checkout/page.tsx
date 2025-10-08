'use client';

import { useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('wulfCafeCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    const savedName = localStorage.getItem('customerName');
    if(savedName) {
        setCustomerName(savedName);
    }
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProceedToPayment = () => {
    if (!customerName.trim()) {
      alert('Silakan masukkan nama pemesan');
      return;
    }
    
    localStorage.setItem('customerName', customerName);
    window.location.href = '/payment';
  };

  const handleBackToMenu = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#F9F2ED] flex flex-col">
      {/* Header - sama seperti di payment */}
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
              <h1 className="text-2xl font-bold text-[#313131] md:text-3xl lg:text-4xl">Checkout</h1>
              <p className="text-[#5A5A5A] text-sm mt-1 md:text-base lg:text-lg">Isi informasi pemesan</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Form Nama Pemesan */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E3E3E3] mb-6 max-w-4xl mx-auto">
            <h2 className="font-bold text-[#313131] text-xl mb-4 md:text-2xl">Informasi Pemesan</h2>
            <label className="block text-[#313131] font-medium mb-2 text-base md:text-lg">
              Nama Pemesan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Masukkan nama Anda"
              className="w-full px-4 py-3 border-2 border-[#E3E3E3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C67C4E] focus:border-[#C67C4E] text-[#313131] placeholder-[#A0A0A0] text-base md:text-lg"
            />
          </div>

          {/* Ringkasan Pesanan */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E3E3E3] mb-6 max-w-4xl mx-auto">
            <h2 className="font-bold text-[#313131] text-xl mb-4 md:text-2xl">Ringkasan Pesanan</h2>
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-base md:text-lg py-2 border-b border-[#F9F2ED] last:border-b-0">
                  <span className="text-[#313131] flex-1">{item.name} x{item.quantity}</span>
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
        </div>
      </main>

      {/* Button Lanjut ke Pembayaran */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E3E3E3] shadow-2xl z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleProceedToPayment}
            disabled={!customerName.trim()}
            className={`w-full font-bold py-4 rounded-xl transition-all duration-200 text-lg ${
              customerName.trim()
                ? 'bg-[#C67C4E] hover:bg-[#A0633E] text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                : 'bg-[#E3E3E3] text-[#A0A0A0] cursor-not-allowed'
            } md:text-xl md:py-5`}
          >
            {customerName.trim() ? 'Lanjut ke Pembayaran' : 'Masukkan Nama Terlebih Dahulu'}
          </button>
        </div>
      </div>
    </div>
  );
}