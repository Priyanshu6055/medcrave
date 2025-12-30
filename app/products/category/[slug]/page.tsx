"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import BannerWrapper from "@/components/about/AboutBannerWrapper";

const PRIMARY = "#7A3283"; // Medcrave Purple
const SECONDARY = "#85CD7C"; // Complementary Green

interface CategoryProductsPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryProductsPage(props: CategoryProductsPageProps) {
  const params = React.use(props.params);
  const slug = params.slug as string;
  const decodedSlug = decodeURIComponent(slug);

  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  /* Fetch category products */
  useEffect(() => {
    fetch(`/api/products/category/${encodeURIComponent(decodedSlug)}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data.products) ? data.products : [];
        setProducts(list);
        setFiltered(list);
      })
      .catch(() => {
        setProducts([]);
        setFiltered([]);
      });
  }, [decodedSlug]);

  /* Search filter */
  useEffect(() => {
    const result = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    setFiltered(result);
    setCurrentPage(1);
  }, [search, products]);

  /* Pagination */
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <BannerWrapper
        heading={slug.toUpperCase()}
        subtitle={`Explore all premium ${slug} products`}
        pathname={slug}
      />

      <section className="py-20">
        <div className="container-global px-4 md:px-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Collection:{" "}
              <span style={{ color: PRIMARY }} className="capitalize">
                {decodedSlug}
              </span>
            </h2>

            <p className="text-slate-500 mb-8 max-w-lg">
              Browse our exclusive selection of {decodedSlug}. Use the search bar below
              to find exactly what you need.
            </p>

            {/* Search Bar */}
            <div className="relative w-full max-w-lg group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-slate-400 transition-colors"
                  style={{ color: PRIMARY, opacity: 0.6 }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${decodedSlug} products...`}
                className="w-full pl-11 pr-4 py-4 bg-white rounded-full shadow-sm border border-slate-200 outline-none"
                onFocus={(e) =>
                  (e.target.style.boxShadow = `0 0 0 4px ${PRIMARY}22`)
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>
          </div>

          {/* Empty State */}
          {currentItems.length === 0 && (
            <div
              className="text-center py-20 bg-white rounded-3xl border border-dashed"
              style={{ borderColor: `${PRIMARY}44` }}
            >
              <p className="text-slate-500 text-lg font-medium">
                No products match your search.
              </p>
              <button
                onClick={() => setSearch("")}
                className="mt-4 underline"
                style={{ color: PRIMARY }}
              >
                Clear search
              </button>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {currentItems.map((product: any) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="group bg-white rounded-2xl overflow-hidden border shadow-sm flex flex-col transition-all duration-300"
                style={{ borderColor: `${PRIMARY}22` }}
              >
                <div className="h-64 w-full overflow-hidden relative bg-slate-100">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span
                    className="px-3 py-1 text-xs font-bold uppercase rounded-md"
                    style={{
                      backgroundColor: `${SECONDARY}22`,
                      color: PRIMARY,
                    }}
                  >
                    {product.category}
                  </span>

                  <h3
                    className="text-xl font-bold mt-2 mb-2"
                    style={{ color: PRIMARY }}
                  >
                    {product.name}
                  </h3>

                  <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-grow">
                    {product.description}
                  </p>

                  <div
                    className="flex justify-between items-center pt-4 border-t mt-auto"
                    style={{ borderColor: `${PRIMARY}22` }}
                  >
                    {product.price > 0 && (
                      <span className="text-2xl font-extrabold text-slate-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                    )}
                    <span
                      className="text-sm font-medium"
                      style={{ color: PRIMARY }}
                    >
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-5 py-2.5 rounded-lg bg-white text-sm font-medium disabled:opacity-50"
                style={{ border: `1px solid ${PRIMARY}22`, color: PRIMARY }}
              >
                ← Prev
              </button>

              <div
                className="flex gap-1 bg-white p-1 rounded-lg"
                style={{ border: `1px solid ${PRIMARY}22` }}
              >
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className="w-10 h-10 rounded-md text-sm font-bold"
                    style={
                      currentPage === i + 1
                        ? { backgroundColor: PRIMARY, color: "white" }
                        : { color: PRIMARY }
                    }
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-5 py-2.5 rounded-lg bg-white text-sm font-medium disabled:opacity-50"
                style={{ border: `1px solid ${PRIMARY}22`, color: PRIMARY }}
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
