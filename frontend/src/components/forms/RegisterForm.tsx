"use client";

import { useForm } from "react-hook-form";
import { RegisterData } from "@/types/auth";
import { registerUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface FormData extends RegisterData {
  confirmPassword: string;
}

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      await registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      });

      toast.success("Registration Successful");

      router.push("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Name */}

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Name
        </label>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400 focus:border-green-500"
          {...register("name", {
            required: "Name is required",
          })}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.name?.message}
        </p>
      </div>

      {/* Email */}

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400 focus:border-green-500"
          {...register("email", {
            required: "Email is required",
          })}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.email?.message}
        </p>
      </div>

      {/* Phone */}

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Phone Number
        </label>

        <input
          type="text"
          placeholder="Enter phone number"
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400 focus:border-green-500"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Enter a valid 10 digit phone number",
            },
          })}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.phone?.message}
        </p>
      </div>

      {/* Password */}

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter password"
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400 focus:border-green-500"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters required",
            },
          })}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.password?.message}
        </p>
      </div>

      {/* Confirm Password */}

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Confirm Password
        </label>

        <input
          type="password"
          placeholder="Confirm password"
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400 focus:border-green-500"
          {...register("confirmPassword", {
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.confirmPassword?.message}
        </p>
      </div>

      {/* Role */}

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Role
        </label>

        <select
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black focus:border-green-500"
          {...register("role")}
        >
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}