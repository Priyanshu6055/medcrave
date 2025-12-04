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
      className="relative bg-white pt-14 pb-6 border-t border-[#0A4D68]/20 overflow-hidden"
    >
      {/* Cyan Accent Bubble */}
      <motion.div
        style={{ left: sx, top: sy }}
        className="pointer-events-none absolute w-12 h-12 
                  bg-[#05BFDB]/25 rounded-full 
                  mix-blend-multiply z-[1]"
      />

      {/* MAIN FOOTER GRID */}
      <div
        className="
        container-global relative z-10 
        max-w-6xl mx-auto 
        px-4 sm:px-6 
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        gap-10 items-start
        text-center md:text-left
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
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex justify-center"
          >
            <div className="w-[95px] sm:w-[75px]">
              <Image
                src="/logos/medcrave-logo-croped.jpg"
                alt="Medcrave Logo"
                width={200}
                height={200}
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>

          <p className="text-[#2E3A45]/70 text-xs max-w-[230px] leading-relaxed mt-3">
            Medcrave Biomedicals — Advancing healthcare with precision,
            innovation, and trusted biomedical solutions.
          </p>
        </motion.div>

        {/* CONTACT INFO */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-[#0A4D68] mb-2">
            Contact Us
          </h3>

          <div className="space-y-1 text-[#2E3A45] text-xs leading-relaxed">
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Email:</strong> support@medcrave.in</p>
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
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
            <motion.div
              key={i}
              className="relative group"
              whileHover={{ scale: 1.15 }}
            >
              {/* Hover Ring */}
              <motion.div
                className="
                  absolute inset-0 rounded-full 
                  border border-[#0A4D68] 
                  opacity-0 group-hover:opacity-100
                  transition-all duration-500 ease-out
                  shadow-[0_0_8px_2px_rgba(10,77,104,0.35)]
                "
                initial={{ scale: 0 }}
                whileHover={{ scale: [0.6, 1] }}
              />

              {/* Icon */}
              <motion.a
                href="#"
                className="
                  relative flex items-center justify-center 
                  w-8 h-8 sm:w-10 sm:h-10 
                  text-[#2E3A45] hover:text-[#05BFDB] transition
                "
              >
                <Icon size={15} className="sm:size-[18px]" />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-8 px-4 sm:px-6">
        <hr className="border-[#0A4D68]/20 mb-3" />
        <p className="text-center text-[#2E3A45]/70 text-[11px] sm:text-xs">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#0A4D68] font-semibold">Medcrave Biomedicals</span>.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
