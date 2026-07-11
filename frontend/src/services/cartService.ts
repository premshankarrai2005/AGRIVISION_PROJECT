import api from "@/lib/api";
import { CartResponse } from "@/types/cart";

export const getCart = async (): Promise<CartResponse> => {
  const response = await api.get("/cart");

  return response.data;
};

export const addToCart = async (
  productId: string,
  quantity = 1
) => {
  const response = await api.post(
    `/cart/${productId}`,
    { quantity }
  );

  return response.data;
};

export const updateCart = async (
  productId: string,
  quantity: number
) => {
  const response = await api.put(
    `/cart/${productId}`,
    { quantity }
  );

  return response.data;
};

export const removeFromCart = async (
  productId: string
) => {
  const response = await api.delete(
    `/cart/${productId}`
  );

  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/cart");

  return response.data;
};