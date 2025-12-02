"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

export interface ThreeDWaveCardProps {
  heading: string;
  text: string;
  subText?: string;
  icon?: string | React.ReactNode;
}

export default function ThreeDWaveCard({
  heading,
  text,
  subText,
  icon,
}: ThreeDWaveCardProps) {
  const waveColor = "rgba(13, 202, 240, 0.38)";

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useTransform(mvY, [-50, 50], [10, -10]);
  const rotateY = useTransform(mvX, [-50, 50], [-10, 10]);

  const ref = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mvX.set(((x / rect.width) * 2 - 1) * 50);
    mvY.set(((y / rect.height) * 2 - 1) * 50);
  };

  const resetTilt = () => {
    mvX.set(0);
    mvY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      onMouseEnter={() => setHovered(true)}
      style={{ perspective: 1200 }}
      className="
        relative overflow-hidden rounded-xl
        bg-gradient-to-br from-white to-[#f0fbfd]
        border border-[#e0f6f8] backdrop-blur-xl
        shadow-[0_8px_18px_rgba(0,0,0,0.05)]
        hover:shadow-[0_12px_28px_rgba(0,0,0,0.10)]
        cursor-pointer select-none
        w-full
        max-w-[200px]
        sm:max-w-[220px]
        md:max-w-[240px]       
        h-auto
        min-h-[160px]                 
        p-3 sm:p-4
        transition-all duration-500
      "
    >
      {/* Wave animation */}
      <motion.div className="absolute inset-0 pointer-events-none opacity-25">
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-[120%]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path fill={waveColor}>
            <animate
              attributeName="d"
              dur="6s"
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

      {/* Reflection */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-white/50 via-transparent to-transparent opacity-0"
        animate={{ opacity: hovered ? 0.28 : 0.12 }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10"
      >
        <div
          className="flex gap-3 items-start sm:gap-4"
          style={{ transform: "translateZ(28px)" }}
        >
          {/* ICON — responsive */}
          <div
            className="
              h-7 w-7 sm:h-9 sm:w-9
              rounded-lg bg-white border border-[#d9f7fa]
              flex items-center justify-center shadow-sm
            "
          >
            {typeof icon === "string" ? (
              <Image src={icon} alt="icon" width={20} height={20} className="object-contain" />
            ) : (
              icon
            )}
          </div>

          {/* TEXT — responsive */}
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-[#0093b1]">
              {heading}
            </h3>

            {subText && (
              <p className="text-[9px] sm:text-[11px] text-gray-500 leading-tight">
                {subText}
              </p>
            )}

            <p className="text-[#0b1220] text-[9px] sm:text-[12px] leading-snug">
              {text}
            </p>

          </div>
        </div>

        {/* Divider */}
        <div className="mt-3 relative w-full">
          <div className="h-[1px] bg-[#0dcaf0]/10 w-full"></div>

          <motion.div
            className="absolute top-0 h-[2px] bg-[#0dcaf0]"
            initial={{ width: "15%", left: "8%" }}
            animate={{
              width: hovered ? "45%" : "15%",
              left: hovered ? "12%" : "8%",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
