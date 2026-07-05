"use client";

import { useState } from "react";

interface ProductFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function ProductForm({ onSubmit }: ProductFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    try {
      setLoading(true);

      await onSubmit(formData);

      form.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-4 sm:p-5 md:p-4 space-y-4 max-w-2xl mx-auto"
    >
      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>

        <input
          name="name"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>

        <select
          name="category"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Category</option>
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Grains</option>
          <option>Pulses</option>
          <option>Spices</option>
          <option>Flowers</option>
          <option>Dairy</option>
          <option>Seeds</option>
          <option>Herbs</option>
          <option>Organic Products</option>
          <option>Others</option>
        </select>
      </div>

      {/* Price & Quantity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₹/Kg)
          </label>

          <input
            type="number"
            name="price"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity (Kg)
          </label>

          <input
            type="number"
            name="quantity"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>

        <input
          name="location"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>

        <textarea
          name="description"
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Image
        </label>

        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full text-sm file:mr-4 file:px-3 file:py-2 file:rounded-md file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Adding Product..." : "Add Product"}
      </button>
    </form>
  );
}
