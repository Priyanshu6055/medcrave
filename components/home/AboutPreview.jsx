"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="py-10 bg-[#f7f7f7]">
      <div className="container-global">
        <div className="grid lg:grid-cols-2 gap-6 items-start bg-white/60 rounded-xl p-4 md:p-6 shadow-sm backdrop-blur-xl border border-gray-200/60">
          <div>
            {/* Label */}
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[#ee9e26] text-sm">✦</span>
              <span className="text-sm font-medium tracking-wide text-gray-800">
                CVRU I–TBI
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-3">
              About Us
            </h2>

            <div className="space-y-2 text-[12px] md:text-[13px] text-gray-600 leading-relaxed">
              <p>
                CVRU Incubation and Technology Business Incubation (iTBI) Center
                is a pioneering initiative under Dr. C.V. Raman University to
                nurture innovation, creativity, and entrepreneurship in the
                Chhattisgarh region.
              </p>

              <p>
                Our mission is to transform visionary ideas into scalable
                ventures, contributing to economic, technological, and social
                growth.
              </p>

              <p>
                We bridge academia, industry, and entrepreneurs — fostering
                research-based innovation, product development, and startup
                growth.
              </p>
            </div>
          </div>

          {/* ✅ Right Card (Image + Overlay 40% Smaller) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative bg-gray-100 rounded-xl overflow-hidden shadow-lg"
          >
            {/* Top Text */}
            <div className="absolute top-3 left-3 z-20">
              <h3 className="text-white text-lg md:text-xl font-bold">
                Our Work.
              </h3>
              <h3 className="text-white text-lg md:text-xl font-bold opacity-85">
                Their Words.
              </h3>
            </div>

            {/* Much Smaller Image */}
            <Image
              src="/images/nitin-sir3.jpg"
              alt="CVRU Activities"
              width={900}
              height={400}
              className="w-full h-[230px] md:h-[340px] object-cover rounded-xl"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

            {/* Smaller Play Button */}
            <button className="absolute bottom-3 right-3 bg-white shadow-md p-1.5 rounded-full hover:scale-110 transition">
              <Play className="text-black" size={14} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
