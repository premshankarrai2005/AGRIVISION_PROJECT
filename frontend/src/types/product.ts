// export interface Product {
//   _id: string;

//   name: string;

//   description: string;

//   category: string;

//   price: number;

//   quantity: number;

//   image: string;

//   farmer: string;

//   createdAt: string;
// }

export interface ProductFormData {
  name: string;

  description: string;

  category: string;

  price: number;
  
  location: string;

  quantity: number;

  image?: File | null;
}

export interface Farmer {
  _id: string;
  name: string;
  email?: string;
}

export interface Product {
  _id: string;

  farmer: Farmer;

  name: string;

  category: string;

  quantity: number;

  price: number;

  location: string;

  description: string;

  image: string;

  status: "available" | "out_of_stock";

  averageRating: number;

  totalReviews: number;

  createdAt: string;

  updatedAt: string;
}

export interface ProductResponse {
  success: boolean;
  products: Product[];
  count?: number;

  page?: number;

  totalPages?: number;

  totalProducts?: number;
}

export interface SingleProductResponse {
  success: boolean;

  product: Product;
}

export interface DeleteResponse {
  success: boolean;

  message: string;
}