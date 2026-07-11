import { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  items: CartItem[];
}

export interface CartResponse {
  success: boolean;
  cart: Cart;
  subtotal: number;
  delivery: number;
  total: number;
}