"use client";

import { FaUsers } from "react-icons/fa";
import StatsCircle from "@/components/ui/StatsCircle";

export default function BoxSection() {
  return (
    <section className="relative py-10">
      
      <div
        className="
          container-global
          w-full
          flex justify-center gap-6 md:gap-5 flex-wrap
          px-4

          /* MOBILE NORMAL */
          static translate-x-0 top-auto z-0

          /* DESKTOP FLOATING */
          md:absolute md:left-1/2 md:-top-10 md:-translate-x-1/2 md:z-50
        "
      >
        {/* Circle 1 */}
        <StatsCircle
          label="MENTORS"
          accent="#f59e0b"
          icon={<FaUsers size={22} color="white" />}
          description="Total active mentors contributing this quarter."
        />

        {/* Circle 2 */}
        <StatsCircle
          label="STARTUPS"
          accent="#00b5d6"
          icon={<FaUsers size={22} color="white" />}
          description="Total incubated startups and innovators."
        />

        {/* Circle 3 */}
        <StatsCircle
          label="INVESTORS"
          accent="#f59e0b"
          icon={<FaUsers size={22} color="white" />}
          description="Registered investors in our network."
        />
      </div>

      <div className="h-40 md:h-48"></div>
    </section>
  );
}
