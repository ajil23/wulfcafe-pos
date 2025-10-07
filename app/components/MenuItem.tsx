interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface MenuItemProps {
  item: MenuItem;
  quantity: number;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
}

export default function MenuItem({
  item,
  quantity,
  onUpdateQuantity,
}: MenuItemProps) {
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/300x200/F9F2ED/313131?text=No+Image';
  };

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-[#E3E3E3] hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="aspect-[4/3] rounded-lg overflow-hidden mb-2">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-bold text-[#313131] line-clamp-1 md:text-base">{item.name}</h3>
        <p className="text-[#5A5A5A] text-xs mt-1 line-clamp-2 min-h-[2.5rem] md:text-sm">
          {item.description}
        </p>
        <p className="text-[#C67C4E] font-bold mt-2 text-base md:text-lg">
          Rp {item.price.toLocaleString('id-ID')}
        </p>
      </div>

      <div className="mt-2 flex justify-end">
        {quantity === 0 ? (
          <button
            onClick={handleIncrement}
            className="w-9 h-9 rounded-full bg-[#C67C4E] flex items-center justify-center hover:bg-[#A0633E] transition-colors md:w-10 md:h-10"
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
          <div className="flex items-center border border-[#E3E3E3] rounded-full">
            <button
              onClick={handleDecrement}
              className="w-9 h-9 flex items-center justify-center text-[#313131] hover:bg-[#F9F2ED] rounded-l-full md:w-10 md:h-10"
              aria-label={`Kurangi ${item.name}`}
            >
              <span className="text-base font-bold">−</span>
            </button>
            <span className="px-2 font-bold text-[#313131] min-w-[32px] text-center text-base md:min-w-[36px] md:text-lg">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-9 h-9 flex items-center justify-center text-[#313131] hover:bg-[#F9F2ED] rounded-r-full md:w-10 md:h-10"
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