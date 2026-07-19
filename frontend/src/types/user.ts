export interface User {
  _id: string;

  name: string;

  email: string;

  phone: string;

  role: "admin" | "buyer" | "farmer";

  createdAt: string;
}