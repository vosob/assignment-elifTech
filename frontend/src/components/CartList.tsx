import { useCart } from "../context/CartContext";

export const CartList = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <p className="text-center text-gray-400 py-12 text-xl">
        Your cart is empty
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <img
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl shrink-0"
              src={item.image}
              alt={item.name}
            />

            <div className="flex flex-1 flex-col justify-between min-w-0">
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <p className="text-base font-semibold text-gray-800 truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-400 truncate">
                    {item.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">${item.price}</p>
                </div>

                <button
                  className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer shrink-0"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <button
                  disabled={item.quantity === 1}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 rounded-lg transition-colors cursor-pointer font-medium"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span className="text-sm font-semibold text-gray-800 w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors cursor-pointer font-medium"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <span className="text-gray-500">Total price:</span>
        <span className="text-xl font-bold text-gray-900">
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
