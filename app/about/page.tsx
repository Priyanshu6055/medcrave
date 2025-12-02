"use client";

import BannerWrapper from "@/components/about/AboutBannerWrapper";

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <BannerWrapper
        heading="About Us"
        subtitle="Empowering Innovation & Entrepreneurship."
      />

      <section
        className="
          container-global 
          py-12 px-3 
          md:py-14 md:px-10 
          flex flex-col md:flex-row 
          items-center gap-10
        "
      >
        {/* Image (Smaller) */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/images/02.webp"
            alt="About CVRU iTBI"
            className="
              rounded-2xl object-cover 
              w-full max-w-md 
              h-[22vh] sm:h-[30vh] md:h-[34vh] 
              shadow-lg
            "
          />
        </div>

        {/* Text Section — 20% Smaller Again */}
        <div
          className="
            w-full md:w-1/2 
            text-gray-700 
            space-y-4 
            text-center md:text-left
          "
        >
          <h2
            className="
              text-xl sm:text-2xl md:text-3xl 
              font-bold text-gray-900 leading-snug
            "
          >
            About CVRU iTBI
          </h2>

          <p className="leading-relaxed text-[12px] sm:text-[13px] md:text-[14px]">
            CVRU iTBI fosters Innovation & Entrepreneurship by providing a
            supportive incubation environment where ideas are nurtured into
            viable startups through guidance, mentoring, and essential resources.
          </p>

          <p className="leading-relaxed text-[12px] sm:text-[13px] md:text-[14px]">
            With structured programs, expert mentoring, and access to modern
            facilities, we help innovators convert ideas into successful
            ventures while promoting an entrepreneurial mindset within the
            university and surrounding community.
          </p>
        </div>
      </section>
    </>
  );
}
