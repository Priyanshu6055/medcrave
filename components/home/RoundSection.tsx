"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cpu, ShieldCheck, Activity, Layers } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

// ----------------------------------------
// THEME COLORS
// ----------------------------------------
const PRIMARY = "#7A3283";       // Medcrave Purple
const SECONDARY = "#85CD7C";     // Soft Green (subtle use)

export default function FutureHologramShowcase() {
  return (
    <section className="relative py-28 sm:py-40 bg-white overflow-hidden text-[#0A1A44]">

      {/* ⭐ Blueprint Background — Purple + very soft green tint */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, ${PRIMARY}10, ${SECONDARY}05, transparent 65%)`,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          background: `
            linear-gradient(to right, ${PRIMARY}1A 1px, transparent 1px),
            linear-gradient(to bottom, ${PRIMARY}1A 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ⭐ Glow Effects — Mostly purple + a tiny amount of green */}
      <div
        className="absolute w-[800px] sm:w-[1000px] h-[800px] sm:h-[1000px] 
                   blur-[200px] -top-40 left-1/2 -translate-x-1/2"
        style={{
          background: `radial-gradient(circle, ${PRIMARY}33, ${SECONDARY}15)`,
        }}
      />

      <div className="container-global relative z-10 px-5">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-20">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              The Future of
              <span style={{ color: PRIMARY }} className="block">
                Medical Engineering
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="mt-5 sm:mt-6 text-slate-600 text-base sm:text-lg"
            >
              Experience next-gen AI-enhanced clinical equipment through an
              immersive holographic blueprint interface.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mt-20 sm:mt-15"
            >
              <Link href="/products">
                <Button className="rounded-xl bg-[#7A3283] text-white hover:bg-[#62246A]">
                  Explore More
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* ⭐ HOLOGRAM SHOWCASE */}
          <div className="relative flex justify-center">

            {/* Floating rotating hologram */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[400px] lg:h-[400px]
                       rounded-full bg-white/10 backdrop-blur-2xl overflow-hidden"
              style={{
                border: `1px solid ${PRIMARY}40`,
                boxShadow: `0 0 120px ${PRIMARY}55, 0 0 40px ${SECONDARY}30`,
              }}
            >
              <Image
                src="/images/purple-circle.png"
                alt="Future Medical Device"
                fill
                className="object-contain p-6 sm:p-10 opacity-95 rounded-full"
                style={{
                  filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.15))",
                }}
              />
            </motion.div>

            {/* FLOATING LABELS — Purple UI + subtle green glow */}
            <FloatingLabel
              icon={<Cpu size={18} />}
              text="AI Diagnostics Core"
              x="-160px"
              y="-40px"
              smX="-260px"
              smY="-50px"
            />

            <FloatingLabel
              icon={<ShieldCheck size={18} />}
              text="FDA Certified Safety"
              x="160px"
              y="20px"
              smX="260px"
              smY="20px"
            />

            <FloatingLabel
              icon={<Activity size={18} />}
              text="Realtime Vital Engine"
              x="-150px"
              y="140px"
              smX="-240px"
              smY="160px"
            />

            <FloatingLabel
              icon={<Layers size={18} />}
              text="Precision Sensor Layers"
              x="150px"
              y="-120px"
              smX="240px"
              smY="-150px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------
   FLOATING LABEL — Purple base + light green glow
---------------------------------------- */
interface FloatingLabelProps {
  icon: React.ReactNode;
  text: string;
  x: string;
  y: string;
  smX: string;
  smY: string;
}

function FloatingLabel({ icon, text, x, y, smX, smY }: FloatingLabelProps) {
  return (
    <motion.div
      animate={{ y: ["0px", "-6px", "0px"] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute px-3 py-2 sm:px-4 sm:py-2 
                 bg-white/70 backdrop-blur-xl rounded-lg 
                 flex items-center gap-2 text-xs sm:text-sm font-semibold 
                 shadow-md"
      style={{
        color: PRIMARY,
        border: `1px solid ${PRIMARY}22`,
        boxShadow: `0 0 12px ${SECONDARY}55`, // soft green glow
        transform: `translate(${x}, ${y})`,
      }}
    >
      {icon}
      {text}

      {/* Mobile → Desktop override */}
      <style jsx>{`
        @media (min-width: 640px) {
          div {
            transform: translate(${smX}, ${smY}) !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
