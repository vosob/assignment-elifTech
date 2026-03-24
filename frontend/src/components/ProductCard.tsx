import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import type { ProductResponse } from "../types/product";

interface Props {
  product: ProductResponse;
}

export const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();

  return (
    <div className="w-[420px] rounded-2xl border border-gray-200 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover object-center"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-xl">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-xl">${product.price}</span>
          <button
            onClick={() => {
              addToCart(product);
              toast.success("Product added to cart");
            }}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
