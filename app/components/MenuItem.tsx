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
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E3E3E3] hover:shadow-md transition-all duration-300 flex flex-col h-full hover:scale-[1.02]">
      <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-sm font-bold text-[#313131] line-clamp-2 leading-tight md:text-base lg:text-lg min-h-[2.5rem]">
          {item.name}
        </h3>
        <p className="text-[#5A5A5A] text-xs mt-2 line-clamp-2 flex-1 md:text-sm">
          {item.description}
        </p>
        <p className="text-[#C67C4E] font-bold mt-3 text-base md:text-lg lg:text-xl">
          Rp {item.price.toLocaleString('id-ID')}
        </p>
      </div>

      <div className="mt-3 flex justify-end">
        {quantity === 0 ? (
          <button
            onClick={handleIncrement}
            className="w-10 h-10 rounded-full bg-[#C67C4E] flex items-center justify-center hover:bg-[#A0633E] transition-all duration-200 shadow-md hover:shadow-lg md:w-12 md:h-12 lg:w-14 lg:h-14"
            aria-label={`Tambah ${item.name}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white md:h-6 md:w-6"
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
          <div className="flex items-center border border-[#E3E3E3] rounded-full bg-white shadow-sm">
            <button
              onClick={handleDecrement}
              className="w-10 h-10 flex items-center justify-center text-[#313131] hover:bg-[#F9F2ED] rounded-l-full transition-colors md:w-12 md:h-12"
              aria-label={`Kurangi ${item.name}`}
            >
              <span className="text-lg font-bold md:text-xl">−</span>
            </button>
            <span className="px-3 font-bold text-[#313131] min-w-[2rem] text-center text-base md:text-lg lg:min-w-[2.5rem]">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-10 h-10 flex items-center justify-center text-[#313131] hover:bg-[#F9F2ED] rounded-r-full transition-colors md:w-12 md:h-12"
              aria-label={`Tambah ${item.name}`}
            >
              <span className="text-lg font-bold md:text-xl">+</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}