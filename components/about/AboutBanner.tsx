"use client";

import Image from "next/image";

export default function BannerWrapper({ heading, subtitle, pathname }: any) {
  return (
    <section
      key={pathname}
      className="
        relative
        w-full h-[60vh]
        flex items-center
        text-white
        overflow-hidden
      "
    >
      {/* Background Image */}
      <Image
        src="/bg/lab-dark-bg.png"  // change here
        alt="banner background"
        fill
        priority
        className="object-cover object-center"
      />


      {/* CONTENT */}
      <div className="container-global relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#00d2ef] leading-tight">
            {heading}
          </h1>

          {subtitle && (
            <p className="mt-3 text-gray-200 text-sm sm:text-base max-w-lg leading-relaxed">
              {subtitle}
            </p>
          )}

          <div className="mt-4 h-[2px] w-20 bg-[#00d2ef] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
