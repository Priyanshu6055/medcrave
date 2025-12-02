"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function ServiceCard({ icon, title, desc }: ServiceCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 130, damping: 16 }}
      className="
        relative overflow-hidden rounded-xl
        bg-white/50 backdrop-blur-md border border-white/50
        shadow-[0_3px_18px_-5px_rgba(0,0,0,0.10)]
        flex flex-col cursor-pointer select-none

        /* 🔥 Responsive fixed height */
        h-[160px]        /* mobile */
        xs:h-[170px]
        sm:h-[180px]
        md:h-[170px]
        lg:h-[180px]
      "
    >
      {/* Soft wave fill */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={
          hovered
            ? { y: ["100%", "0%"], opacity: 0.18 }
            : { y: "100%", opacity: 0 }
        }
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-[140%]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path fill="rgba(0,210,239,0.35)">
            <animate
              attributeName="d"
              dur="4s"
              repeatCount="indefinite"
              values="
                M0,256 C200,280 320,240 480,250 C620,258 780,300 960,260 C1100,230 1260,260 1440,250 L1440,320 L0,320 Z;
                M0,260 C220,230 350,300 520,280 C700,260 820,220 980,230 C1140,240 1300,280 1440,260 L1440,320 L0,320 Z;
                M0,256 C200,280 320,240 480,250 C620,258 780,300 960,260 C1100,230 1260,260 1440,250 L1440,320 L0,320 Z
              "
            />
          </path>
        </svg>
      </motion.div>

      {/* Ink spot */}
      <motion.div
        className="absolute w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-full bg-[#0089a0] pointer-events-none"
        style={{ left: coords.x - 45, top: coords.y - 45 }}
        animate={
          hovered
            ? { scale: 1.4, opacity: 0.15 }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center p-3 sm:p-4">
        {/* Icon — responsive scale */}
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 2.4 }}
          className="mb-2 text-[#00d2ef] scale-75 sm:scale-90"
        >
          {icon}
        </motion.div>

        {/* Title — responsive text */}
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1">
          {title}
        </h3>

        {/* Description — responsive text */}
        <p className="text-gray-600 text-[10px] sm:text-[11px] leading-relaxed line-clamp-4 flex-1">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
