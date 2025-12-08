"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  FaHeartbeat,
  FaMicroscope,
  FaBrain,
  FaShieldAlt,
  FaStethoscope,
} from "react-icons/fa";
import Button from "@/components/ui/Button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface NodeItem {
  icon: React.ReactNode;
  label: string;
  x: string;
  y: string;
}

export default function NeuroVortexShowcaseTilt() {
  const vortexRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const nodesRef = useRef<HTMLDivElement[]>([]);

  const nodeItems: NodeItem[] = [
    { icon: <FaStethoscope />, label: "Sensors", x: "50%", y: "-8%" },
    { icon: <FaBrain />, label: "AI Core", x: "10%", y: "20%" },
    { icon: <FaShieldAlt />, label: "FDA Safe", x: "90%", y: "20%" },
    { icon: <FaMicroscope />, label: "Lab Analysis", x: "20%", y: "85%" },
    { icon: <FaHeartbeat />, label: "Vitals", x: "80%", y: "85%" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 🌪 Soft rotating vortex BG */
      if (vortexRef.current) {
        gsap.to(vortexRef.current, {
          rotate: 360,
          duration: 40,
          ease: "none",
          repeat: -1,
        });
      }

      /* 🌬 Float effect on nodes */
      nodesRef.current.forEach((node) => {
        gsap.to(node, {
          x: gsap.utils.random(-12, 12),
          y: gsap.utils.random(-12, 12),
          duration: gsap.utils.random(2.5, 4.5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      /* ✨ Text reveal */
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-40 bg-white text-slate-900 overflow-hidden">

      {/* ⭐ VORTEX BG: Updated to Royal Blue Gradient */}
      <div
        ref={vortexRef}
        className="absolute inset-0 mx-auto w-[1300px] h-[1300px] rounded-full 
        bg-[radial-gradient(circle,rgba(26,86,219,0.18),transparent_70%)] 
        blur-3xl opacity-60"
      />

      {/* ⭐ NEBULA OVERLAY: Subtle Royal Blue conic tint */}
      <div className="absolute inset-0 bg-[conic-gradient(from_180deg,rgba(26,86,219,0.05),transparent_60%)]
      blur-3xl" />

      {/* HEADER */}
      <div className="relative z-20 text-center max-w-3xl mx-auto px-6">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight"
        >
          Precision Reimagined
          <span className="text-[#1A56DB] block">Neuro-Vortex Medical Engine</span>
        </h1>

        <p className="mt-6 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          A cinematic demonstration of next-gen AI medical systems built for accuracy, 
          performance, and intelligent diagnostics.
        </p>
      </div>

      {/* DEVICE + ICONS */}
      <div className="relative mt-32 flex justify-center">
        <div
          className="relative w-[360px] sm:w-[460px] lg:w-[520px]
          h-[360px] sm:h-[460px] lg:h-[520px]"
        >
          {/* ⭐ AURORA GLOW: Updated to softer Royal Blue blur */}
          <div className="absolute inset-0 bg-[#1A56DB]/15 blur-3xl z-10" />

          {/* DEVICE IMAGE */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-[70%]">
              <Image
                src="/images/girl-img.png"
                alt="Medical Device"
                fill
                className="object-contain z-20 drop-shadow-[0_40px_60px_rgba(26,86,219,0.15)]"
              />
            </div>
          </div>

          {/* ICON NODES */}
          {nodeItems.map((node, i) => (
            <Node
              key={i}
              innerRef={(el) => el && (nodesRef.current[i] = el)}
              icon={node.icon}
              label={node.label}
              x={node.x}
              y={node.y}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
                <Link href="/products">
                  <Button className="rounded-xl">Explore More</Button>
                </Link>
      </div>
    </section>
  );
}

/* NODE COMPONENT: Updated style to match Royal Blue UI */
function Node({
  innerRef,
  icon,
  label,
  x,
  y,
}: {
  innerRef: (el: HTMLDivElement | null) => void;
  icon: React.ReactNode;
  label: string;
  x: string;
  y: string;
}) {
  return (
    <div
      ref={innerRef}
      className="absolute flex flex-col items-center text-center z-30"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-xl border border-blue-100 
      shadow-2xl shadow-blue-900/10 flex items-center justify-center text-[#1A56DB] text-xl">
        {icon}
      </div>
      <p className="text-[10px] uppercase tracking-widest mt-3 font-extrabold text-slate-400">{label}</p>
    </div>
  );
}