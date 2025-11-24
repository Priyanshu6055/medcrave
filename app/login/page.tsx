"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMsg(data.message);

    if (data.success) router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white/10 backdrop-blur-xl p-8 shadow-2xl rounded-2xl border border-white/20"
      >
        <h1 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
          Admin Login
        </h1>

        {/* Email Input */}
        <div className="mb-4">
          <label className="text-gray-200 text-sm font-medium">Email</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full mt-1 p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="text-gray-200 text-sm font-medium">Password</label>
          <input
            type="password"
            required
            placeholder="Enter password"
            className="w-full mt-1 p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Login Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-500 transition text-white font-semibold py-3 rounded-lg shadow-lg"
        >
          Login
        </button>

        {/* Message */}
        {msg && (
          <p className="text-center text-sm mt-4 text-red-300 font-medium">
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}
