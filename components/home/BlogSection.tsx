"use client";

import BlogSlider from "@/components/ui/BlogSlider";
import type { FC } from "react";

// ----------------------------------------
// THEME COLORS (Type Safe)
// ----------------------------------------
const PRIMARY = "#7A3283";
const SECONDARY = "#85CD7C";

const BoxSection: FC = () => {
  return (
    <section
      className="
        py-20 
        relative overflow-hidden
      "
      style={{
        background: `linear-gradient(to bottom right, #faf6fb, #f3f8f4)`,
      }}
    >
      {/* ⭐ Soft Purple Glow Blob */}
      <div
        className="
          absolute -top-20 -left-20 
          w-[350px] h-[350px] 
          rounded-full blur-[120px]
        "
        style={{ backgroundColor: PRIMARY + "33" }} // 20% opacity
      />

      {/* ⭐ Soft Green Accent Glow */}
      <div
        className="
          absolute bottom-10 right-10 
          w-[300px] h-[300px] 
          rounded-full blur-[100px]
        "
        style={{ backgroundColor: SECONDARY + "40" }} // 25% opacity
      />

      <div
        className="
          relative max-w-6xl mx-auto
          rounded-3xl p-10
          bg-white/10 backdrop-blur-[45px]
          border border-white/50
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          overflow-hidden
        "
      >
        {/* Inner shine */}
        <div
          className="
            absolute inset-0 rounded-3xl 
            bg-gradient-to-tr from-white/40 to-transparent
            pointer-events-none
          "
        />

        {/* Glass border highlight */}
        <div
          className="
            absolute inset-0 rounded-3xl 
            border border-white/30 backdrop-blur-[2px]
          "
        />

        {/* Outer edge subtle shadow */}
        <div
          className="
            absolute inset-0 rounded-3xl
            shadow-[0_0_80px_rgba(255,255,255,0.5)]
            pointer-events-none
          "
        />

        {/* CONTENT */}
        <div className="relative z-10">
          <BlogSlider />
        </div>
      </div>
    </section>
  );
};

export default BoxSection;
