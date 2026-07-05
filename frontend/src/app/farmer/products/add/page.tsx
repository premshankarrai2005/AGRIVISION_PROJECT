"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import ProductForm from "@/components/products/ProductForm";
import { createProduct } from "@/services/productService";

export default function AddProductPage() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      await createProduct(formData);

      toast.success("Product Added Successfully");

      router.push("/farmer/products");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add product"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto ">

      <h1 className="text-3xl text-center font-bold mb-3">
        Add New Product
      </h1>

      <ProductForm onSubmit={handleSubmit} />

    </div>
  );
}