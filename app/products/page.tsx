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

          {/* ⭐ HEADING & SEARCH (UNCHANGED) */}
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

            <div className="relative w-full md:w-96 group">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search catalog..."
                className="w-full pl-4 pr-4 py-3.5 bg-white rounded-2xl shadow-sm border border-slate-200 outline-none"
              />
            </div>
          </div>

          {/* ⭐ PRODUCT GRID */}
          {currentItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              {currentItems.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-3xl shadow-sm border overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all"
                  style={{ borderColor: `${PRIMARY}22` }}
                >
                  <div className="w-full h-56 bg-slate-100">
                    {p.images?.length > 0 ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-grow space-y-3">
                    <span
                      className="px-3 py-1 text-xs rounded-md font-bold"
                      style={{ backgroundColor: `${SECONDARY}22`, color: PRIMARY }}
                    >
                      {p.category}
                    </span>

                    <h3 className="text-xl font-bold" style={{ color: PRIMARY }}>
                      {p.name}
                    </h3>

                    <p className="text-sm text-slate-600 line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={`/products/${p._id}`}
                      className="block text-center py-3 rounded-2xl font-bold text-white"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ⭐ PAGINATION (OVERFLOW FIXED ONLY) */}
          {totalPages > 1 && (
            <div className="pt-12">
              <div className="flex justify-center items-center gap-3 flex-wrap">

                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-5 py-2 rounded-xl bg-white border"
                >
                  Prev
                </button>

                <div className="max-w-full overflow-x-auto">
                  <div className="flex gap-2 px-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToPage(i + 1)}
                        className="min-w-[40px] h-10 rounded-xl font-bold flex-shrink-0"
                        style={
                          currentPage === i + 1
                            ? { backgroundColor: PRIMARY, color: "white" }
                            : { backgroundColor: "white", border: `1px solid ${PRIMARY}22`, color: PRIMARY }
                        }
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-5 py-2 rounded-xl bg-white border"
                >
                  Next
                </button>

              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
