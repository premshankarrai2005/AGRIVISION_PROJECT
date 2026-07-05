// getProducts()

// getProductById(id)

// createProduct(data)

// updateProduct(id,data)

// deleteProduct(id)

import api from "@/lib/api";
import {
  Product,
  ProductResponse,
  SingleProductResponse,
  DeleteResponse,
} from "@/types/product";

/*
|--------------------------------------------------------------------------
| Get Logged-in Farmer Products
|--------------------------------------------------------------------------
*/

export const getMyProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductResponse>(
    "/products/my-products"
  );

  return response.data.products;
};

/*
|--------------------------------------------------------------------------
| Get All Products
|--------------------------------------------------------------------------
*/

export const getAllProducts = async (): Promise<ProductResponse> => {
  const response =
    await api.get<ProductResponse>("/products");

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Product By ID
|--------------------------------------------------------------------------
*/

export const getProductById = async (
  id: string
): Promise<Product> => {
  const response =
    await api.get<SingleProductResponse>(
      `/products/${id}`
    );

  return response.data.product;
};

/*
|--------------------------------------------------------------------------
| Delete Product
|--------------------------------------------------------------------------
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
|--------------------------------------------------------------------------
| Create Product
|--------------------------------------------------------------------------
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
|--------------------------------------------------------------------------
| Update Product
|--------------------------------------------------------------------------
*/

export const updateProduct = async (
  id: string,
  data: FormData
) => {
  const response = await api.put(
    `/products/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};