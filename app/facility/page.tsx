"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaWifi,
  FaBook,
  FaCouch,
  FaRegLightbulb,
  FaBolt,
  FaPrint,
  FaTools,
} from "react-icons/fa";
import BannerWrapper from "@/components/about/AboutBannerWrapper";

export default function FacilityPage() {
  const coworkingImages = ["/images/06.webp", "/images/04.webp"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentImage((p) => (p + 1) % coworkingImages.length),
      3500
    );
    return () => clearInterval(interval);
  }, [coworkingImages.length]);

  return (
    <>
      <BannerWrapper
        heading="Facilities"
        subtitle="Meet the passionate innovators driving our mission forward."
      />

      <section className="bg-white text-[#0b1220] py-10 md:py-12 overflow-hidden">
        <div className="container-global px-3 lg:px-10 space-y-14">
          {/* ====================== CO-WORKING SPACE ====================== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            {/* IMAGE (extra reduced 40%) */}
            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-xl overflow-hidden shadow-md h-[170px] sm:h-[250px]"
            >
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={coworkingImages[currentImage]}
                  alt="Co-Working Space"
                  fill
                  className="object-cover rounded-xl transition-transform duration-[1500ms] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              </motion.div>

              {/* Dots smaller */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {coworkingImages.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: currentImage === i ? 1.1 : 1,
                      opacity: currentImage === i ? 1 : 0.3,
                    }}
                    className={`w-1.5 h-1.5 rounded-full ${
                      currentImage === i
                        ? "bg-[#00d2ef]"
                        : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* TEXT (40% smaller) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-lg md:text-xl font-extrabold mb-1">
                Co-Working <span className="text-[#00d2ef]">Space</span>
              </h2>
              <div className="h-[2px] w-10 bg-[#00d2ef] rounded-full mb-3"></div>

              <p className="text-gray-600 text-[9px] md:text-[11px] leading-relaxed">
                A modern workspace designed for collaboration, creativity, and
                flexibility. Includes hot desks, dedicated desks, and private cabins.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-3 text-gray-700">
                {[
                  { icon: <FaWifi />, text: "High-speed WiFi" },
                  { icon: <FaBook />, text: "Library Access" },
                  { icon: <FaCouch />, text: "Relax Zones" },
                  { icon: <FaRegLightbulb />, text: "Meeting Rooms" },
                  { icon: <FaBolt />, text: "UPS Backup" },
                  { icon: <FaPrint />, text: "Printers & Scanners" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-[9px] md:text-[11px]">
                    <span className="text-[#00d2ef] text-sm md:text-base">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* ====================== I4 LAB ====================== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            {/* TEXT small */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-lg md:text-xl font-extrabold mb-1">
                I4 Lab —{" "}
                <span className="text-[#00d2ef]">Innovation & Prototyping</span>
              </h2>
              <div className="h-[2px] w-10 bg-[#00d2ef] rounded-full mb-3"></div>

              <div className="space-y-3 text-gray-700">
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-[#0093b1]">
                    Rapid Prototyping
                  </h3>
                  <p className="text-[9px] md:text-[11px] leading-relaxed">
                    Build quick product models using advanced prototyping tools.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm md:text-base font-semibold text-[#0093b1]">
                    Fabrication Lab
                  </h3>
                  <p className="text-[9px] md:text-[11px] leading-relaxed">
                    Fully equipped digital fabrication space for testing ideas.
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-[#00d2ef]">
                <FaTools className="text-base md:text-lg" />
                <p className="text-[8px] md:text-[10px] text-gray-600">
                  Hands-on innovation for startups
                </p>
              </div>
            </motion.div>

            {/* IMAGE small */}
            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src="/images/3d-printing.webp"
                alt="I4 Lab"
                width={500}
                height={280}
                className="object-cover w-full h-[170px] sm:h-[250px] rounded-xl transition-transform duration-[1500ms] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
