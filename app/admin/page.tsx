"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-5">
        <a
          href="/admin/products"
          className="p-6 bg-black text-white rounded-xl shadow cursor-pointer"
        >
          Manage Products
        </a>

        <a
          href="/admin/products/add"
          className="p-6 bg-gray-800 text-white rounded-xl shadow cursor-pointer"
        >
          Add Product
        </a>
      </div>
    </div>
  );
}
