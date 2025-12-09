"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// Added icons for better context and the eye toggle
import { FaLock, FaEnvelope, FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" as "error" | "success" | "" });
  // NEW STATE: To control password visibility
  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ message: "", type: "" });

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({ message: "Login successful! Redirecting...", type: "success" });
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 1000);
      } else {
        setStatus({ message: data.message || "Login failed. Check your credentials.", type: "error" });
      }
    } catch (error) {
      setStatus({ message: "Network error. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const getStatusClasses = () => {
    if (status.type === "error") return "text-red-300 bg-red-900/30 border-red-700/50";
    if (status.type === "success") return "text-blue-300 bg-blue-900/30 border-blue-700/50";
    return "";
  };

  // NEW FUNCTION: Toggle the visibility state
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl p-10 shadow-3xl rounded-3xl border border-white/20 transition-all duration-300 hover:shadow-blue-500/20"
      >
        <h1 className="text-4xl font-extrabold text-white text-center mb-2 drop-shadow-md tracking-wider">
          Admin Console
        </h1>
        <p className="text-center text-gray-400 mb-8 text-sm">Sign in to access the dashboard.</p>

        {/* Email Input (No Change) */}
        <div className="mb-5">
          <label 
            htmlFor="email-input"
            className="text-gray-200 text-sm font-medium block mb-1 hover:text-white transition-colors cursor-pointer"
          >
            <FaEnvelope className="inline-block mr-2 align-text-bottom text-blue-400" /> 
            Email Address
          </label>
          <input
            id="email-input"
            type="email"
            required
            placeholder="admin@example.com"
            disabled={loading}
            className="w-full p-3 bg-white/10 text-white placeholder-gray-400 border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-300 shadow-inner disabled:opacity-75 disabled:cursor-not-allowed"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
          />
        </div>

        {/* PASSWORD INPUT (UPDATED) */}
        <div className="mb-8">
          <label 
            htmlFor="password-input"
            className="text-gray-200 text-sm font-medium block mb-1 hover:text-white transition-colors cursor-pointer"
          >
            <FaLock className="inline-block mr-2 align-text-bottom text-blue-400" />
            Password
          </label>
          {/* Added relative positioning to contain the input and the button */}
          <div className="relative"> 
            <input
              id="password-input"
              // DYNAMIC TYPE: Toggles between 'password' and 'text'
              type={showPassword ? "text" : "password"} 
              required
              placeholder="••••••••"
              disabled={loading}
              className="w-full p-3 pr-12 bg-white/10 text-white placeholder-gray-400 border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-300 shadow-inner disabled:opacity-75 disabled:cursor-not-allowed"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
            />
            {/* TOGGLE BUTTON */}
            <button
              type="button" // Important: prevents form submission
              onClick={togglePasswordVisibility}
              disabled={loading}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-blue-400 transition-colors disabled:cursor-not-allowed"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {/* DYNAMIC ICON: Changes based on password state */}
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        {/* Login Button (No Change) */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-bold py-3 rounded-xl shadow-xl transition duration-300 flex items-center justify-center space-x-2 
            ${loading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/50'
            }
          `}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <span>Login</span>
          )}
        </button>

        {/* Message (No Change) */}
        {status.message && (
          <div className={`text-center text-sm mt-6 p-3 rounded-lg border font-medium ${getStatusClasses()}`}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}