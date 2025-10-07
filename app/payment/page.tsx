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
    id: 'cash',
    name: 'Tunai',
    description: 'Bayar langsung di kasir',
    icon: '💵',
    category: 'cash'
  },
  {
    id: 'gopay',
    name: 'GoPay',
    description: 'Bayar pakai GoPay',
    icon: '🟢',
    category: 'ewallet'
  },
  {
    id: 'ovo',
    name: 'OVO',
    description: 'Bayar pakai OVO',
    icon: '🟣',
    category: 'ewallet'
  },
  {
    id: 'dana',
    name: 'DANA',
    description: 'Bayar pakai DANA',
    icon: '🔵',
    category: 'ewallet'
  },
  {
    id: 'shopee',
    name: 'ShopeePay',
    description: 'Bayar pakai ShopeePay',
    icon: '🟠',
    category: 'ewallet'
  },
  {
    id: 'qris',
    name: 'QRIS',
    description: 'Scan QRIS untuk bayar',
    icon: '📱',
    category: 'qris'
  },
  {
    id: 'bca',
    name: 'Transfer BCA',
    description: 'Transfer ke rekening BCA',
    icon: '🏦',
    category: 'bank'
  },
  {
    id: 'mandiri',
    name: 'Transfer Mandiri',
    description: 'Transfer ke rekening Mandiri',
    icon: '🏦',
    category: 'bank'
  },
  {
    id: 'bri',
    name: 'Transfer BRI',
    description: 'Transfer ke rekening BRI',
    icon: '🏦',
    category: 'bank'
  },
];

const categories: Category[] = [
  { id: 'all', name: 'Semua', icon: '💳' },
  { id: 'cash', name: 'Tunai', icon: '💵' },
  { id: 'ewallet', name: 'E-Wallet', icon: '📱' },
  { id: 'qris', name: 'QRIS', icon: '📲' },
  { id: 'bank', name: 'Transfer Bank', icon: '🏦' },
];

export default function PaymentPage() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Load cart data dari localStorage
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
    
    // Logic untuk proses pembayaran
    alert(`Memproses pembayaran dengan ${selectedPayment.name}...\nTotal: Rp ${totalPrice.toLocaleString('id-ID')}`);
    
    // ✅ HANYA clear cart setelah pembayaran BERHASIL
    localStorage.removeItem('wulfCafeCart');
    
    // Redirect ke halaman sukses atau kembali ke menu
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  const handleBackToMenu = () => {
    // ✅ Hanya navigate back, jangan clear data
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#F9F2ED] flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleBackToMenu}
              className="p-2 hover:bg-[#F9F2ED] rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#313131]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-[#313131] md:text-2xl">Metode Pembayaran</h1>
              <p className="text-[#5A5A5A] text-sm mt-1 md:text-base">Pilih cara pembayaran</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Order Summary */}
          {cartItems.length > 0 ? (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E3E3E3] mb-4">
              <h2 className="font-bold text-[#313131] mb-3">Ringkasan Pesanan</h2>
              <div className="space-y-2 mb-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#5A5A5A]">{item.name} x{item.quantity}</span>
                    <span className="font-medium text-[#313131]">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#E3E3E3] pt-3 flex justify-between">
                <span className="font-bold text-[#313131]">Total ({totalItems} item)</span>
                <span className="font-bold text-[#C67C4E] text-lg">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E3E3E3] mb-4 text-center">
              <p className="text-[#5A5A5A]">Keranjang kosong</p>
              <button
                onClick={handleBackToMenu}
                className="mt-4 text-[#C67C4E] font-medium hover:underline"
              >
                Kembali ke Menu
              </button>
            </div>
          )}

          {/* Category Filter */}
          {cartItems.length > 0 && (
            <>
              <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? 'bg-[#C67C4E] text-white'
                        : 'bg-white text-[#313131] border border-[#E3E3E3] hover:bg-[#F9F2ED]'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                {filteredPayments.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method)}
                    className={`w-full bg-white rounded-xl p-4 shadow-sm border-2 transition-all text-left ${
                      selectedPayment?.id === method.id
                        ? 'border-[#C67C4E] bg-[#FFF8F3]'
                        : 'border-[#E3E3E3] hover:border-[#C67C4E]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{method.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[#313131]">{method.name}</h3>
                        <p className="text-sm text-[#5A5A5A]">{method.description}</p>
                      </div>
                      {selectedPayment?.id === method.id && (
                        <div className="w-6 h-6 rounded-full bg-[#C67C4E] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {filteredPayments.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-[#5A5A5A]">Tidak ada metode pembayaran tersedia</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Bottom Payment Button */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E3E3E3] shadow-lg z-20">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <button
              onClick={handlePayment}
              disabled={!selectedPayment}
              className={`w-full font-bold py-3 rounded-xl transition-colors ${
                selectedPayment
                  ? 'bg-[#C67C4E] hover:bg-[#A0633E] text-white'
                  : 'bg-[#E3E3E3] text-[#A0A0A0] cursor-not-allowed'
              }`}
            >
              {selectedPayment ? `Bayar dengan ${selectedPayment.name}` : 'Pilih Metode Pembayaran'}
            </button>
            {selectedPayment && (
              <p className="text-center text-xs text-[#5A5A5A] mt-2">
                Total: Rp {totalPrice.toLocaleString('id-ID')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}