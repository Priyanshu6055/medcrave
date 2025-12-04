"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BannerWrapper from "@/components/about/AboutBannerWrapper";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState(""); // ⭐ Search input
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  // ⭐ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // products per page

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products); // initially show all
      });
  }, []);

  /* ⭐ REALTIME SEARCH */
  useEffect(() => {
    const results = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(results);
    setCurrentPage(1); // reset to page 1
  }, [search, products]);

  /* ⭐ PAGINATION CALCULATION */
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <BannerWrapper
        heading="Products"
        subtitle="Meet the passionate innovators driving our mission forward."
      />

      {/* MAIN PRODUCTS SECTION */}
      <section className="relative w-full bg-white py-12 overflow-hidden">
        <div className="container-global px-4 md:px-10 space-y-10">

          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-xl md:text-3xl font-extrabold text-[#0b1220] leading-tight">
              Explore Our Products
            </h2>

            <div className="flex items-center gap-1">
              <div className="h-[2px] w-[40px] bg-green-600 rounded-full" />
              <div className="h-2 w-2 bg-green-600 rounded-full scale-75" />
            </div>
          </div>

          {/* ⭐ SEARCH BAR */}
          <div className="flex justify-start">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by name or category..."
              className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-green-600
                         text-sm shadow-sm"
            />
          </div>

          {/* Product Grid */}
          {currentItems.length === 0 ? (
            <p className="text-gray-500 text-sm">No products found...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((p) => (
                <div
                  key={p._id}
                  className="relative bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden 
                  hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Top Gradient Border */}
                  <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-green-500 to-emerald-400"></div>

                  {/* Image */}
                  <div className="w-full h-48 bg-gray-100 overflow-hidden rounded-t-2xl">
                    {p.images?.length > 0 ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition">
                      {p.name}
                    </h3>

                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      {p.category}
                    </span>

                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {p.description}
                    </p>

                    <p className="text-lg font-bold text-green-700 mt-3">
                      ₹{p.price}
                    </p>
                  </div>

                  {/* View Details Button */}
                  <div className="p-4">
                    <Link
                      href={`/products/${p._id}`}
                      className="block w-full text-center bg-green-600 hover:bg-green-700 
                      text-white text-sm py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ⭐ PAGINATION UI */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8">
              {/* Prev */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-lg text-sm disabled:opacity-40"
              >
                Previous
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    currentPage === i + 1
                      ? "bg-green-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-lg text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
