"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import SearchBar from "@/components/products/SearchBar";
import FilterBar from "@/components/products/FilterBar";
import Pagination from "@/components/products/Pagination";
import BuyerProductGrid from "@/components/products/BuyerProductGrid";

import {
  getAllProducts,
} from "@/services/productService";

import { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data =
        await getAllProducts({
          page,
          search,
          category,
          sort,
        });

      setProducts(data.products);

      setTotalPages(data.totalPages);
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
    const timer = setTimeout(() => {
      loadProducts();
    }, 500);

    return () => clearTimeout(timer);
  }, [page, search, category, sort]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Fresh Farm Products 🌾
      </h1>

      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
        />
      </div>

      <div className="mb-6">
        <FilterBar
          category={category}
          status="All"
          sort={sort}
          onCategoryChange={setCategory}
          onStatusChange={() => {}}
          onSortChange={setSort}
          onReset={() => {
            setSearch("");
            setCategory("All");
            setSort("");
            setPage(1);
          }}
        />
      </div>

      <BuyerProductGrid
        products={products}
      />

      <div className="mt-8">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

    </div>
  );
}