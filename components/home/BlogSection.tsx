"use client";

import BlogSlider from "@/components/ui/BlogSlider";

export default function BoxSection() {
  return (
    <section
      className="
        py-20 
        bg-gradient-to-br from-[#f8fdff] to-[#e9f0ff]
        relative overflow-hidden
      "
    >
      {/* faint glowing blobs behind */}
      <div className="absolute -top-20 -left-20 w-[350px] h-[350px] bg-blue-300/25 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-white/30 rounded-full blur-[100px]"></div>

      <div
        className="
          relative
          max-w-6xl mx-auto
          rounded-3xl p-10
          bg-white/10 backdrop-blur-[45px]
          border border-white/50
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          overflow-hidden
        "
      >
        {/* inner shine */}
        <div className="
          absolute inset-0 
          rounded-3xl 
          bg-gradient-to-tr from-white/30 to-transparent
          pointer-events-none
        "></div>

        {/* subtle glass border highlight */}
        <div className="
          absolute inset-0 rounded-3xl border border-white/30 
          backdrop-blur-[2px]
        "></div>

        {/* slight edge shadow */}
        <div className="
          absolute inset-0 rounded-3xl shadow-[0_0_80px_rgba(255,255,255,0.5)] 
          pointer-events-none
        "></div>

        {/* CONTENT */}
        <div className="relative z-10">
          <BlogSlider />
        </div>
      </div>
    </section>
  );
}
