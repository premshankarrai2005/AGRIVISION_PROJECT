export interface Product {
  _id: string;

  name: string;

  description: string;

  category: string;

  price: number;

  quantity: number;

  image: string;

  farmer: string;

  createdAt: string;
}

export interface ProductFormData {
  name: string;

  description: string;

  category: string;

  price: number;

  quantity: number;

  image: string;
}