"use client";

import Button from "@/components/ui/Button";

export default function DownloadSection() {
  return (
    <section className="py-12 bg-gradient-to-b from-[#eef9ff] to-white text-center relative overflow-hidden">
      {/* Soft Static Glows */}
      <div className="absolute top-[-40px] left-[-40px] w-56 h-56 bg-[#00d2ef]/60 rounded-full blur-[80px] mix-blend-screen" />
      <div className="absolute bottom-[-50px] right-[-50px] w-72 h-72 bg-cyan-500/50 rounded-full blur-[100px] mix-blend-screen" />

      <div className="container-global mx-auto px-6">
        {/* 🔥 INFINITE SCROLLING TEXT */}
        {/* 🔥 TRUE INFINITE SCROLLING TEXT */}
        <div className="relative w-full overflow-hidden">
          {/* Left Blur */}
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />

          {/* Right Blur */}
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

          {/* Scrolling container */}
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="text-4xl font-extrabold text-gray-900 mx-10 tracking-wide"
              >
                Notice Inviting Quotation for Supply & Installation of D&D Lab
                Equipment at{" "}
                <span className="text-[#ee9e26]">CVRU i-TBI Foundation</span>,
                Bilaspur
              </span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <p className="mt-7 text-gray-600 text-lg">
          Click below to download the official NIQ PDF.
        </p>

        {/* Button */}
        <div className="mt-7 flex justify-center">
          <a
            href="https://cvruitbi.com/docs/CVRU%20I-TBI%20NIQ%20for%20Lab%20(D&D)%20Equipment%20.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="hover:scale-[1.03] transition-all duration-300">
              Download NIQ PDF
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
