import { Product } from "./product";

export interface OrderItem {
  product: Product;
  farmer: {
    _id: string;
    name: string;
    email: string;
  };
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;

  buyer: {
    _id: string;
    name: string;
    email: string;
  };

  products: OrderItem[];

  totalAmount: number;

  deliveryAddress: string;

  phone: string;

  paymentMethod: "COD" | "Online";

  paymentStatus:
    | "Pending"
    | "Paid"
    | "Failed";

  orderStatus:
    | "Pending"
    | "Accepted"
    | "Packed"
    | "Shipped"
    | "Delivered"
    | "Cancelled";

  createdAt: string;

  updatedAt: string;
}

export interface OrdersResponse {
  success: boolean;
  orders: Order[];
}

export interface OrderResponse {
  success: boolean;
  order: Order;
}