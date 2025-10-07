'use client';

import { useState } from 'react';

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

function MenuItem({
  item,
  quantity,
  onUpdateQuantity,
}: {
  item: MenuItem;
  quantity: number;
  onUpdateQuantity: (id: number, newQty: number) => void;
}) {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(item.id, quantity - 1);
    } else {
      onUpdateQuantity(item.id, 0);
    }
  };

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="aspect-[4/3] rounded-lg overflow-hidden mb-2">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200/e0e0e0/999999?text=No+Image';
          }}
        />
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-bold text-gray-900 line-clamp-1 md:text-base">{item.name}</h3>
        <p className="text-gray-600 text-xs mt-1 line-clamp-2 min-h-[2.5rem] md:text-sm">
          {item.description}
        </p>
        <p className="text-emerald-600 font-bold mt-2 text-base md:text-lg">
          Rp {item.price.toLocaleString('id-ID')}
        </p>
      </div>

      <div className="mt-2 flex justify-end">
        {quantity === 0 ? (
          <button
            onClick={handleIncrement}
            className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center hover:bg-amber-600 transition-colors md:w-10 md:h-10"
            aria-label={`Tambah ${item.name}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white md:h-5 md:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <div className="flex items-center border border-gray-300 rounded-full">
            <button
              onClick={handleDecrement}
              className="w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-l-full md:w-10 md:h-10"
              aria-label={`Kurangi ${item.name}`}
            >
              <span className="text-base font-bold">−</span>
            </button>
            <span className="px-2 font-bold text-gray-900 min-w-[32px] text-center text-base md:min-w-[36px] md:text-lg">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-r-full md:w-10 md:h-10"
              aria-label={`Tambah ${item.name}`}
            >
              <span className="text-base font-bold">+</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CartModal({
  cart,
  isOpen,
  onClose,
  onClearCart,
}: {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onClearCart: () => void;
}) {
  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50 md:items-center md:justify-center" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md max-h-[80vh] overflow-hidden rounded-t-2xl md:rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Pesanan Saya</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[50vh]">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Keranjang kosong</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600">Rp {item.price.toLocaleString('id-ID')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-amber-600">{item.quantity}x</div>
                    <div className="text-emerald-600 font-bold">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Total ({totalItems} item)</span>
              <span className="font-bold text-emerald-600">Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClearCart();
                }}
                className="flex-1 py-2.5 text-sm text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-50 transition-colors"
              >
                Kosongkan
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition-colors"
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

const menuItems: MenuItem[] = [
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const getQuantity = (id: number): number => {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const updateQuantity = (id: number, newQty: number) => {
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Wulf Cafe</h1>
              <p className="text-gray-600 text-sm mt-1 md:text-base">Pilih menu favoritmu!</p>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
              aria-label="Lihat keranjang"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Cari menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                className="h-16 w-16 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-lg">Menu tidak ditemukan</p>
              <p className="text-gray-400 text-sm mt-2">Coba kata kunci atau kategori lain</p>
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
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
          <div className="max-w-4xl mx-auto px-4 py-2.5 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-600 md:text-sm">Total ({totalItems} item)</p>
              <p className="text-base font-bold text-emerald-600 md:text-lg">
                Rp {totalPrice.toLocaleString('id-ID')}
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-full text-sm shadow transition-colors md:px-6 md:py-2.5 md:text-base"
            >
              Lihat Pesanan
            </button>
          </div>
        </div>
      )}

      <CartModal
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onClearCart={clearCart}
      />
    </div>
  );
}