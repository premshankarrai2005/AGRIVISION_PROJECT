import api from "@/lib/api";
import { User } from "@/types/user";

export interface UsersResponse {
  success: boolean;
  count: number;
  users: User[];
}

export const getAllUsers = async (): Promise<UsersResponse> => {
  const response = await api.get<UsersResponse>("/admin/users");

  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

export const updateUserRole = async (
  id: string,
  role: string
) => {
  const response = await api.put(
    `/admin/users/${id}/role`,
    {
      role,
    }
  );

  return response.data;
};

export const getAllProducts = async () => {
  const response =
    await api.get("/admin/products");

  return response.data;
};

export const deleteProduct = async (
  id: string
) => {
  const response = await api.delete(
    `/admin/products/${id}`
  );

  return response.data;
};