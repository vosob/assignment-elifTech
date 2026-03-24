import type { CreateOrder } from "../types/order";
import { instance } from "./axiosInstant";

export const postOrder = async (order: CreateOrder) => {
  const response = await instance.post("/orders", order);
  return response.data;
};
