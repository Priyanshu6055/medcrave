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
    <>
      {/* ⭐ Dynamic Banner */}
      <BannerWrapper
        heading={slug.toUpperCase()}
        subtitle={`Explore all premium ${slug} products`}
      />

      <section className="py-16 bg-gray-50">
        <div className="container-global px-4 md:px-10">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Showing all <span className="text-green-600">{slug}</span> products
          </h2>

          {/* ⭐ Search Bar */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${slug} products...`}
            className="w-full md:w-1/2 px-4 py-3 mb-8 border border-gray-300 rounded-xl 
                       focus:ring-2 focus:ring-green-600 outline-none text-sm shadow-sm"
          />

          {/* No Products */}
          {currentItems.length === 0 && (
            <p className="text-gray-500 text-lg">No products found.</p>
          )}

          {/* ⭐ Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((product: any) => (
              <a
                key={product._id}
                href={`/products/${product._id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center pt-3">
                    <span className="text-green-700 font-bold text-lg">
                      ₹{product.price}
                    </span>

                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* ⭐ Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-10">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-lg text-sm disabled:opacity-40"
              >
                Previous
              </button>

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
