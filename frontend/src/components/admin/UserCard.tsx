"use client";

import { User } from "@/types/user";
import { deleteUser } from "@/services/adminService";
import toast from "react-hot-toast";
import { updateUserRole } from "@/services/adminService";

interface Props {
  user: User;
  reloadUsers: () => void;
}

export default function UserCard({ user, reloadUsers }: Props) {
  const handleDelete = async () => {
    const ok = window.confirm(`Delete ${user.name}?`);

    if (!ok) return;

    try {
      await deleteUser(user._id);

      toast.success("User deleted");

      reloadUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };
  const handleRoleChange = async (role: string) => {
    try {
      await updateUserRole(user._id, role);

      toast.success("Role Updated");

      reloadUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="text-xl font-bold">{user.name}</h2>

      <p className="mt-2 text-gray-500">{user.email}</p>

      <p>{user.phone}</p>

      {/* Role Badge */}
      <span
        className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
          user.role === "admin"
            ? "bg-red-100 text-red-700"
            : user.role === "farmer"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
        }`}
      >
        {user.role.toUpperCase()}
      </span>

      {/* Change Role */}
      {user.role !== "admin" && (
        <select
          value={user.role}
          onChange={(e) => handleRoleChange(e.target.value)}
          className="mt-4 w-full rounded-lg border p-2"
        >
          <option value="buyer">Buyer</option>

          <option value="farmer">Farmer</option>
        </select>
      )}

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="mt-5 w-full rounded-lg bg-red-600 py-2 text-white hover:bg-red-700"
      >
        Delete User
      </button>
    </div>
  );
}
