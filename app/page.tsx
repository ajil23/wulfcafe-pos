// page.jsx
'use client';

import { useState } from 'react';
import MenuItem from './components/MenuItem';
import CartSummary from './components/CartSummary';

const menuItems = [
  { id: 1, name: 'Nasi Goreng Spesial', description: 'Telur, ayam, acar, kerupuk', price: 25000, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop', category: 'Makanan' },
  { id: 2, name: 'Mie Ayam Pangsit', description: 'Mie ayam + pangsit goreng + kuah hangat', price: 22000, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop', category: 'Makanan' },
  { id: 3, name: 'Bakso Urat Komplit', description: 'Bakso urat, mie, bihun, tahu, kuah gurih', price: 18000, image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=300&h=200&fit=crop', category: 'Makanan' },
  { id: 4, name: 'Soto Ayam Lamongan', description: 'Soto ayam + serundeng + kerupuk udang', price: 20000, image: 'https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?w=300&h=200&fit=crop', category: 'Makanan' },
  { id: 5, name: 'Ayam Goreng Kalasan', description: 'Ayam goreng bumbu rempah khas Yogyakarta', price: 28000, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=300&h=200&fit=crop', category: 'Makanan' },
  { id: 6, name: 'Es Teh Manis', description: 'Teh tubruk dingin dengan gula asli', price: 5000, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop', category: 'Minuman' },
  { id: 7, name: 'Es Jeruk', description: 'Jeruk segar peras dengan es batu', price: 8000, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&fit=crop', category: 'Minuman' },
  { id: 8, name: 'Jus Alpukat', description: 'Alpukat segar blender dengan susu', price: 12000, image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300&h=200&fit=crop', category: 'Minuman' },
  { id: 9, name: 'Pisang Goreng', description: 'Pisang goreng kriuk dengan taburan gula', price: 10000, image: 'https://images.unsplash.com/photo-1664993090321-b2caff794431?q=300&h=200&fit=crop', category: 'Snack' },
  { id: 10, name: 'Tahu Isi', description: 'Tahu goreng isi sayuran dan bumbu', price: 8000, image: 'https://images.unsplash.com/photo-1680173073730-852e0ec93bec?q=300&h=200&fit=crop', category: 'Snack' },
];

const categories = ['Semua', 'Makanan', 'Minuman', 'Snack'];

export default function MenuPage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const getQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      const item = menuItems.find((m) => m.id === id);
      if (!item) return;

      setCart((prev) => {
        const existingItem = prev.find((cartItem) => cartItem.id === id);
        if (existingItem) {
          return prev.map((cartItem) =>
            cartItem.id === id ? { ...cartItem, quantity: newQty } : cartItem
          );
        } else {
          return [...prev, { ...item, quantity: newQty }];
        }
      });
    }
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F9F2ED] flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h1 className="text-xl font-bold text-[#313131] md:text-2xl">Wulf Cafe</h1>
              <p className="text-[#5A5A5A] text-sm mt-1 md:text-base">Pilih menu favoritmu!</p>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#313131] hover:text-[#C67C4E] transition-colors"
              aria-label="Lihat keranjang"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C67C4E] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Cari menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-[#E3E3E3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C67C4E] focus:border-[#C67C4E] text-[#313131]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5A5A5A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#C67C4E] text-white'
                    : 'bg-[#EDD6C8] text-[#313131] hover:bg-[#d8c0b0]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-[#5A5A5A] mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[#5A5A5A] text-lg">Menu tidak ditemukan</p>
              <p className="text-[#A0A0A0] text-sm mt-2">Coba kata kunci atau kategori lain</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filteredItems.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  quantity={getQuantity(item.id)}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E3E3E3] shadow-lg z-20">
          <div className="max-w-4xl mx-auto px-4 py-2.5 flex justify-between items-center">
            <div>
              <p className="text-xs text-[#5A5A5A] md:text-sm">Total ({totalItems} item)</p>
              <p className="text-base font-bold text-[#C67C4E] md:text-lg">
                Rp {totalPrice.toLocaleString('id-ID')}
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#C67C4E] hover:bg-[#A0633E] text-white font-bold px-4 py-2 rounded-full text-sm shadow transition-colors md:px-6 md:py-2.5 md:text-base"
            >
              Lihat Pesanan
            </button>
          </div>
        </div>
      )}

      <CartSummary
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onClearCart={clearCart}
      />
    </div>
  );
}