"use client";

import { useState, useEffect } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 🔥 Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch products (search + pagination)
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `/api/products/search?q=${debouncedQuery}&page=${page}&limit=9`
      );

      const data = await res.json();

      setProducts(data.products);
      setTotalPages(data.totalPages);
    };

    fetchProducts();
  }, [debouncedQuery, page]);

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* TITLE */}
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-lg">
        Manage Products
      </h1>

      {/* SEARCH BAR */}
      <div className="mb-8">
        <input
          type="text"
          value={query}
          placeholder="Search products..."
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="w-full p-4 bg-white/10 text-white placeholder-gray-300 
                     border border-white/20 rounded-xl shadow-xl
                     focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>

      {/* PRODUCT GRID */}
      {products.length === 0 ? (
        <p className="text-gray-400 text-lg mt-10">No products found...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p: any) => (
            <div
              key={p._id}
              className="bg-white/10 border border-white/20 backdrop-blur-xl 
                         rounded-2xl p-6 shadow-xl transition hover:bg-white/20"
            >
              {/* Product Name */}
              <h2 className="text-2xl font-bold">{p.name}</h2>

              {/* Category */}
              <p className="text-gray-300 text-sm mt-1">{p.category}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {p.tags?.slice(0, 4).map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="bg-blue-600/30 text-blue-200 px-3 py-1 rounded-full text-xs backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <a
                  href={`/admin/products/edit/${p._id}`}
                  className="text-blue-400 hover:text-blue-300 transition"
                >
                  Edit
                </a>

                <DeleteButton id={p._id} setProducts={setProducts} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-white/10 border border-white/20 
                     rounded-lg text-white disabled:opacity-40 
                     hover:bg-white/20 transition"
        >
          Prev
        </button>

        <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg">
          {page} / {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-white/10 border border-white/20 
                     rounded-lg text-white disabled:opacity-40 
                     hover:bg-white/20 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

/* DELETE BUTTON */
function DeleteButton({ id, setProducts }: any) {
  const deleteProduct = async () => {
    if (!confirm("Delete this product?")) return;

    await fetch(`/api/products/${id}`, { method: "DELETE" });

    setProducts((prev: any[]) => prev.filter((p) => p._id !== id));
  };

  return (
    <button
      onClick={deleteProduct}
      className="text-red-400 hover:text-red-300 transition"
    >
      Delete
    </button>
  );
}
