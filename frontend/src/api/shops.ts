import type { ShopResponse } from "../types/shop";
import { instance } from "./axiosInstant";

export const getShops = async (): Promise<ShopResponse[]> => {
  const response = await instance.get("/shops");
  return response.data;
};
