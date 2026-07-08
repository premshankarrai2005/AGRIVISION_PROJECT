import api from "@/lib/api";
import {
  Product,
  ProductResponse,
  SingleProductResponse,
  DeleteResponse,
} from "@/types/product";

/*
| Get Logged-in Farmer Products
*/

interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  sort?: string;
}

export const getMyProducts = async (
  params: ProductQuery = {}
) => {
  const response = await api.get(
    "/products/my-products",
    {
      params,
    }
  );

  return response.data;
};

/*
| Get All Products
*/

export const getAllProducts = async (
  params: ProductQuery = {}
) => {
  const response = await api.get(
    "/products",
    {
      params,
    }
  );

  return response.data;
};

/*
| Get Product By ID
*/

export const getProductById = async (
  id: string
): Promise<Product> => {
  const response = await api.get(
    `/products/${id}`
  );

  return response.data.product;
};

/*
| Delete Product
*/

export const deleteProduct = async (
  id: string
): Promise<DeleteResponse> => {
  const response =
    await api.delete<DeleteResponse>(
      `/products/${id}`
    );

  return response.data;
};

/*
| Create Product
*/

export const createProduct = async (
  data: FormData
) => {
  const response = await api.post(
    "/products",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/*
| Update Product
*/

export const updateProduct = async (
  id: string,
  formData: FormData
) => {
  const response = await api.put(
    `/products/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};