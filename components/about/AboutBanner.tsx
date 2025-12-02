"use client";

import { usePathname } from "next/navigation";

interface BannerProps {
  heading: string;
  subtitle?: string;
}

export default function AboutBanner({ heading, subtitle }: BannerProps) {
  const pathname = usePathname();

  return (
    <section
      key={pathname}
      className="
        w-full h-[60vh] 
        flex items-center 
        bg-[#030b0e] 
        text-white 
      "
    >
      <div className="container-global">
        <div className="max-w-2xl">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#00d2ef] leading-tight">
            {heading}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-3 text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg">
              {subtitle}
            </p>
          )}

          {/* Static Underline */}
          <div className="mt-4 h-[2px] w-20 bg-[#00d2ef] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
