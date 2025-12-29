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

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {currentItems.map((p) => (
              <div
                key={p._id}
                className="group relative bg-white rounded-3xl shadow-sm border overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
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
                </div>

                <div className="p-6 flex-grow space-y-3">
                  <span
                    className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md"
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

                <div className="p-6 pt-0 mt-auto">
                  <Link
                    href={`/products/${p._id}`}
                    className="flex items-center justify-center gap-2 w-full text-sm font-bold py-3.5 rounded-2xl transition-all duration-300 shadow-lg"
                    style={{
                      backgroundColor: PRIMARY,
                      color: "white",
                      boxShadow: `0 4px 12px ${PRIMARY}33`,
                    }}
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ⭐ PAGINATION — FIXED OVERFLOW (UI ONLY) */}
          {totalPages > 1 && (
            <div className="pt-12">
              <div className="flex justify-center items-center gap-3 flex-wrap">

                {/* Prev */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-5 py-2 bg-white rounded-xl text-sm font-medium hover:bg-slate-50 disabled:opacity-40 transition-all"
                  style={{ border: `1px solid ${PRIMARY}22`, color: PRIMARY }}
                >
                  Prev
                </button>

                {/* Scrollable Page Numbers */}
                <div className="max-w-full overflow-x-auto">
                  <div className="flex gap-2 px-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToPage(i + 1)}
                        className="min-w-[40px] h-10 rounded-xl text-sm font-bold transition-all flex-shrink-0"
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
                </div>

                {/* Next */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-5 py-2 bg-white rounded-xl text-sm font-medium hover:bg-slate-50 disabled:opacity-40 transition-all"
                  style={{ border: `1px solid ${PRIMARY}22`, color: PRIMARY }}
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
