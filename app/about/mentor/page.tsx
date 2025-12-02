"use client";

import { useState, useMemo } from "react";
import BannerWrapper from "@/components/about/AboutBannerWrapper";
import { AiOutlineClose, AiFillLinkedin, AiOutlineUser } from "react-icons/ai";
import Button from "@/components/ui/Button";

/* ---------------- Mentor Data ---------------- */
const mentors = [
    {
        name: "Sachin Kale",
        profile: "Agripreneur. Started agriculture company after 10+ industry experience.",
        media: "https://thebetterindia.com/94285/sachin-kale-innovative-agrilife-solutions-engineer-turned-farmer/",
        city: "Bilaspur",
        sector: "Agriculture/AgriTech",
        expertise: "Agriculture, Innovative Farming",
        linkedin: "https://www.linkedin.com/in/dr-sachin-ashok-kale-80721121/"
    },
    {
        name: "Satendrasingh Lilhare",
        profile: "Founder of Bastar se Bazaar Tak; manufacturing, supply, and global export of natural and organic agricultural products. Won many awards at National & International forums for promoting rural economy.",
        extraLink: "http://www.bastarsebazaartak.in/",
        city: "Bastar",
        sector: "Rural E-Commerce",
        expertise: "Business Development",
        linkedin: "https://www.linkedin.com/in/satendrasingh-lilhare-8995b4a6"
    },
    {
        name: "Abhijit Tripathy",
        profile: "Founder & CEO of Presear Softwares. Senior Business Development Executive at Prodigal AI (Australia). Engineer, author, researcher and mentor in Kaggle. Several awards including IAF Most Promising Startup Award 2022.",
        city: "Bilaspur",
        sector: "IT/ITES",
        expertise: "IT/ITES/AI",
        linkedin: "https://www.linkedin.com/in/abhijit-tripathy/"
    },
    {
        name: "Dr. Domendra Singh Ganjir",
        profile: "CoFounder of Businessgarh",
        city: "Raipur",
        sector: "D2C",
        expertise: "D2C",
        linkedin: "https://www.linkedin.com/in/dr-domendra-singh-ganjir-9760a929/"
    },
    {
        name: "Harsh Vardhan Agrawal",
        profile: "Founder & CEO PrintMine.in and CoFounder of Businessgarh",
        city: "Raipur",
        sector: "D2C",
        expertise: "D2C",
        linkedin: "https://www.linkedin.com/in/harshvagrawal"
    },
    {
        name: "Aashtha Amanat",
        profile: "",
        city: "Raipur",
        sector: "D2C",
        expertise: "Brand Building & PR",
        linkedin: "https://www.linkedin.com/in/aastha-amanat/"
    },
    {
        name: "Saurabh Jain",
        profile: "Founder, Fun2Do Labs (EdTech Startup), Ex-Vice President @Paytm, Startup Guru",
        city: "Delhi",
        sector: "EdTech",
        expertise: "BMC, Lean Canvas",
        linkedin: "https://www.linkedin.com/in/saurabhskj/"
    },
    {
        name: "Gautam Jha",
        profile: "Start-Up Ecosystem Events / Live Pitching / Fund Raising / Angel Investment / Consultancy",
        city: "Noida",
        sector: "Angel Investment",
        expertise: "Fund Raising",
        linkedin: "https://www.linkedin.com/in/gautaam-jhha/"
    },
    {
        name: "Lokesh Patade",
        profile: "Founder, Meadow Agrotech",
        city: "Bilaspur",
        sector: "Agritech",
        expertise: "Agriculture, Innovative Farming",
        linkedin: ""
    },
    {
        name: "Anshu Agrawal",
        profile: "",
        city: "Korba",
        sector: "SaaS",
        expertise: "IT/ITES/AI",
        linkedin: "https://www.linkedin.com/in/anshuevdt"
    },
    {
        name: "Dr. Rupal Farista",
        profile: "Personal site / profile",
        extraLink: "https://aminfarista.com/amin/index.php",
        city: "Rajnandgaon/Raipur",
        sector: "",
        expertise: "Sustainable Fabric",
        linkedin: ""
    }
];

/* ---------------- Page Component ---------------- */
export default function MentorPage() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("");
  const [selected, setSelected] = useState<any>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return mentors.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(q) ||
        (m.city || "").toLowerCase().includes(q) ||
        (m.sector || "").toLowerCase().includes(q) ||
        (m.expertise || "").toLowerCase().includes(q);

      const matchSector = !sector || m.sector === sector;
      return matchSearch && matchSector;
    });
  }, [search, sector]);

  return (
    <>
      {/* ❗ Banner also 50% smaller */}
      <BannerWrapper
        heading="Mentors"
        subtitle="Meet the experts guiding founders toward innovation and success."
      />

      <section className="relative bg-gradient-to-b from-[#f8fdff] to-white py-12 overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[50%] h-[160px] bg-[#00d2ef]/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="container-global px-3 md:px-6 lg:px-10 relative z-10">
          {/* ---------------- Heading + Filters (50% smaller) ---------------- */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#0b1220]">
                Mentor <span className="text-[#00cce3]">Directory</span>
              </h2>
              <p className="text-gray-600 mt-2 text-xs md:text-sm max-w-md">
                Explore mentors across diverse expertise and sectors.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <input
                placeholder="Search mentors..."
                className="bg-white/60 border border-gray-200 rounded-full px-3 py-1.5 
                           w-[180px] text-xs shadow-sm focus:ring-2 focus:ring-[#00cce3]/40 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="bg-white/60 border border-gray-200 rounded-full px-3 py-1.5 
                           text-xs shadow-sm focus:ring-2 focus:ring-[#00cce3]/40 outline-none"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              >
                <option value="">All Sectors</option>
                <option value="Agriculture/AgriTech">Agriculture/AgriTech</option>
              </select>
            </div>
          </div>

          {/* ---------------- GRID (50% smaller) ---------------- */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m, index) => (
              <div
                key={index}
                className="bg-white/80 border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-lg 
                           transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar 50% smaller */}
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00d2ef] to-[#0092a1] 
                                 rounded-lg flex items-center justify-center text-white shadow">
                    <AiOutlineUser size={16} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-base text-[#0b1220] text-sm">
                      {m.name}
                    </h3>
                    <p className="text-[10px] text-gray-500">{m.city}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.sector && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#e6fbff] text-[#00b5d6] border border-[#00cce33a]">
                      {m.sector}
                    </span>
                  )}
                </div>

                {/* Profile Text */}
                <p className="text-[11px] text-gray-600 mt-3 line-clamp-3 min-h-[36px]">
                  {m.profile || "—"}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button className="text-xs px-3 py-1.5" onClick={() => setSelected(m)}>
                    Details
                  </Button>

                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      className="px-3 py-1.5 border border-[#ee9e26] text-[#ee9e26] 
                                 rounded-lg text-xs flex items-center gap-1 hover:bg-[#ee9e26] hover:text-white transition"
                    >
                      <AiFillLinkedin size={14} />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-xs mt-10">
            Tip: click “Details” to view complete profile
          </p>
        </div>

        {/* ---------------- MODAL (50% smaller) ---------------- */}
        {selected && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-sm rounded-xl shadow-xl p-4 border border-gray-200 
                           max-h-[70vh] overflow-y-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{selected.name}</h3>
                  <p className="text-gray-500 text-xs">
                    {selected.city} • {selected.sector}
                  </p>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="p-1.5 border rounded-lg hover:bg-gray-100 transition"
                >
                  <AiOutlineClose size={14} />
                </button>
              </div>

              <p className="mt-3 text-sm text-gray-700">{selected.profile}</p>

              {selected.expertise && (
                <p className="mt-2 text-xs">
                  <strong>Expertise:</strong> {selected.expertise}
                </p>
              )}

              {selected.media && (
                <p className="mt-2 text-xs">
                  <strong>Media:</strong>{" "}
                  <a href={selected.media} target="_blank" className="text-[#ee9e26]">
                    {selected.media}
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
