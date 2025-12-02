"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BannerWrapper from "@/components/about/AboutBannerWrapper";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <>
      {/* 🔥 DO NOT REMOVE — YOUR BANNER */}
      <BannerWrapper
        heading="Facilities"
        subtitle="Meet the passionate innovators driving our mission forward."
      />

      {/* MAIN PRODUCTS SECTION */}
      <section className="relative w-full bg-white py-10 md:py-14 overflow-hidden">
        <div className="container-global px-3 md:px-8 lg:px-12 space-y-10">

          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-xl md:text-3xl font-extrabold text-[#0b1220] leading-tight">
              Our Products
            </h2>

            <div className="flex items-center gap-1">
              <div className="h-[2px] w-[40px] bg-green-500 rounded-full" />
              <div className="h-2 w-2 bg-green-500 rounded-full scale-75" />
            </div>
          </div>

          {/* Product Grid */}
          {products.length === 0 ? (
            <p className="text-gray-500 text-sm">No products found...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-all group"
                >
                  {/* Image */}
                  <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                    {p.images?.length > 0 ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-gray-900 truncate">
                    {p.name}
                  </h3>

                  <p className="text-xs text-green-700 font-semibold">
                    {p.category}
                  </p>

                  <p className="mt-2 text-xs text-gray-600 line-clamp-3 leading-snug">
                    {p.description}
                  </p>

                  <Link
                    href={`/products/${p._id}`}
                    className="inline-block mt-4 text-center w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-lg transition"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
