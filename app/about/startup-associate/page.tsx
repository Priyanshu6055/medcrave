"use client";

import BannerWrapper from "@/components/about/AboutBannerWrapper";
import Image from "next/image";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";

const startups = [
  {
    name: "Aarin Aroma",
    company: "AARIN AROMABLEND LLP",
    website: "https://aarinaroma.com/",
    firm: "Company",
    logo: "/asoociated-startup-logo/aroma.jpeg",
  },
  {
    name: "Virtuon",
    company: "VIRTUON TECHNOLOGIES PRIVATE LIMITED",
    website: "https://virtuon.in/",
    firm: "Company",
    logo: "/asoociated-startup-logo/virtuon.jpeg",
  },
  {
    name: "Sanora Wear",
    company: "AKSH-NATH TECHNOLOGIES PRIVATE LIMITED",
    website:
      "https://in.linkedin.com/company/nath-technologies-pvt-ltd?trk=public_profile_experience-item_profile-section-card_image-click",
    firm: "Company",
    logo: "/asoociated-startup-logo/sanora.jpeg",
  },
  {
    name: "Lirak AI",
    company: "CHALBO INDIA PRIVATE LIMITED",
    website: "https://www.linkedin.com/company/lairak-ai-telematic",
    firm: "Company",
    logo: "/asoociated-startup-logo/lirak.jpeg",
  },
  {
    name: "Vedartva",
    company: "Ganjir Healthcare Private limited",
    website: "https://vedartva.com/",
    firm: "Company",
    logo: "/asoociated-startup-logo/vedartva.jpeg",
  },
  {
    name: "Heiland",
    company: "Oceanic Herbs",
    website: "https://in.linkedin.com/in/heiland-cares-337470291",
    firm: "LLP",
    logo: "/asoociated-startup-logo/heiland.jpeg",
  },
  {
    name: "Eco Biofiber",
    company: "Saanvi Eco Biofiber Private limited",
    website: null,
    firm: "Company",
    logo: "/asoociated-startup-logo/ecofiber.jpeg",
  },
  {
    name: "Azeedo",
    company: "Azeedo Private Limited",
    website: "https://www.azeedoagritech.com/",
    firm: "Company",
    logo: "/asoociated-startup-logo/azeedo.jpeg",
  },
  {
    name: "AutogradeX",
    company: "AUTOGRADEX ASSESSMENTS PRIVATE LIMITED",
    website: "https://autogradex.com/",
    firm: "Company",
    logo: "/asoociated-startup-logo/autox.jpeg",
  },
  {
    name: "Farm Fresco",
    company: "Yummy Yum Food Products Private Limited",
    website: "https://farmfres.co/",
    firm: "Company",
    logo: "/asoociated-startup-logo/farm.jpeg",
  },
  {
    name: "Zenithzap",
    company: "Zenithzap Beverages Private Limited",
    website: "https://www.linkedin.com/company/zenithzap",
    firm: "Company",
    logo: "/asoociated-startup-logo/zenith.jpeg",
  },
  {
    name: "Bald is Bold",
    company: "Meta Madtech",
    website: "https://baldisbold.com/",
    firm: "Proprietorship",
    logo: "/asoociated-startup-logo/bald.jpeg",
  },
  {
    name: "Amrit Manthan",
    company: "Amrit Manthan Naturals Private Limited",
    website: "https://amritmanthan.in/",
    firm: "Company",
    logo: "/asoociated-startup-logo/amrit.jpeg",
  },
  {
    name: "Vandhan",
    company: "Saal Mahua Ventures Pvt Ltd",
    website: "https://www.saalmahua.com/",
    firm: "Company",
    logo: "/asoociated-startup-logo/vandhan.jpeg",
  },
  {
    name: "Grainscope",
    company: "Grainkart Private Limited",
    website: "https://www.grainscope.ai/",
    firm: "Company",
    logo: "/asoociated-startup-logo/grain.jpeg",
  },
];

export default function StartupAssociatePage() {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = useMemo(() => {
    return startups.filter(
      (s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.company.toLowerCase().includes(query.toLowerCase()) ||
        s.firm.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const visibleStartups = filtered.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
    setTimeout(() => {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const handleShowLess = () => {
    setVisibleCount(12);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <>
      {/* Banner (kept same unless you want 50% smaller too) */}
      <BannerWrapper
        heading="Startup Associated"
        subtitle="Meet the passionate innovators driving our mission forward."
      />

      <section className="relative bg-gradient-to-b from-[#f8fdff] to-white text-[#0b1220] py-14 overflow-hidden">
        <div className="container-global px-4 md:px-8 lg:px-12">
          
          {/* HEADER — 50% smaller */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
                Startup <span className="text-[#00d2ef]">Associated</span>
              </h2>
              <p className="text-gray-600 mt-2 text-xs md:text-sm max-w-sm">
                Explore startups incubated and supported by us.
              </p>
            </div>

            {/* Search Bar (50% size) */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 
                            w-full md:w-[200px] shadow-sm hover:shadow-md transition-all">
              <Search size={14} className="text-[#00d2ef]" />
              <input
                type="text"
                placeholder="Search startup..."
                className="w-full bg-transparent outline-none text-xs text-gray-700 placeholder:text-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {/* COUNTER — small */}
          <div className="text-xs text-gray-500 mb-5">
            Showing{" "}
            <span className="font-semibold text-[#00b5d6]">{visibleStartups.length}</span> of{" "}
            <span className="font-semibold text-[#00b5d6]">{filtered.length}</span> startups
          </div>

          {/* GRID — cards 50% smaller */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleStartups.map((startup) => (
              <div
                key={startup.name}
                className="bg-white border border-[#eaf5f7] rounded-xl p-4 shadow-sm hover:shadow-lg
                           hover:border-[#00d2ef30] hover:scale-[1.02] transition-all duration-300 
                           flex flex-col items-center text-center"
              >
                {/* Logo Box (50% smaller) */}
                <div className="relative w-24 h-16 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                  {startup.logo ? (
                    <Image
                      src={startup.logo}
                      alt={startup.name}
                      width={120}
                      height={80}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-lg font-semibold text-[#00b5d6]">
                      {startup.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* TEXT — 50% size */}
                <h3 className="text-sm font-bold">{startup.name}</h3>
                <p className="text-[11px] text-gray-600 mb-1">{startup.company}</p>

                <p className="text-[10px] font-medium text-[#00b5d6] bg-[#e6fbff] px-2 py-1 rounded-full inline-block mb-2">
                  {startup.firm}
                </p>

                {/* BUTTON — 50% size */}
                {startup.website ? (
                  <Button
                    href={startup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] px-3 py-1.5"
                  >
                    Visit Website
                  </Button>
                ) : (
                  <span className="text-[10px] text-gray-500 bg-[#f1fafe] px-3 py-1.5 rounded-lg border border-dashed border-[#00b5d640]">
                    Not Available
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* PAGINATION (small) */}
          <div className="flex justify-center mt-10 gap-3">
            {visibleCount < filtered.length && (
              <Button onClick={handleLoadMore} className="text-xs px-4 py-1.5">
                Load More
              </Button>
            )}

            {visibleCount > 12 && (
              <Button onClick={handleShowLess} className="text-xs px-4 py-1.5">
                Show Less
              </Button>
            )}
          </div>
        </div>

        {/* Glow reduced 50% */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[50%] h-[150px] bg-[#00d2ef]/10 blur-2xl rounded-full pointer-events-none" />
      </section>
    </>
  );
}
