"use client";

import React, { useEffect, useState } from "react";
import BannerWrapper from "@/components/about/AboutBannerWrapper";

interface ProductDetailsProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetails(props: ProductDetailsProps) {
  const params = React.use(props.params);
  const id = params.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 3. Fetch Data (Client-side)
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

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Not Found State
  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-3xl font-bold text-slate-800">Product Not Found</h1>
        <a href="/products" className="mt-4 text-indigo-600 hover:underline">Return to Products</a>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* ⭐ Banner */}
      <BannerWrapper heading={product.name} subtitle={product.category} />

      <section className="py-12 md:py-16">
        <div className="container-global px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* ⭐ COLUMN 1: Image Grid (Thumbnails) */}
            <div className="space-y-4">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                 Product Gallery (Click to View)
               </h3>
               
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {product.images.map((img: string, i: number) => (
                  <div 
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className="aspect-square cursor-pointer overflow-hidden rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-400 transition-all duration-300 group bg-white"
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ⭐ COLUMN 2: Details (No Price) */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                  {product.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {product.name}
                </h1>
              </div>

              {/* Description */}
              <div className="prose prose-slate max-w-none">
                <h3 className="text-lg font-bold text-slate-900 border-l-4 border-indigo-600 pl-3">
                  Description
                </h3>
                <p className="text-slate-600 leading-relaxed mt-2 text-justify">
                  {product.description}
                </p>
              </div>

              {/* Advantages Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-100 transition-colors">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-indigo-600">★</span> Key Advantages
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {product.advantages}
                </p>
              </div>

              {/* Uses Box */}
              <div className="bg-slate-100 p-6 rounded-2xl border border-transparent">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Common Uses
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {product.uses}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ⭐ Full Screen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)} // Click outside to close
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-indigo-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Big Image */}
            <img 
              src={selectedImage} 
              alt="Full view" 
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking image itself
            />
          </div>
        </div>
      )}

    </div>
  );
}