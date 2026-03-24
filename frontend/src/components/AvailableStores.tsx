import clsx from "clsx";
import type { ShopResponse } from "../types/shop";

interface Props {
  shops: ShopResponse[];
  selectedShopId: string | null;
  onSelect: (id: string) => void;
}

export const AvailableStores = ({ shops, selectedShopId, onSelect }: Props) => {
  return (
    <aside className="min-w-1/4">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Shops available for delivery:
      </h2>
      <ul className="flex flex-col gap-4 text-2xl">
        {shops.map((shop) => (
          <li key={shop.id}>
            <button
              onClick={() => onSelect(shop.id)}
              className={clsx(
                "text-xl cursor-pointer",
                shop.id === selectedShopId ? "font-bold" : "",
              )}
            >
              {shop.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
