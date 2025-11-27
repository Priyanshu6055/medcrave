"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-10 w-full bg-red-600 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
