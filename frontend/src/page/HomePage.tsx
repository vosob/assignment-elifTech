import { useEffect, useState } from "react";
import type { ShopResponse } from "../types/shop";
import { getShops } from "../api/shops";
import { LoadingError } from "../components/LoadingError";
import { AvailableStores } from "../components/AvailableStores";
import type { ProductResponse } from "../types/product";
import { getProductsByShop } from "../api/products";
import { ProductList } from "../components/ProductList";

export const HomePage = () => {
  const [shops, setShops] = useState<ShopResponse[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getShops();
        setShops(response);
        setSelectedShopId(response[0].id);
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
      try {
        const response = await getProductsByShop(selectedShopId);
        setProducts(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [selectedShopId]);

  if (loading || error) return <LoadingError loading={loading} error={error} />;

  return (
    <div className="flex justify-around px-12 py-12">
      <AvailableStores
        shops={shops}
        selectedShopId={selectedShopId}
        onSelect={setSelectedShopId}
      />
      <ProductList products={products} />
    </div>
  );
};
