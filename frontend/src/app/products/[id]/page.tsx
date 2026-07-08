"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import ProductDetailsByer from "@/components/products/ProductDetailsByer";

import { Product } from "@/types/product";

import { getProductById } from "@/services/productService";

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const data = await getProductById(
        id as string
      );

      setProduct(data);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Product not found"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="p-10">
        Loading...
      </div>
    );

  if (!product)
    return (
      <div className="p-10">
        Product not found
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl p-10">

      <ProductDetailsByer product={product} />

    </div>
  );
}