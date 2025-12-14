"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BannerWrapper from "@/components/about/AboutBannerWrapper";

const PRIMARY = "#7A3283";     // Medcrave Purple
const SECONDARY = "#85CD7C";   // Complementary Green

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      });
  }, []);

  useEffect(() => {
    const results = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(results);
    setCurrentPage(1);
  }, [search, products]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <BannerWrapper
        heading="Our Catalog"
        subtitle="Discover our complete range of innovative premium products."
        pathname="/products"
      />

      <section className="relative w-full py-16 overflow-hidden">
        <div className="container-global px-4 md:px-10 max-w-7xl mx-auto space-y-12">
          
          {/* ⭐ HEADER & SEARCH */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Explore <span style={{ color: PRIMARY }}>Premium</span> Range
              </h2>

              <div className="flex items-center gap-2">
                <div className="h-1 w-12 rounded-full" style={{ backgroundColor: PRIMARY }} />
                <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: SECONDARY }} />
              </div>
            </div>

            {/* ⭐ SEARCH BAR */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: PRIMARY, opacity: 0.6 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search catalog..."
                className="
                  w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl shadow-sm
                  border border-slate-200 outline-none
                  text-slate-700 placeholder-slate-400 transition-all
                "
                onFocus={(e) =>
                  (e.target.style.boxShadow = `0 0 0 4px ${PRIMARY}22`)
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>
          </div>

          {/* ⭐ PRODUCT GRID */}
          {currentItems.length === 0 ? (
            <div
              className="text-center py-20 bg-white rounded-3xl border border-dashed"
              style={{ borderColor: `${PRIMARY}44` }}
            >
              <p className="text-slate-500 font-medium">
                No products match your search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              {currentItems.map((p) => (
                <div
                  key={p._id}
                  className="
                    group relative bg-white rounded-3xl shadow-sm border overflow-hidden 
                    hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col
                  "
                  style={{ borderColor: `${PRIMARY}22` }}
                >
                  <div className="w-full h-56 bg-slate-100 overflow-hidden relative">
                    {p.images?.length > 0 ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 font-medium">
                        No Preview Available
                      </div>
                    )}

                    {/* Price Tag */}
                    {p.price > 0 && (
                      <div className="absolute top-4 right-4 px-4 py-1.5 bg-white/90 backdrop-blur shadow-lg rounded-full">
                        <p className="text-sm font-bold text-slate-900">
                          ₹{p.price}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow space-y-3">
                    <span
                      className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md"
                      style={{
                        backgroundColor: `${SECONDARY}22`,
                        color: PRIMARY,
                      }}
                    >
                      {p.category}
                    </span>

                    <h3
                      className="text-xl font-bold group-hover:opacity-90 transition-all"
                      style={{ color: PRIMARY }}
                    >
                      {p.name}
                    </h3>

                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  {/* Footer Button */}
                  <div className="p-6 pt-0 mt-auto">
                    <Link
                      href={`/products/${p._id}`}
                      className="
                        flex items-center justify-center gap-2 w-full text-sm font-bold 
                        py-3.5 rounded-2xl transition-all duration-300 shadow-lg
                      "
                      style={{
                        backgroundColor: PRIMARY,
                        color: "white",
                        boxShadow: `0 4px 12px ${PRIMARY}33`,
                      }}
                    >
                      View Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ⭐ PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-10">
              
              {/* Prev */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="
                  px-5 py-2 bg-white rounded-xl text-sm font-medium 
                  hover:bg-slate-50 disabled:opacity-40 transition-all
                "
                style={{ border: `1px solid ${PRIMARY}22`, color: PRIMARY }}
              >
                Prev
              </button>

              {/* Page numbers */}
              <div className="flex gap-1.5">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className="w-10 h-10 rounded-xl text-sm font-bold transition-all"
                    style={
                      currentPage === i + 1
                        ? {
                            backgroundColor: PRIMARY,
                            color: "white",
                            boxShadow: `0 0 10px ${PRIMARY}55`,
                          }
                        : {
                            backgroundColor: "white",
                            border: `1px solid ${PRIMARY}22`,
                            color: PRIMARY,
                          }
                    }
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="
                  px-5 py-2 bg-white rounded-xl text-sm font-medium 
                  hover:bg-slate-50 disabled:opacity-40 transition-all
                "
                style={{ border: `1px solid ${PRIMARY}22`, color: PRIMARY }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
