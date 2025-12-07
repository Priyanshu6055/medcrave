"use client";
import React from "react";
import { useEffect, useState } from "react";
import BannerWrapper from "@/components/about/AboutBannerWrapper";

export default function CategoryProductsPage(props: any) {
  const params = React.use(props.params);
  const slug = params.slug;

  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  /* ⭐ Fetch category products */
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    fetch(`${baseUrl}/api/products/category/${slug}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFiltered(data.products);
      });
  }, [slug]);

  /* ⭐ Real-time Search */
  useEffect(() => {
    const result = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    setFiltered(result);
    setCurrentPage(1);
  }, [search, products]);

  /* ⭐ Pagination Logic */
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ⭐ Dynamic Banner */}
      <BannerWrapper
        heading={slug.toUpperCase()}
        subtitle={`Explore all premium ${slug} products`}
      />

      <section className="py-20">
        <div className="container-global px-4 md:px-8 max-w-7xl mx-auto">
          
          {/* ⭐ Header & Search Section */}
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Collection: <span className="text-indigo-600 capitalize">{slug}</span>
            </h2>
            <p className="text-slate-500 mb-8 max-w-lg">
              Browse our exclusive selection of {slug}. Use the search bar below to find exactly what you need.
            </p>

            {/* ⭐ Styled Search Bar */}
            <div className="relative w-full max-w-lg group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {/* Search Icon SVG */}
                <svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${slug} products...`}
                className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-full 
                           focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none 
                           text-slate-700 placeholder-slate-400 shadow-sm transition-all duration-300"
              />
            </div>
          </div>

          {/* No Products Found State */}
          {currentItems.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-lg font-medium">No products match your search.</p>
              <button onClick={() => setSearch("")} className="mt-4 text-indigo-600 hover:underline">
                Clear search
              </button>
            </div>
          )}

          {/* ⭐ Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {currentItems.map((product: any) => (
              <a
                key={product._id}
                href={`/products/${product._id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                {/* Product Image Wrapper */}
                <div className="h-64 w-full overflow-hidden relative bg-slate-100">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                  {/* Overlay Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide rounded-md">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">
                    {product.name}
                  </h3>

                  <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-grow">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
                    <span className="text-2xl font-extrabold text-slate-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      View Details &rarr;
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* ⭐ Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Prev
              </button>

              <div className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-bold transition-all ${
                      currentPage === i + 1
                        ? "bg-slate-900 text-white shadow-md scale-105"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}