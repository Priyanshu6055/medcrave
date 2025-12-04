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

      <section className="py-10 bg-[#F5F9FA]">
        <div className="container-global">
          <div className="grid lg:grid-cols-2 gap-6 items-start bg-white rounded-xl p-5 md:p-6 shadow-lg border border-[#B8DCE8]">
            
            {/* LEFT SIDE */}
            <div>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[#0A4D68] text-sm">✦</span>
                <span className="text-sm font-semibold text-[#05BFDB] tracking-wide">
                  Medcrave Biomedicals
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-[#0A4D68] leading-snug mb-3">
                About Us
              </h2>

              <div className="space-y-2 text-[13px] text-gray-700 leading-relaxed">
                <p>
                  Medcrave Biomedicals specializes in high-quality biomedical
                  and diagnostic solutions designed for accuracy, reliability,
                  and performance across medical environments.
                </p>

                <p>
                  Our mission is to empower hospitals, laboratories, and
                  healthcare professionals with advanced biomedical systems,
                  diagnostics, and research-driven innovation.
                </p>

                <p>
                  With a commitment to scientific excellence, we deliver
                  precision-driven products that enhance clinical outcomes and
                  support modern healthcare needs.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative bg-blue-100 rounded-xl overflow-hidden shadow-md"
            >
              {/* Top Text Overlay */}
              <div className="absolute top-3 left-3 z-20">
                <h3 className="text-white text-lg md:text-xl font-bold drop-shadow-md">
                  Our Work.
                </h3>
                <h3 className="text-white text-lg md:text-xl font-bold drop-shadow-md opacity-80">
                  Innovation. Precision.
                </h3>
              </div>

              {/* IMAGE */}
              <Image
                src="/images/nitin-sir3.jpg"
                alt="Medcrave Facility"
                width={900}
                height={400}
                className="w-full h-[230px] md:h-[330px] object-cover rounded-xl"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-xl"></div>

              {/* Button */}
              <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition">
                <Play className="text-[#0A4D68]" size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
