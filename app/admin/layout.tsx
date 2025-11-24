export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h1 className="text-2xl font-bold mb-5">Admin Panel</h1>

        <nav className="space-y-3">
          <a href="/admin/dashboard" className="block hover:text-gray-300">
            Dashboard
          </a>

          <a href="/admin/products" className="block hover:text-gray-300">
            Products
          </a>

          <a href="/admin/products/add" className="block hover:text-gray-300">
            Add Product
          </a>

          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="mt-10 w-full bg-red-600 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </form>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-0.5">{children}</main>
    </div>
  );
}
