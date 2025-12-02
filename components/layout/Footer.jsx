"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 25 });
  const sy = useSpring(y, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <footer
      onMouseMove={handleMouseMove}
      className="relative bg-white pt-8 pb-6 border-t border-gray-200 overflow-hidden"
    >
      {/* Cursor Bubble */}
      <motion.div
        style={{ left: sx, top: sy }}
        className="pointer-events-none absolute w-12 h-12 bg-[#00d2ef]/20 rounded-full mix-blend-multiply z-[1]"
      />

      {/* MAIN FOOTER */}
      <div
        className="
        container-global relative z-10 
        max-w-5xl mx-auto 
        px-4 sm:px-6 
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        gap-8 sm:gap-6 md:gap-5 
        items-start text-center md:text-left
      "
      >
        {/* LOGO + TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center md:items-start"
        >
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex justify-center"
          >
            <div className="w-[70px] sm:w-[85px]">
              <Image
                src="/images/cvru-logo.png"
                alt="CVRU Logo"
                width={200}
                height={200}
                className="w-full h-auto object-contain drop-shadow-xl"
              />
            </div>
          </motion.div>

          <p className="text-gray-600 text-[10px] sm:text-xs max-w-[180px] leading-relaxed mt-2">
            CVRU I-TBI — Empowering innovation & startup ecosystem.
          </p>
        </motion.div>

        {/* CONTACT */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-base sm:text-lg font-semibold text-[#00d2ef] mb-2">
            Contact Us
          </h3>

          <div className="space-y-1 text-gray-700 text-[10px] sm:text-xs leading-relaxed">
            <p><strong>Tel:</strong> 07753253801</p>
            <p><strong>Email:</strong> info@cvru.ac.in</p>
            <p><strong>Address:</strong> Bilaspur, Chhattisgarh</p>
          </div>
        </motion.div>

        {/* SOCIAL ICONS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center md:justify-end gap-3 sm:gap-4"
        >
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
            (Icon, i) => (
              <motion.div
                key={i}
                className="relative group"
                whileHover={{ scale: 1.12 }}
              >
                <motion.div
                  className="
                    absolute inset-0 rounded-full border border-[#00d2ef]
                    opacity-0 group-hover:opacity-100
                    transition-all duration-500 ease-out
                    shadow-[0_0_8px_1px_rgba(0,210,239,0.4)]
                  "
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0.6, 1] }}
                />
                <motion.a
                  href="#"
                  className="
                    relative flex items-center justify-center 
                    w-7 h-7 sm:w-9 sm:h-9 
                    text-gray-700 hover:text-[#00d2ef] transition
                  "
                >
                  <Icon size={12} className="sm:size-[15px]" />
                </motion.a>
              </motion.div>
            )
          )}
        </motion.div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-6 px-4 sm:px-6">
        <hr className="border-gray-200 mb-2" />
        <p className="text-center text-gray-600 text-[10px] sm:text-xs">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#00d2ef] font-semibold">CVRU I-TBI</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
