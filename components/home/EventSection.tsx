"use client";

import { useRef, useEffect, useState } from "react";
import EventCard from "@/components/ui/EventCard";
import Button from "@/components/ui/Button";

// Event Data
const events = [
  {
    image: "/event/36-think-tank.png",
    title: "36 Think Tank: Business Plan Competition",
    speaker: "",
    date: "",
    time: "",
    fullDate: { day: "25", monthYear: "JAN 2025" },
  },
  {
    image: "/event/3d-printing.png",
    title: "3D Printers & Laser Cutter training",
    speaker: "",
    date: "",
    time: "",
    fullDate: { day: "05", monthYear: "FEB 2025" },
  },
  {
    image: "/event/AICTE-&-MIC-FDP.png",
    title: "AICTE & MIC FDP on Innovation and Entrepreneurship",
    speaker: "",
    date: "",
    time: "",
    fullDate: { day: "18", monthYear: "MAR 2025" },
  },
  {
    image: "/event/understanding-intellectual.jpeg",
    title: "Workshop: Understanding Intellectual Property Rights",
    speaker: "",
    date: "",
    time: "",
    fullDate: { day: "26", monthYear: "APR 2025" },
  },
  {
    image: "/event/ideacon.jpeg",
    title: "Ideacon 2025",
    speaker: "",
    date: "",
    time: "",
    fullDate: { day: "21", monthYear: "MAY 2025" },
  },
];

export default function EventSection() {
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  let speed = 0;
  let current = 0;
  let autoSpeed = 0.25; // Slightly slower for smaller UI
  let inside = false;
  let raf: number;

  // Auto Infinite Scroll
  const animate = () => {
    if (!scrollRef.current || showAll) return;

    const el = scrollRef.current;
    const half = el.scrollWidth / 2;

    current += autoSpeed + speed;
    el.scrollLeft = current;
    speed *= 0.92;

    if (current >= half) current -= half;
    if (current <= 0) current += half;

    raf = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!inside || showAll) return;
    speed += e.movementX * 0.08;
  };

  const handleWheel = (e: WheelEvent) => {
    if (!inside || showAll) return;
    e.preventDefault();
    speed += e.deltaY * 0.08;
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
      <div className="container-global px-4">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Events
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Join our startup-focused events, workshops & sessions.
          </p>
        </div>

        {/* Slider */}
        {!showAll && (
          <div className="relative mt-4">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent z-20" />

            <div
              ref={scrollRef}
              onMouseEnter={enter}
              onMouseLeave={leave}
              className="
                flex gap-3 
                overflow-x-hidden 
                py-2 
                cursor-pointer 
                select-none 
                [scrollbar-width:none] 
                [-ms-overflow-style:none]
              "
            >
              {[...events, ...events].map((event, i) => (
                <div
                  key={i}
                  className="
                    min-w-[150px] 
                    sm:min-w-[170px] 
                    md:min-w-[200px] 
                    lg:min-w-[230px] 
                  "
                >
                  <EventCard
                    image={event.image}
                    title={event.title}
                    speaker={event.speaker}
                    date={event.date}
                    time={event.time}
                    fullDate={event.fullDate}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View All Button */}
        {!showAll && (
          <div className="flex justify-center mt-5">
            <Button className="text-xs px-4 py-1.5" onClick={() => setShowAll(true)}>
              View All
            </Button>
          </div>
        )}

        {/* Grid View */}
        {showAll && (
          <>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {events.map((event, i) => (
                <EventCard
                  key={i}
                  image={event.image}
                  title={event.title}
                  speaker={event.speaker}
                  date={event.date}
                  time={event.time}
                  fullDate={event.fullDate}
                />
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Button className="text-xs px-4 py-1.5" onClick={() => setShowAll(false)}>
                Show Less
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
