"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import BannerWrapper from "@/components/about/AboutBannerWrapper";

const PRIMARY = "#7A3283";      // Medcrave Purple
const SECONDARY = "#85CD7C";    // Complementary Green

export default function AboutPreview() {
  return (
    <>
      <BannerWrapper
        heading="About Us"
        subtitle="Delivering Precision, Trust & Biomedical Innovation."
        pathname="/about"
      />

      {/* ⭐ Updated Section Background */}
      <section className="py-16 bg-slate-50">
        <div className="container-global max-w-7xl mx-auto px-4">
          <div
            className="
              grid lg:grid-cols-2 gap-10 items-stretch 
              bg-white rounded-2xl p-6 md:p-10 shadow-xl
            "
            style={{
              border: `1px solid ${PRIMARY}15`,
            }}
          >
            {/* LEFT SIDE: CONTENT */}
            <div className="flex flex-col justify-center">
              {/* Small Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="h-1 w-6 rounded-full"
                  style={{ backgroundColor: PRIMARY }}
                />
                <span
                  className="text-sm font-bold tracking-widest uppercase"
                  style={{ color: PRIMARY }}
                >
                  Medcrave Biomedicals
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                Redefining{" "}
                <span style={{ color: PRIMARY }}>Biomedical</span> Excellence
              </h2>

              {/* Body */}
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

                <p
                  className="p-4 bg-slate-100 rounded-r-xl italic"
                  style={{
                    borderLeft: `4px solid ${SECONDARY}`,
                    backgroundColor: `${SECONDARY}15`,
                  }}
                >
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
              {/* Floating Badge Text */}
              <div className="absolute top-5 left-5 z-20 space-y-1">
                <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
                  Innovation.
                </h3>
                <h3
                  className="text-lg md:text-xl font-bold drop-shadow-md"
                  style={{ color: SECONDARY }}
                >
                  Precision.
                </h3>
              </div>

              {/* IMAGE */}
              <div className="relative h-full min-h-[300px] md:min-h-[400px]">
                <Image
                  src="/bg/purple-lab-bg.png"
                  alt="Medcrave Facility"
                  fill
                  className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-1000"
                />

                {/* ⭐ Purple Gradient Overlay */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(to top right, ${PRIMARY}66, transparent 60%)`,
                  }}
                />
              </div>

              {/* PLAY BUTTON */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="
                    bg-white/90 backdrop-blur 
                    p-5 rounded-full shadow-2xl 
                    scale-75 group-hover:scale-100 transition-all
                  "
                  style={{ color: PRIMARY }}
                >
                  <Play fill={PRIMARY} size={24} />
                </button>
              </div>

              {/* Facility Tour Label */}
              <div className="absolute bottom-5 right-5 z-20">
                <button
                  className="
                    px-4 py-2 bg-white/10 backdrop-blur-md 
                    border text-white text-xs font-bold rounded-full
                  "
                  style={{
                    borderColor: "rgba(255,255,255,0.25)",
                  }}
                >
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
