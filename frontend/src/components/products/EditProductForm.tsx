"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";

interface EditProductFormProps {
  product: Product;
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function EditProductForm({
  product,
  onSubmit,
}: EditProductFormProps) {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setQuantity(product.quantity);
    setLocation(product.location);
    setDescription(product.description);
    setPreview(product.image);
  }, [product]);

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (name.trim().length < 3) {
      alert("Product name should contain at least 3 characters.");
      return;
    }

    if (price <= 0) {
      alert("Price must be greater than zero.");
      return;
    }

    if (quantity <= 0) {
      alert("Quantity must be greater than zero.");
      return;
    }

    if (location.trim() === "") {
      alert("Location is required.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", String(price));
    formData.append("quantity", String(quantity));
    formData.append("location", location);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);

      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white shadow-lg rounded-xl p-8 space-y-6"
    >
      <div>
        <label className="font-medium">
          Product Name
        </label>

        <input
          className="w-full border rounded-lg p-3 mt-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="font-medium">
          Category
        </label>

        <select
          className="w-full border rounded-lg p-3 mt-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Grains</option>
          <option>Pulses</option>
          <option>Flowers</option>
          <option>Seeds</option>
          <option>Spices</option>
          <option>Dairy</option>
          <option>Organic Products</option>
          <option>Others</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="font-medium">
            Price (₹)
          </label>

          <input
            type="number"
            className="w-full border rounded-lg p-3 mt-2"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="font-medium">
            Quantity (Kg)
          </label>

          <input
            type="number"
            className="w-full border rounded-lg p-3 mt-2"
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
          />
        </div>
      </div>

      <div>
        <label className="font-medium">
          Location
        </label>

        <input
          className="w-full border rounded-lg p-3 mt-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div>
        <label className="font-medium">
          Description
        </label>

        <textarea
          rows={5}
          className="w-full border rounded-lg p-3 mt-2"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />
      </div>

      <div>
        <label className="font-medium">
          Current / New Image
        </label>

        {preview && (
          <div className="relative w-60 h-60 mt-4">
            <Image
              src={preview}
              alt={name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="mt-5"
          onChange={handleImage}
        />
      </div>

      <div className="flex gap-4">
        <button
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          {loading
            ? "Updating..."
            : "Update Product"}
        </button>

        <button
          type="reset"
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
        >
          Reset
        </button>
      </div>
    </form>
  );
}