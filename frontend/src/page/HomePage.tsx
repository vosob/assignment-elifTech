import { useEffect, useMemo, useState, useRef } from "react";
import type { ShopResponse } from "../types/shop";
import { getShops } from "../api/shops";
import { LoadingError } from "../components/LoadingError";
import { AvailableStores } from "../components/AvailableStores";
import type { ProductResponse } from "../types/product";
import { getProductsByShop } from "../api/products";
import { ProductList } from "../components/ProductList";

type SortBy = "name_asc" | "name_desc" | "price_asc" | "price_desc";

export const HomePage = () => {
  const [shops, setShops] = useState<ShopResponse[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("name_asc");
  const productsCache = useRef<Record<string, ProductResponse[]>>({});

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case "name_asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name_desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "price_asc":
        return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "price_desc":
        return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      default:
        return sorted;
    }
  }, [products, sortBy]);

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getShops();
        console.log(response);
        setShops(response);
        if (response.length > 0) {
          setSelectedShopId(response[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  useEffect(() => {
    if (!selectedShopId) return;

    const fetchProducts = async () => {
      if (productsCache.current[selectedShopId]) {
        setProducts(productsCache.current[selectedShopId]);
        return;
      }

      setProductsLoading(true);
      setProducts([]);

      try {
        const response = await getProductsByShop(selectedShopId);

        productsCache.current[selectedShopId] = response;
        setProducts(response);
      } catch (err) {
        console.error(err);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedShopId]);

  if (loading || error) return <LoadingError loading={loading} error={error} />;

  return (
    <div className="flex flex-col md:flex-row justify-around px-4 md:px-12 py-8 md:py-12 gap-6">
      <AvailableStores
        shops={shops}
        selectedShopId={selectedShopId}
        onSelect={setSelectedShopId}
      />
      <div>
        <label className="flex gap-2 items-center text-sm mb-4 text-gray-500">
          Sort by:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700 cursor-pointer"
          >
            <option value="name_asc">Name: A → Z</option>
            <option value="name_desc">Name: Z → A</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
        </label>
        {productsLoading ? (
          <p>Loading products...</p>
        ) : (
          <ProductList products={sortedProducts} />
        )}
      </div>
    </div>
  );
};
