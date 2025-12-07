"use client";

import { useRef, useEffect } from "react";
import EventCard from "@/components/ui/EquipmentCard";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const equipment = [
  {
    image: "/home-equipment/fetal-monitor.png",
    title: "Fetal Monitor",
    category: "Gynecology",
  },
  {
    image: "/home-equipment/Gynae-Electric.png",
    title: "CTG Machine",
    category: "Gynecology",
  },
  {
    image: "/home-equipment/exam-chair.png",
    title: "Gynecology Examination Chair",
    category: "Gynecology",
  },
  {
    image: "/home-equipment/Mucus-Extractor.png",
    title: "Neonatal Baby Warmer",
    category: "Gynecology",
  },
];

export default function EventSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const stats = useRef({
    current: 0,
    speed: 0,
    autoSpeed: 0.35,
    inside: false,
  });

const rafRef = useRef<number | null>(null);

  const animate = () => {
    if (!scrollRef.current) return;

    const el = scrollRef.current;
    const half = el.scrollWidth / 2;

    stats.current.current += stats.current.autoSpeed + stats.current.speed;
    el.scrollLeft = stats.current.current;
    stats.current.speed *= 0.95;

    if (stats.current.current >= half) stats.current.current -= half;
    if (stats.current.current <= 0) stats.current.current += half;

    rafRef.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!stats.current.inside) return;
    stats.current.speed += e.movementX * 0.05;
  };

  const enter = () => {
    stats.current.inside = true;
    window.addEventListener("mousemove", handleMouseMove);
  };

  const leave = () => {
    stats.current.inside = false;
    window.removeEventListener("mousemove", handleMouseMove);
  };

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const half = el.scrollWidth / 2;
      el.scrollLeft = half;
      stats.current.current = half;
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="py-16 bg-slate-50 overflow-hidden">
      <div className="container-global px-4 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Clinical <span className="text-[#1A56DB]">Equipment</span>
            </h2>
            <div className="h-1 w-20 bg-[#ee9e26] rounded-full" />
            <p className="text-slate-500 text-sm max-w-md leading-relaxed">
              Explore our range of clinical-grade neonatal diagnostics and
              monitoring solutions.
            </p>
          </div>

          <Button
            className="bg-[#1A56DB] text-white px-6 py-2 rounded-xl text-xs hover:bg-[#1E429F]"
            onClick={() => router.push("/products")}
          >
            View Full Catalog
          </Button>
        </div>

        {/* Slider */}
        <div className="relative group w-full overflow-hidden">
          <div
            ref={scrollRef}
            onMouseEnter={enter}
            onMouseLeave={leave}
            className="flex gap-6 overflow-x-hidden py-6 select-none cursor-grab active:cursor-grabbing w-full max-w-full"
          >
            {[...equipment, ...equipment].map((item, i) => (
              <div key={i} className="min-w-[240px]">
                <EventCard
                  image={item.image}
                  title={item.title}
                  category={item.category}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
