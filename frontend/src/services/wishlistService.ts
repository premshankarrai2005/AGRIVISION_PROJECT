import api from "@/lib/api";
import { Product } from "@/types/product";

export interface WishlistResponse {
  success: boolean;
  wishlist: Product[];
}

export const toggleWishlist = async (productId: string) => {
  const response = await api.put(
    `/wishlist/${productId}`
  );

  return response.data;
};

export const getWishlist = async (): Promise<WishlistResponse> => {
  const response =
    await api.get<WishlistResponse>("/wishlist");

  return response.data;
};