// page.jsx
'use client';

import { useState } from 'react';
import MenuItem from './components/MenuItem';
import CartSummary from './components/CartSummary';

const menuItems = [
  // coffee
  { id: 1, name: 'Butterscotch Latte', description: 'Perpaduan creamy & manis lembut butterscotch.', price: 25000, image: 'https://images.unsplash.com/photo-1626595444746-59219e6838ac?q=300&h=200&fit=crop', category: 'Coffee' },
  { id: 2, name: 'Gula Aren Latte', description: 'Signature latte dengan sentuhan lokal manis alami.', price: 22000, image: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=300&h=200&fit=crop', category: 'Coffee' },
  { id: 3, name: 'Americano', description: 'Kopi hitam klasik, aroma tajam tanpa gula.', price: 18000, image: 'https://images.unsplash.com/photo-1580661869408-55ab23f2ca6e?q=300&h=200&fit=crop', category: 'Coffee' },
  { id: 4, name: 'Cappuccino', description: 'Foam lembut dengan keseimbangan espresso & susu.', price: 20000, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=300&h=200&fit=crop', category: 'Coffee' },
  { id: 5, name: 'Espresso', description: 'Satu shot energi murni untuk kick pagi Anda.', price: 28000, image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?q=300&h=200&fit=crop', category: 'Coffee' },
  { id: 6, name: 'Caramel Macchiato', description: 'Manis karamel berpadu espresso pekat.', price: 5000, image: 'https://images.unsplash.com/photo-1662047102608-a6f2e492411f?q=300&h=200&fit=crop', category: 'Coffee' },
  { id: 7, name: 'Vanilla Latte', description: 'Lembut dengan aroma vanilla yang menenangkan.', price: 8000, image: 'https://images.unsplash.com/photo-1504194472231-5a5294eddc43?q=300&h=200&fit=crop', category: 'Coffee' },
  { id: 8, name: 'Hazelnut Coffee', description: 'Kacang hazelnut berpadu rasa kopi khas.', price: 12000, image: 'https://images.unsplash.com/photo-1598831745385-0c404c7034a9?q=300&h=200&fit=crop', category: 'Coffee' },
  { id: 9, name: 'Mocha Fusion', description: 'Kopi dan cokelat yang berpadu sempurna.', price: 10000, image: 'https://images.unsplash.com/photo-1618576230663-9714aecfb99a?q=300&h=200&fit=crop', category: 'Coffee' },
  { id: 10, name: 'Cold Brew Classic', description: 'Diseduh dingin 12 jam untuk rasa halus & kaya.', price: 8000, image: 'https://images.unsplash.com/photo-1558122104-355edad709f6?q=300&h=200&fit=crop', category: 'Coffee' },
  // healthy drinks
  { id: 11, name: 'Green Detox', description: 'Spinach, apple, pineapple untuk pembersihan alami.', price: 8000, image: 'https://images.unsplash.com/photo-1613637028036-ca0b31a4ad12?q=300&h=200&fit=crop', category: 'Healthy Drinks' },
  { id: 12, name: 'Energy Booster', description: 'Banana, oat, honey, peanut, oat milk.', price: 8000, image: 'https://images.unsplash.com/photo-1664665239609-c07159ff308c?q=300&h=200&fit=crop', category: 'Healthy Drinks' },
  { id: 13, name: 'Immune Shield', description: 'Orange, carrot, ginger, turmeric — imun booster alami.', price: 8000, image: 'https://images.unsplash.com/photo-1566846128021-b940b0eec910?q=300&h=200&fit=crop', category: 'Healthy Drinks' },
  { id: 14, name: 'Skin Glow', description: 'Strawberry, chia seed, collagen — cantik dari dalam.', price: 8000, image: 'https://images.unsplash.com/photo-1731460443757-8e6efe800423?q=300&h=200&fit=crop', category: 'Healthy Drinks' },
  { id: 15, name: 'Protein Power', description: 'Chocolate whey, almond, banana — otot siap latihan.', price: 8000, image: 'https://images.unsplash.com/photo-1595177924963-751716e81b89?q=300&h=200&fit=crop', category: 'Healthy Drinks' },
  { id: 16, name: 'Calm Mind', description: 'Blueberry, lavender, yogurt — relaksasi sebelum tidur.', price: 8000, image: 'https://images.unsplash.com/photo-1662186341099-56d0131327b5?q=300&h=200&fit=crop', category: 'Healthy Drinks' },
  // mocktails
  { id: 17, name: 'Virgin Mojito', description: 'Mint segar & lime soda klasik.', price: 8000, image: 'https://images.unsplash.com/photo-1653542772393-71ffa417b1c4?q=300&h=200&fit=crop', category: 'Mocktails' },
  { id: 18, name: 'Summer Breeze', description: 'Lychee, orange, dan mint yang menyegarkan.', price: 8000, image: 'https://images.unsplash.com/photo-1599767431130-41b1c51d9a7b?q=300&h=200&fit=crop', category: 'Mocktails' },
  { id: 19, name: 'Berry Sunrise', description: 'Strawberry & lemon soda berpadu warna sunset.', price: 8000, image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?q=300&h=200&fit=crop', category: 'Mocktails' },
  { id: 20, name: 'Tropical Sunset', description: 'Mango, passionfruit & soda tropis.', price: 8000, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?q=300&h=200&fit=crop', category: 'Mocktails' },
  { id: 21, name: 'Apple Mint Cooler', description: 'Apel hijau & daun mint segar.', price: 8000, image: 'https://images.unsplash.com/photo-1632935253723-f37c5a038f41?q=300&h=200&fit=crop', category: 'Mocktails' },
  { id: 22, name: 'Blue Lagoon', description: 'Campuran biru lemon soda non-alkohol.', price: 8000, image: 'https://images.unsplash.com/photo-1621330716555-5cad596c4562?q=300&h=200&fit=crop', category: 'Mocktails' },
  // blends & smoothies
  { id: 23, name: 'Avocado Blend', description: 'Lembut dan creamy dengan alpukat segar.', price: 8000, image: 'https://images.unsplash.com/photo-1630252595285-3bbcb51378d8?q=300&h=200&fit=crop', category: 'Blends & Smoothies' },
  { id: 24, name: 'Mango Blend', description: 'Manis tropis dengan rasa mangga alami.', price: 8000, image: 'https://images.unsplash.com/photo-1697642452436-9c40773cbcbb?q=300&h=200&fit=crop', category: 'Blends & Smoothies' },
  { id: 25, name: 'Mix Berry Blend', description: 'Strawberry, blueberry, raspberry, sensasi segar.', price: 8000, image: 'https://images.unsplash.com/photo-1635970452476-5f28499fa67c?q=300&h=200&fit=crop', category: 'Blends & Smoothies' },
  { id: 26, name: 'Banana Peanut Blend', description: 'Kombinasi gurih kacang & manis pisang.', price: 8000, image: 'https://images.unsplash.com/photo-1685967836529-b0e8d6938227?q=300&h=200&fit=crop', category: 'Blends & Smoothies' },
  { id: 27, name: 'Chocolate Almond Smoothie', description: 'Cokelat pekat dengan aroma almond.', price: 8000, image: 'https://images.unsplash.com/photo-1626200949108-510618c118c3?q=300&h=200&fit=crop', category: 'Blends & Smoothies' },
  { id: 28, name: 'Strawberry Yogurt Smoothie', description: 'Asam segar yogurt & strawberry.', price: 8000, image: 'https://images.unsplash.com/photo-1647275485937-890ba327b0ae?q=300&h=200&fit=crop', category: 'Blends & Smoothies' },
  // snacks
  { id: 29, name: 'Potato Wedges with Cheese', description: 'Kentang panggang dengan saus keju.', price: 15000, image: 'https://images.unsplash.com/photo-1623238913973-21e45cced554?q=300&h=200&fit=crop', category: 'Snacks' },
  { id: 30, name: 'Chicken Pop Bites', description: 'Gurih renyah, pas untuk teman ngopi.', price: 18000, image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=300&h=200&fit=crop', category: 'Snacks' },
  { id: 31, name: 'Crispy Tofu', description: 'Tahu garing dengan bumbu khas.', price: 20000, image: 'https://images.unsplash.com/photo-1644143452702-e883f31d7476?q=300&h=200&fit=crop', category: 'Snacks' },
  { id: 32, name: 'Nachos with Salsa', description: 'Crunchy nachos dengan saus tomat segar.', price: 12000, image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?q=300&h=200&fit=crop', category: 'Snacks' },
  { id: 33, name: 'French Fries', description: 'Kentang goreng klasik, tak pernah salah', price: 10000, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=300&h=200&fit=crop', category: 'Snacks' },
  { id: 34, name: 'Garlic Bread', description: 'Roti panggang aroma bawang gurih.', price: 15000, image: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?q=300&h=200&fit=crop', category: 'Snacks' },
  // food
  { id: 35, name: 'Grilled Chicken Rice Bowl', description: 'Ayam panggang dengan saus pedas manis.', price: 35000, image: 'https://images.unsplash.com/photo-1592011432621-f7f576f44484?q=300&h=200&fit=crop', category: 'Food' },
  { id: 36, name: 'Salmon Teriyaki Bowl', description: 'Salmon lembut & saus teriyaki gurih.', price: 30000, image: 'https://images.unsplash.com/photo-1728963228980-71c76178616a?q=300&h=200&fit=crop', category: 'Food' },
  { id: 37, name: 'Chicken Caesar Salad', description: 'Salad segar dengan dressing creamy.', price: 32000, image: 'https://images.unsplash.com/photo-1670237735381-ac5c7fa72c51?q=300&h=200&fit=crop', category: 'Food' },
  { id: 38, name: 'Tuna Sandwich', description: 'Roti panggang isi tuna & sayuran renyah.', price: 40000, image: 'https://images.unsplash.com/photo-1672078857105-a1229a7033b8?q=300&h=200&fit=crop', category: 'Food' },
  { id: 39, name: 'Pasta Creamy Mushroom', description: 'Krim jamur gurih khas Italia.', price: 45000, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=300&h=200&fit=crop', category: 'Food' },
  { id: 40, name: 'Nasi Goreng Wulf Signature', description: 'Spesial house recipe, pedas pas.', price: 28000, image: 'https://images.unsplash.com/photo-1680674774705-90b4904b3a7f?q=300&h=200&fit=crop', category: 'Food' },
  { id: 41, name: 'Spaghetti Aglio Olio', description: 'Simple tapi classy, minyak zaitun & cabai.', price: 28000, image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=300&h=200&fit=crop', category: 'Food' },
  { id: 42, name: 'Chicken Steak with Veggies', description: 'Ayam panggang & sayur rebus sehat.', price: 28000, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=300&h=200&fit=crop', category: 'Food' },
];

const categories = ['all', 'Coffee', 'Healthy Drinks', 'Mocktails', 'Blends & Smoothies', 'Snacks', 'Food'];

export default function MenuPage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // Default ke 'all'

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
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory; // Ubah 'Semua' jadi 'all'
    return matchesSearch && matchesCategory;
  });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F9F2ED] flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo/wulflogo.jpeg"
                alt="Cafe Logo"
                className="h-8 w-8 object-contain md:h-12 md:w-12"
              />
              <h1 className="text-xl font-bold text-[#313131] md:text-2xl">Cafe</h1>
            </div>
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
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                    ? 'bg-[#C67C4E] text-white'
                    : 'bg-[#EDD6C8] text-[#313131] hover:bg-[#d8c0b0]'
                  }`}
              >
                {category === 'all' ? 'All' : category}
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
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}