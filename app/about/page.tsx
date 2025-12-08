"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import BannerWrapper from "@/components/about/AboutBannerWrapper";

export default function AboutPreview() {
  return (
    <>
      <BannerWrapper
        heading="About Us"
        subtitle="Delivering Precision, Trust & Biomedical Innovation."
      />

      {/* ⭐ Updated Section Background to a subtle Blue Tint */}
      <section className="py-16 bg-slate-50">
        <div className="container-global max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-stretch bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-blue-50">
            
            {/* LEFT SIDE: CONTENT */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-1 w-6 bg-[#1A56DB] rounded-full"></span>
                <span className="text-sm font-bold text-[#1A56DB] tracking-widest uppercase">
                  Medcrave Biomedicals
                </span>
              </div>

              {/* ⭐ ROYAL BLUE ACCENT HEADING */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                Redefining <span className="text-[#1A56DB]">Biomedical</span> Excellence
              </h2>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <p>
                  Medcrave Biomedicals specializes in high-quality biomedical
                  and diagnostic solutions designed for accuracy, reliability,
                  and performance across diverse medical environments.
                </p>

                <p>
                  Our mission is to empower hospitals, laboratories, and
                  healthcare professionals with advanced biomedical systems,
                  diagnostics, and research-driven innovation.
                </p>

                <p className="p-4 border-l-4 border-blue-100 bg-blue-50/50 rounded-r-xl italic">
                  "With a commitment to scientific excellence, we deliver
                  precision-driven products that enhance clinical outcomes."
                </p>
              </div>
            </div>

            {/* RIGHT SIDE: VISUALS */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden group shadow-2xl"
            >
              {/* Floating Badge */}
              <div className="absolute top-5 left-5 z-20 space-y-1">
                <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
                  Innovation.
                </h3>
                <h3 className="text-blue-200 text-lg md:text-xl font-bold drop-shadow-md">
                  Precision.
                </h3>
              </div>

              {/* IMAGE WITH ZOOM ON HOVER */}
              <div className="relative h-full min-h-[300px] md:min-h-[400px]">
                <Image
                  src="/slide/bg-img.png"
                  alt="Medcrave Facility"
                  fill
                  className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-1000"
                />
                
                {/* ⭐ Royal Blue Gradient Overlay (Solid to Transparent) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1A56DB]/60 via-transparent to-black/20 rounded-2xl"></div>
              </div>

              {/* PLAY BUTTON Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white/90 backdrop-blur text-[#1A56DB] p-5 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-all">
                  <Play fill="#1A56DB" size={24} />
                </button>
              </div>

              {/* Action Button Label */}
              <div className="absolute bottom-5 right-5 z-20">
                <button className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full">
                   Watch Facility Tour
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}