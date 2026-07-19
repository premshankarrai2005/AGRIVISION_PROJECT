"use client";

import { useMemo } from "react";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { getAllProducts } from "@/services/adminService";

import AdminProductGrid from "@/components/admin/AdminProductGrid";
import ProductSearch from "@/components/admin/ProductSearch";
import ProductCategoryFilter from "@/components/admin/ProductCategoryFilter";
import ProductStatusFilter from "@/components/admin/ProductStatusFilter";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [status, setStatus] = useState("all");
  const [products, setProducts] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();

      setProducts(data.products);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory = category === "all" || product.category === category;

      const matchStatus = status === "all" || product.status === status;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [products, search, category, status]);

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-4xl font-bold">Manage Products</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <ProductSearch search={search} setSearch={setSearch} />
        </div>

        <ProductCategoryFilter category={category} setCategory={setCategory} />

        <ProductStatusFilter status={status} setStatus={setStatus} />
      </div>

      <AdminProductGrid
        products={filteredProducts}
        reloadProducts={loadProducts}
      />
    </div>
  );
}
