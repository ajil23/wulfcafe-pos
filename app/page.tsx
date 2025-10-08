'use client';

import { useState, useEffect } from 'react';
import MenuItem from './components/MenuItem';
import CartSummary from './components/CartSummary';
import { Search } from 'lucide-react';

interface MenuItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends MenuItemType {
  quantity: number;
}

const menuItems: MenuItemType[] = [
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load cart dari localStorage saat komponen mount
  useEffect(() => {
    const savedCart = localStorage.getItem('wulfCafeCart');
    if (savedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing cart data:', error);
        setCart([]);
      }
    }
    setIsLoading(false);
  }, []);

  // Function untuk simpan cart ke localStorage
  const saveCartToStorage = (cartData: CartItem[]) => {
    localStorage.setItem('wulfCafeCart', JSON.stringify(cartData));
  };

  const getQuantity = (id: number): number => {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const updateQuantity = (id: number, newQty: number) => {
    let updatedCart: CartItem[];

    if (newQty <= 0) {
      updatedCart = cart.filter((item) => item.id !== id);
    } else {
      const item = menuItems.find((m) => m.id === id);
      if (!item) return;

      updatedCart = cart.some(cartItem => cartItem.id === id)
        ? cart.map((cartItem) =>
          cartItem.id === id ? { ...cartItem, quantity: newQty } : cartItem
        )
        : [...cart, { ...item, quantity: newQty }];
    }

    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('wulfCafeCart');
    setIsCartOpen(false);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9F2ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C67C4E] mx-auto"></div>
          <p className="mt-4 text-[#5A5A5A]">Memuat pesanan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F2ED] flex flex-col">
      {/* Header dengan layout lebih lebar untuk desktop */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <img
                src="/logo/wulflogo.jpeg"
                alt="Cafe Logo"
                className="h-10 w-10 object-contain md:h-14 md:w-14 lg:h-16 lg:w-16"
              />
              <div>
                <h1 className="text-2xl font-bold text-[#313131] md:text-3xl lg:text-4xl">Cafe</h1>
              </div>
            </div>
            <div className="bg-[#C67C4E] text-white px-4 py-2 rounded-full font-bold text-sm md:text-base lg:text-lg shadow-md">Meja 5</div>
          </div>

          {/* Search Bar lebih lebar */}
          <div className="relative mb-4 w-full">
            {/* icon lucide react */}
            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5A5A5A] h-6 w-6' />
            <input
              type="text"
              placeholder="Cari menu favoritmu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 pl-12 border border-[#E3E3E3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C67C4E] focus:border-[#C67C4E] text-[#313131] text-base md:text-lg"
            />
          </div>

          {/* Category Filter dengan lebih banyak item visible */}
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${selectedCategory === category
                  ? 'bg-[#C67C4E] text-white shadow-md'
                  : 'bg-[#EDD6C8] text-[#313131] hover:bg-[#d8c0b0] hover:shadow-sm'
                  } md:text-base md:px-6 md:py-3`}
              >
                {category === 'all' ? 'All Menu' : category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content dengan grid yang lebih optimal */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 md:py-24">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 mx-auto text-[#5A5A5A] mb-6 md:h-24 md:w-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[#5A5A5A] text-xl md:text-2xl mb-2">Menu tidak ditemukan</p>
              <p className="text-[#A0A0A0] text-base md:text-lg">Coba kata kunci atau kategori lain</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
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

      {/* Bottom cart summary lebih lebar */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E3E3E3] shadow-lg z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-[#5A5A5A] md:text-base">Total ({totalItems} item)</p>
                <p className="text-lg font-bold text-[#C67C4E] md:text-xl lg:text-2xl">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="bg-[#C67C4E] hover:bg-[#A0633E] text-white font-bold px-6 py-3 rounded-full text-sm shadow transition-colors md:px-8 md:py-3 md:text-base lg:px-10"
                >
                  Lihat Pesanan
                </button>
              </div>
            </div>
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