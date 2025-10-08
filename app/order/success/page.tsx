'use client';

import { useState, useEffect } from 'react';
import { ChefHat, CheckCircle, Utensils, Clock, User, Table, CheckCheck, CheckIcon } from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface OrderData {
  id: string;
  status: 'processing' | 'ready' | 'completed';
  customerName: string;
  tableNumber: string;
  orderTime: string;
  items: OrderItem[];
  totalPrice: number;
}

// Data contoh untuk simulasi
const sampleOrder: OrderData = {
  id: 'WLF-2024-001',
  status: 'processing',
  customerName: 'John Doe',
  tableNumber: 'A5',
  orderTime: new Date().toISOString(),
  items: [
    { id: 1, name: 'Kopi Hitam', quantity: 2, price: 15000 },
    { id: 2, name: 'Croissant', quantity: 1, price: 20000 },
    { id: 3, name: 'Sandwich', quantity: 1, price: 25000 },
  ],
  totalPrice: 75000,
};

const statusSteps = [
  {
    key: 'processing' as const,
    label: 'Sedang Diproses',
    description: 'Pesanan sedang dibuat oleh kitchen',
    icon: ChefHat
  },
  {
    key: 'ready' as const,
    label: 'Siap Disajikan',
    description: 'Pesanan sudah siap untuk diantar',
    icon: CheckIcon
  },
  {
    key: 'completed' as const,
    label: 'Sudah Disajikan',
    description: 'Pesanan telah sampai ke meja Anda',
    icon: Utensils
  },
];

export default function TrackingPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    // Simulasi load data dari localStorage atau API
    const savedOrder = localStorage.getItem('wulfCafeOrder');
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setOrder({
          ...parsedOrder,
          id: `WLF-${Date.now().toString().slice(-6)}`,
          status: 'processing',
          orderTime: new Date().toISOString(),
        });
      } catch (error) {
        // Fallback ke sample data
        setOrder(sampleOrder);
      }
    } else {
      setOrder(sampleOrder);
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

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F9F2ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C67C4E] mx-auto mb-4"></div>
          <p className="text-[#5A5A5A]">Memuat data pesanan...</p>
        </div>
      </div>
    );
  }

  const CurrentStatusIcon = statusSteps.find(step => step.key === order.status)?.icon || ChefHat;

  return (
    <div className="min-h-screen bg-[#F9F2ED] py-6 md:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl font-bold text-[#313131] mb-2 md:text-3xl lg:text-4xl">Lacak Pesanan</h1>
          <p className="text-[#5A5A5A] text-sm md:text-base lg:text-lg">Pantau status pesanan Anda secara real-time</p>
        </div>

        {/* Container max-width untuk konten */}
        <div className="max-w-7xl mx-auto">
          {/* Card 1: Status & Order ID - Layout Center */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E3E3E3] mb-4 text-center md:p-8 md:mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#FFF8F3] rounded-full flex items-center justify-center md:w-20 md:h-20">
                <CurrentStatusIcon className="w-8 h-8 text-[#C67C4E] md:w-10 md:h-10" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-[#313131] mb-2 md:text-2xl lg:text-3xl">
              {statusSteps.find(step => step.key === order.status)?.label}
            </h2>
            <p className="text-[#5A5A5A] mb-4 text-sm md:text-base">
              {statusSteps.find(step => step.key === order.status)?.description}
            </p>
            <div className="border-t border-[#E3E3E3] pt-4">
              <p className="text-xs text-[#5A5A5A] md:text-sm">Order ID</p>
              <p className="text-base font-bold text-[#C67C4E] md:text-lg lg:text-xl">{order.id}</p>
            </div>
          </div>

          {/* Card 2: Detail Pesanan */}
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

          {/* Card 3: Info Pesanan - Layout Between */}
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

          {/* Card 4: Tracking Status */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E3E3E3] mb-4 md:p-6 md:mb-6">
            <h3 className="text-base font-bold text-[#313131] mb-6 md:text-lg lg:text-xl">Status Pesanan</h3>

            <div className="relative">
              {/* Vertical Line */}
              <div
                className="absolute left-5 top-0 w-0.5 bg-[#E3E3E3] md:left-6"
                style={{ height: `${(statusSteps.length - 1) * 7}rem` }}
              ></div>

              <div className="space-y-6 md:space-y-8">
                {statusSteps.map((step, index) => {
                  const isCompleted = statusSteps.findIndex(s => s.key === order.status) >= index;
                  const isCurrent = order.status === step.key;
                  const IconComponent = step.icon;

                  return (
                    <div key={step.key} className="flex items-start gap-3 relative md:gap-4">
                      {/* Status Circle */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 md:w-12 md:h-12 ${
                        isCompleted
                          ? 'bg-[#C67C4E] border-[#C67C4E] text-white'
                          : 'bg-white border-[#E3E3E3] text-[#A0A0A0]'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                        ) : (
                          <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                        )}
                      </div>

                      {/* Status Content */}
                      <div className={`flex-1 ${index === statusSteps.length - 1 ? '' : 'pb-6 md:pb-8'}`}>
                        <h4 className={`text-base font-bold md:text-lg ${
                          isCompleted ? 'text-[#313131]' : 'text-[#A0A0A0]'
                        }`}>
                          {step.label}
                        </h4>
                        <p className={`mt-1 text-sm md:text-base ${
                          isCompleted ? 'text-[#5A5A5A]' : 'text-[#A0A0A0]'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Back Button - Full Width */}
          <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-white border-2 border-[#C67C4E] text-[#C67C4E] hover:bg-[#FFF8F3] font-bold py-3 rounded-xl transition-all duration-200 text-sm md:text-base md:py-4"
            >
              Menu Utama
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-[#C67C4E] hover:bg-[#A0633E] text-white font-bold py-3 rounded-xl transition-all duration-200 text-sm md:text-base md:py-4"
            >
              Cetak Struk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}