// export default function ProductsPage() {
//   return <h1 className="text-3xl font-bold">Products</h1>;
// }

"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Product } from "@/types/product";

import {
  deleteProduct,
  getMyProducts,
} from "@/services/productService";

import ProductGrid from "@/components/products/ProductGrid";

import Link from "next/link";

export default function FarmerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  // ----------------------------
  // Load Products
  // ----------------------------

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getMyProducts();

      setProducts(data);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ----------------------------
  // Delete Product
  // ----------------------------

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      toast.success("Product deleted successfully");

      loadProducts();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  // ----------------------------
  // Loading
  // ----------------------------

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">

        <h2 className="text-2xl font-bold">
          Loading Products...
        </h2>

      </div>
    );
  }

  return (
    <div className="p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            My Products
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all your farm products.
          </p>

        </div>

        <Link
          href="/farmer/products/add"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Product
        </Link>

      </div>

      <ProductGrid
        products={products}
        onDelete={handleDelete}
      />

    </div>
  );
}