"use client";

import { useEffect, useMemo, useState } from "react";

import toast from "react-hot-toast";

import UserGrid from "@/components/admin/UserGrid";
import UserSearch from "@/components/admin/UserSearch";
import UserFilter from "@/components/admin/UserFilter";

import { User } from "@/types/user";
import { getAllUsers } from "@/services/adminService";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("all");

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();

      setUsers(data.users);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchRole = role === "all" || user.role === role;

      return matchSearch && matchRole;
    });
  }, [users, search, role]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl font-bold">Manage Users</h1>

        <p className="text-gray-500">Search and manage all users</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <UserSearch search={search} setSearch={setSearch} />
        </div>

        <UserFilter role={role} setRole={setRole} />
      </div>

      <UserGrid users={filteredUsers} reloadUsers={loadUsers} />
    </div>
  );
}
