"use client";

import BannerWrapper from "@/components/about/AboutBannerWrapper";
import CardWrapper from "@/components/ui/ThreeDWaveCardWrapper";
import { MdOutlineWork } from "react-icons/md";
import { FaChalkboardTeacher, FaUsers, FaNetworkWired, FaBalanceScale } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <>
      {/* ✅ Banner Section — Smaller & No animation */}
      <BannerWrapper
        heading="Our Services"
        subtitle="Empowering innovators through our core offerings."
      />

      {/* ========================= MAIN SECTION ========================= */}
      <section className="relative py-8 px-3 bg-white md:py-10">

        {/* === Heading Section (30% smaller) === */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#0b1220] mb-1">
            Our Services
          </h2>

          <p className="text-[#555] text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Discover how we help startups grow and innovate.
          </p>

          <div className="mx-auto mt-3 h-[2.5px] w-16 rounded-full bg-[#00d2ef] opacity-90" />
        </motion.div>

        {/* === Cards Grid — Reduced By 30% === */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="
            container-global grid 
            grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            gap-4 md:gap-6 max-w-5xl mx-auto
          "
        >
          <CardWrapper
            heading="Dedicated Office Spaces"
            text="Professional, fully equipped workspaces designed to enhance productivity and collaboration among startups. Includes modern amenities and a focused working environment."
            icon={<MdOutlineWork size={28} color="#ee9e26" />}
          />

          <CardWrapper
            heading="Trainings & Workshops"
            text="Skill-building sessions on business planning, finance, marketing, and technology—conducted by industry experts and seasoned entrepreneurs to help startups grow faster."
            icon={<FaChalkboardTeacher size={28} color="#00d2ef" />}
          />

          <CardWrapper
            heading="Mentoring"
            text="Continuous guidance from experienced mentors who support founders through ideation, development, scaling, and beyond—ensuring startups move in the right direction."
            icon={<AiOutlineTeam size={28} color="#ee9e26" />}
          />

          <CardWrapper
            heading="Access to Network"
            text="Opportunities to connect with investors, industry leaders, and innovators through networking events, pitch sessions, and collaborative initiatives."
            icon={<FaNetworkWired size={28} color="#00d2ef" />}
          />

          <CardWrapper
            heading="HR / Intern Support"
            text="Assistance in hiring talent and interns through CVRU’s university ecosystem and partner institutions, helping startups build strong teams early on."
            icon={<RiUserSettingsLine size={28} color="#ee9e26" />}
          />

          <CardWrapper
            heading="Events & Competitions"
            text="Platforms to pitch ideas, gain visibility, and attract investors through various startup events and competitions hosted by CVRU iTBI."
            icon={<FaUsers size={28} color="#00d2ef" />}
          />

          <CardWrapper
            heading="Legal & Accounting Support"
            text="Support for legal compliance, documentation, and financial structuring through our network of legal and accounting partners."
            icon={<FaBalanceScale size={28} color="#ee9e26" />}
          />

        </motion.div>
      </section>
    </>
  );
}
