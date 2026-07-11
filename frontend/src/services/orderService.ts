import api from "@/lib/api";
import {
  OrdersResponse,
  OrderResponse,
} from "@/types/order";

export const placeOrder = async (data: {
  deliveryAddress: string;
  phone: string;
  paymentMethod: string;
}) => {
  const response =
    await api.post<OrderResponse>(
      "/orders",
      data
    );

  return response.data;
};

export const getBuyerOrders = async () => {
  const response =
    await api.get("/orders/my-orders");

  return response.data;
};

export const getFarmerOrders = async () => {
  const response =
    await api.get(
      "/orders/farmer-orders"
    );

  return response.data;
};

export const getOrderById = async (
  id: string
) => {
  const response =
    await api.get(`/orders/${id}`);

  return response.data;
};

export const updateOrderStatus = async (
  id: string,
  status: string
) => {
  const response =
    await api.put(
      `/orders/${id}/status`,
      {
        status,
      }
    );

  return response.data;
};

export const cancelOrder = async (
  id: string
) => {
  const response =
    await api.delete(`/orders/${id}`);

  return response.data;
};