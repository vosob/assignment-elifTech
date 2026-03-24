import type { ProductResponse } from "../types/product";
import { ProductCard } from "./ProductCard";

interface Props {
  products: ProductResponse[];
}

export const ProductList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
