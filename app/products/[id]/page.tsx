"use client";

import React, { useEffect, useState } from "react";
import BannerWrapper from "@/components/about/AboutBannerWrapper";

const PRIMARY = "#7A3283";      // Medcrave Purple
const SECONDARY = "#85CD7C";    // Complementary Green

interface ProductDetailsProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetails(props: ProductDetailsProps) {
  const params = React.use(props.params);
  const id = params.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fetch product
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    fetch(`${baseUrl}/api/products/${id}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: PRIMARY }}
        ></div>
      </div>
    );
  }

  // Not found
  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-3xl font-bold text-slate-800">Product Not Found</h1>
        <a
          href="/products"
          style={{ color: PRIMARY }}
          className="mt-4 hover:underline"
        >
          Return to Products
        </a>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Banner */}
      <BannerWrapper heading={product.name} subtitle={product.category} pathname={id} />

      <section className="py-12 md:py-16">
        <div className="container-global px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* GALLERY */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                Product Gallery (Click to View)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {product.images.map((img: string, i: number) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className="
                      aspect-square cursor-pointer overflow-hidden rounded-xl 
                      border bg-white shadow-sm group transition-all duration-300
                    "
                    style={{
                      borderColor: `${PRIMARY}20`,
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i}`}
                      className="
                        w-full h-full object-cover 
                        group-hover:scale-110 transition-transform duration-500
                      "
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* DETAILS COLUMN */}
            <div className="space-y-8">
              <div>
                {/* Category Badge */}
                <span
                  className="
                    inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-3
                  "
                  style={{
                    backgroundColor: `${SECONDARY}30`,
                    color: PRIMARY,
                  }}
                >
                  {product.category}
                </span>

                {/* Product Name */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {product.name}
                </h1>
              </div>

              {/* Description */}
              <div className="prose prose-slate max-w-none">
                <h3
                  className="text-lg font-bold pl-3"
                  style={{
                    borderLeft: `4px solid ${PRIMARY}`,
                    color: PRIMARY,
                  }}
                >
                  Description
                </h3>

                <p className="text-slate-700 leading-relaxed mt-2 text-justify">
                  {product.description}
                </p>
              </div>

              {/* Advantages */}
              <div
                className="
                  bg-white p-6 rounded-2xl shadow-sm 
                  transition-colors
                "
                style={{
                  border: `1px solid ${PRIMARY}20`,
                }}
              >
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <span style={{ color: PRIMARY }}>★</span> Key Advantages
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {product.advantages}
                </p>
              </div>

              {/* Uses */}
              <div
                className="p-6 rounded-2xl shadow-sm"
                style={{
                  backgroundColor: `${SECONDARY}10`,
                  border: `1px solid ${SECONDARY}20`,
                }}
              >
                <h3 className="text-lg font-bold mb-3" style={{ color: PRIMARY }}>
                  Common Uses
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {product.uses}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FULLSCREEN IMAGE VIEWER */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 transition-colors"
              style={{ color: SECONDARY }}
            >
              ✕
            </button>

            <img
              src={selectedImage}
              alt="Full view"
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

    </div>
  );
}
