"use client";
import { useRef, useEffect, useState } from "react";
import ServiceCard from "../ui/ServiceCard";
import Button from "@/components/ui/Button";
import {
  MdWorkspaces,
  MdGavel
} from "react-icons/md";
import {
  FaChalkboardTeacher,
  FaNetworkWired,
  FaUserFriends
} from "react-icons/fa";
import { RiUserStarFill } from "react-icons/ri";
import { GiLaurelCrown } from "react-icons/gi";


const services = [
  {
    icon: <MdWorkspaces size={20} />,
    title: "Dedicated Office Spaces",
    desc: "We provide modern, fully equipped office spaces designed to boost productivity and teamwork for startups."
  },
  {
    icon: <FaChalkboardTeacher size={20} />,
    title: "Trainings & Workshops",
    desc: "Expert-led workshops covering business planning, finance, marketing, and technology to strengthen startup skills."
  },
  {
    icon: <RiUserStarFill size={20} />,
    title: "Mentoring",
    desc: "Experienced mentors support startups through ideation, development, scaling, and overall strategic growth."
  },
  {
    icon: <FaNetworkWired size={20} />,
    title: "Access to Network",
    desc: "Connect with investors, industry leaders, and entrepreneurs through events, pitch sessions, and collaborations."
  },
  {
    icon: <FaUserFriends size={20} />,
    title: "HR / Intern Support",
    desc: "We help startups hire interns and skilled talent through our university network and partnered institutions."
  },
  {
    icon: <GiLaurelCrown size={20} />,
    title: "Events & Competitions",
    desc: "We host events and competitions that help startups showcase ideas, gain visibility, and attract investors."
  },
  {
    icon: <MdGavel size={20} />,
    title: "Legal & Accounting Support",
    desc: "Essential legal and accounting assistance through expert partners for smooth and compliant operations."
  }
];


export default function ServicesSection() {
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  let speed = 0;
  let current = 0;
  let autoSpeed = 0.22;
  let inside = false;
  let raf: number;

  const animate = () => {
    if (!scrollRef.current || showAll) return;
    const el = scrollRef.current;
    const half = el.scrollWidth / 2;

    current += autoSpeed + speed;
    el.scrollLeft = current;
    speed *= 0.9;

    if (current >= half) current -= half;
    if (current <= 0) current += half;

    raf = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!inside || showAll) return;
    speed += e.movementX * 0.09;
  };

  const handleWheel = (e: WheelEvent) => {
    if (!inside || showAll) return;
    e.preventDefault();
    speed += e.deltaY * 0.09;
  };

  const enter = () => {
    if (showAll) return;
    inside = true;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleWheel, { passive: false });
  };

  const leave = () => {
    inside = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("wheel", handleWheel);
  };

  useEffect(() => {
    if (scrollRef.current && !showAll) {
      const el = scrollRef.current;
      const half = el.scrollWidth / 2;
      el.scrollLeft = half;
      current = half;
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [showAll]);

  return (
    <section className="py-8 bg-white">
      <div className="container-global px-3">

        {/* Small Title */}
        <div className="text-center mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Our Services
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
            Support to help startups build, launch & grow
          </p>
        </div>

        {/* Slider */}
        {!showAll && (
          <div className="relative mt-4">
            <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

            <div
              ref={scrollRef}
              onMouseEnter={enter}
              onMouseLeave={leave}
              className="
                flex gap-4
                overflow-x-hidden 
                py-2 
                select-none 
                [scrollbar-width:none]
                [-ms-overflow-style:none]
              "
            >
              {[...services, ...services].map((s, i) => (
                <div
                  key={i}
                  className="
                    min-w-[130px] 
                    sm:min-w-[150px] 
                    md:min-w-[210px]     /* ⬅️ 15% bigger for desktop */
                    lg:min-w-[230px]     /* ⬅️ even better sizing for large screens */
                  "
                >
                  <ServiceCard icon={s.icon} title={s.title} desc={s.desc} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View All Button */}
        {!showAll && (
          <div className="flex justify-center mt-4">
            <Button className="text-xs px-3 py-1" onClick={() => setShowAll(true)}>
              View All
            </Button>
          </div>
        )}

        {/* Grid View */}
        {showAll && (
          <>
            <div
              className="
              mt-5 
              grid grid-cols-2 
              sm:grid-cols-3 
              lg:grid-cols-4 
              gap-4 sm:gap-5
            "
            >
              {services.map((s, i) => (
                <ServiceCard key={i} icon={s.icon} title={s.title} desc={s.desc} />
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <Button className="text-xs px-3 py-1" onClick={() => setShowAll(false)}>
                Show Less
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
