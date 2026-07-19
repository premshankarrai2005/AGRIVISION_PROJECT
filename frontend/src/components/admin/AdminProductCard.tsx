"use client";

import toast from "react-hot-toast";

import { deleteProduct } from "@/services/adminService";

interface Props {
  product: any;
  reloadProducts: () => void;
}

export default function AdminProductCard({
  product,
  reloadProducts,
}: Props) {

  const handleDelete = async () => {

    if (
      !window.confirm(
        "Delete this product?"
      )
    )
      return;

    try {

      await deleteProduct(product._id);

      toast.success("Deleted");

      reloadProducts();

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
          "Failed"
      );

    }

  };

  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <img
        src={product.image}
        alt={product.name}
        className="h-44 w-full rounded-lg object-cover"
      />

      <h2 className="mt-4 text-xl font-bold">
        {product.name}
      </h2>

      <p className="mt-2 text-green-700 font-semibold">
        ₹{product.price}
      </p>

      <p className="mt-2 text-gray-500">
        Farmer:
        {" "}
        {product.farmer?.name}
      </p>

      <p className="text-gray-500">
        {product.category}
      </p>

      <button
        onClick={handleDelete}
        className="mt-5 w-full rounded-lg bg-red-600 py-2 text-white"
      >
        Delete Product
      </button>

    </div>
  );
}