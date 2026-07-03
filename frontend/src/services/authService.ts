import api from "@/lib/api";
import {
  LoginData,
  RegisterData,
  CurrentUserResponse,
  LoginResponse,
} from "@/types/auth";

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (
  data: LoginData
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
  const response = await api.get("/auth/me");
  return response.data;
};