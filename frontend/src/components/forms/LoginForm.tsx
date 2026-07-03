"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { loginUser, getCurrentUser } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

interface LoginData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();

  const { setToken, setUser } = useAuthStore();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      setLoading(true);

      // Login
      const loginResponse = await loginUser(data);

      // Save JWT
      setToken(loginResponse.token);

      // Get Current User
      const userResponse = await getCurrentUser();

      setUser(userResponse.user);

      toast.success("Login Successful");

      // Redirect based on role
      switch (userResponse.user.role) {
        case "farmer":
          router.push("/farmer");
          break;

        case "buyer":
          router.push("/buyer");
          break;

        case "admin":
          router.push("/admin");
          break;

        default:
          router.push("/");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
          {...register("email", {
            required: "Email is required",
          })}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.email?.message}
        </p>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter password"
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
          {...register("password", {
            required: "Password is required",
          })}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.password?.message}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}