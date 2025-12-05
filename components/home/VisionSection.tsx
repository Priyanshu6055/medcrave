"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cpu, ShieldCheck, Activity, Layers } from "lucide-react";

export default function FutureHologramShowcase() {
  return (
    <section className="relative py-28 sm:py-40 bg-white overflow-hidden text-[#0A1A44]">
      
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,74,255,0.05),transparent_65%)]" />
      <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,#0A1A44_1px,transparent_1px),linear-gradient(to_bottom,#0A1A44_1px,transparent_1px)] 
                      bg-[size:40px_40px] sm:bg-[size:60px_60px]" />

      {/* Glow Effects */}
      <div className="absolute w-[800px] sm:w-[1000px] h-[800px] sm:h-[1000px] bg-blue-300/20 blur-[200px] -top-40 left-1/2 -translate-x-1/2" />

      <div className="container-global relative z-10 px-5">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            The Future of  
            <span className="text-blue-600"> Medical Engineering</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="mt-5 sm:mt-6 text-blue-900/70 text-base sm:text-lg"
          >
            Experience next-gen AI-enhanced clinical equipment through an  
            immersive holographic blueprint interface.
          </motion.p>
        </div>

        {/* HOLOGRAM SHOWCASE */}
        <div className="relative mt-20 sm:mt-28 flex justify-center">

          {/* Rotating Hologram */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px]
                       rounded-full border border-blue-300/30
                       shadow-[0_0_120px_rgba(0,123,255,0.28)]
                       bg-white/10 backdrop-blur-2xl overflow-hidden"
          >
            <Image
              src="/"
              alt="Future Medical Device"
              fill
              className="object-contain p-6 sm:p-10 opacity-95 drop-shadow-[0_30px_40px_rgba(0,0,0,0.15)]"
            />
          </motion.div>

          {/* Vertical Scan Line */}
          <motion.div
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-1/2 w-[1.5px] sm:w-[2px] h-full bg-gradient-to-b 
                       from-transparent via-blue-400/70 to-transparent"
          />

          {/* Floating Labels – MOBILE OPTIMIZED */}
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20 sm:mt-28"
        >
          <a
            href="#"
            className="px-10 sm:px-14 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-xl
                       bg-blue-600 text-white shadow-xl shadow-blue-400/40 hover:bg-blue-700 transition"
          >
            Explore More
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* MOBILE-RESPONSIVE FLOATING LABEL COMPONENT */
function FloatingLabel({
  icon,
  text,
  x,
  y,
  smX,
  smY,
}: {
  icon: React.ReactNode;
  text: string;
  x: string;
  y: string;
  smX: string;
  smY: string;
}) {
  return (
    <motion.div
      animate={{ y: ["0px", "-6px", "0px"] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute px-3 py-2 sm:px-4 sm:py-2 bg-white/70 backdrop-blur-xl 
                 rounded-lg border border-blue-200 shadow-md 
                 flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A1A44]"
      style={{
        transform: `translate(${x}, ${y})`,
      }}
    >
      {icon}
      {text}

      {/* Override position for screens >= 640px */}
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
