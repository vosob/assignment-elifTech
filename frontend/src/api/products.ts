import type { ProductResponse } from "../types/product";
import { instance } from "./axiosInstant";

export const getProductsByShop = async (
  shopId: string,
): Promise<ProductResponse[]> => {
  const response = await instance.get(`/shops/${shopId}/products`);
  return response.data;
};
