export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "farmer" | "buyer";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "farmer" | "buyer" | "admin";
}

export interface LoginResponse {
  success: boolean;
  token: string;
}

export interface CurrentUserResponse {
  success: boolean;
  user: User;
}