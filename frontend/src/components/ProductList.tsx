import type { ProductResponse } from "../types/product";
import { ProductCard } from "./ProductCard";

interface Props {
  products: ProductResponse[];
}

export const ProductList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
