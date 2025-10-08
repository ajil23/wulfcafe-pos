'use client';

import { useState, useEffect } from 'react';
import { XCircle, Clock, User, Table, AlertCircle, RefreshCw } from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface FailedOrderData {
  id: string;
  customerName: string;
  tableNumber: string;
  orderTime: string;
  items: OrderItem[];
  totalPrice: number;
  failureReason?: string;
}

// Data contoh untuk simulasi
const sampleFailedOrder: FailedOrderData = {
  id: 'WLF-2024-001',
  customerName: 'John Doe',
  tableNumber: 'A5',
  orderTime: new Date().toISOString(),
  items: [
    { id: 1, name: 'Kopi Hitam', quantity: 2, price: 15000 },
    { id: 2, name: 'Croissant', quantity: 1, price: 20000 },
  ],
  totalPrice: 55000,
  failureReason: 'Pembayaran ditolak oleh sistem'
};

export default function FailedPage() {
  const [order, setOrder] = useState<FailedOrderData | null>(null);

  useEffect(() => {
    // Simulasi load data dari localStorage atau API
    const savedOrder = localStorage.getItem('wulfCafeOrder');
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setOrder({
          ...parsedOrder,
          id: `WLF-${Date.now().toString().slice(-6)}`,
          orderTime: new Date().toISOString(),
        });
      } catch (error) {
        setOrder(sampleFailedOrder);
      }
    } else {
      setOrder(sampleFailedOrder);
    }
  }, []);

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace('.', ':');
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleRetry = () => {
    // Kembali ke halaman payment untuk retry
    window.location.href = '/payment';
  };

  const handleBackToMenu = () => {
    window.location.href = '/';
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F9F2ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C67C4E] mx-auto mb-4"></div>
          <p className="text-[#5A5A5A]">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F2ED] py-6 md:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl font-bold text-[#313131] mb-2 md:text-3xl lg:text-4xl">Pembayaran Gagal</h1>
          <p className="text-[#5A5A5A] text-sm md:text-base lg:text-lg">Terjadi kesalahan dalam proses pembayaran</p>
        </div>

        {/* Card 1: Status Failed - Layout Center */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E3E3E3] mb-4 text-center md:p-8 md:mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center md:w-20 md:h-20">
              <XCircle className="w-8 h-8 text-red-500 md:w-10 md:h-10" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-[#313131] mb-2 md:text-2xl lg:text-3xl">
            Pembayaran Tidak Berhasil
          </h2>
          <p className="text-[#5A5A5A] mb-4 text-sm md:text-base">
            {order.failureReason || 'Mohon maaf, pembayaran Anda tidak dapat diproses'}
          </p>
          <div className="border-t border-[#E3E3E3] pt-4">
            <p className="text-xs text-[#5A5A5A] md:text-sm">Order ID</p>
            <p className="text-base font-bold text-red-500 md:text-lg lg:text-xl">{order.id}</p>
          </div>
        </div>

        {/* Card 2: Alasan & Solusi */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-4 md:p-6 md:mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
            <div className="flex-1">
              <h3 className="text-base font-bold text-amber-900 mb-2 md:text-lg">Kemungkinan Penyebab:</h3>
              <ul className="text-sm text-amber-800 space-y-1 md:text-base">
                <li>• Saldo tidak mencukupi</li>
                <li>• Koneksi internet terputus</li>
                <li>• Metode pembayaran tidak valid</li>
                <li>• Timeout dalam proses transaksi</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 3: Detail Pesanan */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E3E3E3] mb-4 md:p-6 md:mb-6">
          <h3 className="text-base font-bold text-[#313131] mb-4 md:text-lg lg:text-xl">Detail Pesanan</h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-[#F9F2ED] last:border-b-0">
                <div className="flex-1">
                  <span className="text-[#313131] font-medium text-sm md:text-base">{item.name}</span>
                  <span className="text-[#5A5A5A] text-xs ml-2 md:text-sm">x{item.quantity}</span>
                </div>
                <span className="font-medium text-[#313131] text-sm md:text-base lg:text-lg">
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E3E3E3] mt-4 pt-4 flex justify-between items-center">
            <span className="font-bold text-[#313131] text-base md:text-lg">Total</span>
            <span className="font-bold text-[#C67C4E] text-lg md:text-xl lg:text-2xl">
              Rp {order.totalPrice.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Card 4: Info Pesanan */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E3E3E3] mb-4 md:p-6 md:mb-6">
          <h3 className="text-base font-bold text-[#313131] mb-4 md:text-lg lg:text-xl">Informasi Pesanan</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 md:gap-3">
                <Clock className="w-4 h-4 text-[#5A5A5A] md:w-5 md:h-5" />
                <span className="text-[#5A5A5A] text-sm md:text-base">Waktu Pemesanan</span>
              </div>
              <div className="text-right">
                <p className="font-medium text-[#313131] text-xs md:text-sm">
                  {formatDate(order.orderTime)} • {formatTime(order.orderTime)}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 md:gap-3">
                <User className="w-4 h-4 text-[#5A5A5A] md:w-5 md:h-5" />
                <span className="text-[#5A5A5A] text-sm md:text-base">Nama Pemesan</span>
              </div>
              <p className="font-medium text-[#313131] text-sm md:text-base">{order.customerName}</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 md:gap-3">
                <Table className="w-4 h-4 text-[#5A5A5A] md:w-5 md:h-5" />
                <span className="text-[#5A5A5A] text-sm md:text-base">Nomor Meja</span>
              </div>
              <p className="font-medium text-[#313131] text-sm md:text-base">
                {order.tableNumber || 'Takeaway'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
          <button
            onClick={handleBackToMenu}
            className="flex-1 bg-white border-2 border-[#C67C4E] text-[#C67C4E] hover:bg-[#FFF8F3] font-bold py-3 rounded-xl transition-all duration-200 text-sm md:text-base md:py-4"
          >
            Kembali ke Menu
          </button>
          <button
            onClick={handleRetry}
            className="flex-1 bg-[#C67C4E] hover:bg-[#A0633E] text-white font-bold py-3 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 md:text-base md:py-4"
          >
            <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
            Coba Lagi
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-6 text-center">
          <p className="text-[#5A5A5A] text-sm md:text-base">
            Butuh bantuan? Hubungi staff kami atau hubungi 
            <a href="tel:+6281234567890" className="text-[#C67C4E] font-semibold ml-1 hover:underline">
              +62 812-3456-7890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}