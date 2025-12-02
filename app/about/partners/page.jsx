"use client";

import Image from "next/image";
import BannerWrapper from "@/components/about/AboutBannerWrapper";

const partnersData = {
  corporate: [
    { title: "Nasscom Foundation", logo: "/partners-logo/corporate-partners/nasscom.jpg" },
    { title: "Wadhwani Foundation", logo: "/partners-logo/corporate-partners/wadhwani.webp" },
    { title: "Sahabhagi Samaj Sevi Sanstha", logo: "/partners-logo/corporate-partners/sahabhagi.jpg" },
    { title: "SetMyCart", logo: "/partners-logo/corporate-partners/setmycart.png" },
    { title: "Headstart Chhattisagrh", logo: "/partners-logo/corporate-partners/headstart.jpg" },
  ],
  investment: [
    { title: "Real Time Angel Fund", logo: "/partners-logo/investment-partners/realtime.png" },
    { title: "Fluid Venture", logo: "/partners-logo/investment-partners/fluid.png" },
    { title: "Miaana Partners", logo: "/partners-logo/investment-partners/miaana.jpg" },
  ],
};

export default function PartnersPage() {
  return (
    <>
      {/* Banner — 50% smaller text */}
      <BannerWrapper
        heading="Our Partners"
        subtitle="Meet the experts guiding founders toward innovation and success."
      />

      {/* MAIN SECTION — 50% smaller */}
      <section className="relative bg-gradient-to-b from-[#f8fdff] to-white text-[#0b1220] py-12 overflow-hidden">
        <div className="container-global px-4 md:px-10">

          {/* Main Heading — 50% smaller */}
          <h1 className="text-2xl md:text-3xl font-extrabold mb-10">
            Our <span className="text-[#00d2ef]">Partners</span>
          </h1>

          <Section title="Corporate Partners" data={partnersData.corporate} />
          <Section title="Investment Partners" data={partnersData.investment} />
        </div>

        {/* Background Glow — reduced 50% */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[50%] h-[150px] bg-[#00d2ef]/15 blur-2xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[150px] h-[100px] bg-[#00d2ef]/10 blur-xl rounded-full pointer-events-none" />
      </section>
    </>
  );
}

function Section({ title, data }) {
  return (
    <div className="mb-14">

      {/* Section Title — 50% smaller */}
      <h2 className="text-xl md:text-2xl font-bold mb-6 tracking-tight text-[#0b1220]">
        <span className="border-l-4 border-[#ee9e26] pl-2">{title}</span>
      </h2>

      {/* GRID — 50% smaller cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {data.map((item, i) => (
          <div
            key={i}
            className="relative bg-white border border-[#eaf5f7] rounded-2xl py-6 px-2 
                       shadow-sm hover:shadow-lg hover:scale-[1.03] transition-all duration-500 
                       group overflow-hidden"
          >
            {/* Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#00d2ef]/10 rounded-bl-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Logo — 50% size */}
            <div className="w-24 h-24 mb-4 relative mx-auto drop-shadow-sm">
              <Image src={item.logo} alt={item.title} fill className="object-contain" />
            </div>

            {/* Title — 50% size */}
            <h3 className="text-sm md:text-base font-semibold text-center text-[#0b1220] group-hover:text-[#00b4cc] transition-colors">
              {item.title}
            </h3>
          </div>
        ))}

      </div>
    </div>
  );
}
