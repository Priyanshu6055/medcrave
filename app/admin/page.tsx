"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
  });

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) =>
        setStats({
          products: data?.products?.length || 0,
        })
      );
  }, []);

  return (
    <div className="min-h-screen p-10 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-lg">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        <DashboardCard
          title="Total Products"
          value={stats.products}
          link="/admin/products"
        />

        <DashboardCard
          title="Add Product"
          value="+"
          link="/admin/products/add"
        />
      </div>
    </div>
  );
}

// Dashboard Card Component
function DashboardCard({
  title,
  value,
  link,
}: {
  title: string;
  value: any;
  link: string;
}) {
  return (
    <a
      href={link}
      className="group bg-white/10 backdrop-blur-lg border border-white/20 
                 rounded-2xl p-7 shadow-xl transition transform 
                 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/20"
    >
      <h2 className="text-xl font-semibold text-gray-200 group-hover:text-white">
        {title}
      </h2>

      <p className="text-5xl mt-4 font-extrabold text-blue-400 group-hover:text-blue-300 transition">
        {value}
      </p>
    </a>
  );
}
