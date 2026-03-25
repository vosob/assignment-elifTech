import clsx from "clsx";
import type { ShopResponse } from "../types/shop";
import { useMemo, useState } from "react";

interface Props {
  shops: ShopResponse[];
  selectedShopId: string | null;
  onSelect: (id: string) => void;
}
type SortBy = "rate-by-increase" | "rate-by-decrease";

export const AvailableStores = ({ shops, selectedShopId, onSelect }: Props) => {
  const [sortByRate, setSortByRate] = useState<SortBy>("rate-by-increase");

  const sortedShops = useMemo(() => {
    const sorted = [...shops];
    switch (sortByRate) {
      case "rate-by-increase":
        return sorted.sort((a, b) => a.shopRate - b.shopRate);
      case "rate-by-decrease":
        return sorted.sort((a, b) => b.shopRate - a.shopRate);

      default:
        return sorted;
    }
  }, [shops, sortByRate]);

  return (
    <aside className="w-full  md:min-w-xs md:max-w-xs">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Shops available for delivery:
      </h2>

      <label className="flex items-center gap-2 mb-4 text-gray-700">
        Sort by rating:
        <select
          value={sortByRate}
          onChange={(e) => setSortByRate(e.target.value as SortBy)}
          className="cursor-pointer border border-gray-200 rounded-lg px-3 py-2"
        >
          <option value="rate-by-increase">Rate by increase</option>
          <option value="rate-by-decrease">Rate by decrease</option>
        </select>
      </label>

      <ul className="flex flex-row md:flex-col gap-3 overflow-x-auto pb-2 md:pb-0">
        {sortedShops.map((shop) => (
          <li key={shop.id} className="shrink-0">
            <button
              onClick={() => onSelect(shop.id)}
              className={clsx(
                "flex items-center gap-2 cursor-pointer whitespace-nowrap px-3 py-1.5 rounded-lg transition-colors min-w-37.5",
                shop.id === selectedShopId
                  ? "bg-slate-900 text-white"
                  : "hover:bg-slate-100",
              )}
            >
              <span>{shop.name}</span>
              <span
                className={clsx(
                  "text-xs",
                  shop.id === selectedShopId
                    ? "text-slate-300"
                    : "text-slate-400",
                )}
              >
                {shop.shopRate} ⭐
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
