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

// ----------------------------------------
// THEME COLORS
// ----------------------------------------
const PRIMARY = "#7A3283"; // Purple
const SECONDARY = "#85CD7C"; // Green

// ----------------------------------------
// TYPES
// ----------------------------------------
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

  // ----------------------------------------
  // GSAP Animations
  // ----------------------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (vortexRef.current) {
        gsap.to(vortexRef.current, {
          rotate: 360,
          duration: 40,
          ease: "none",
          repeat: -1,
        });
      }

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

      {/* ⭐ VORTEX BG – Purple core with light green tint edges */}
      <div
        ref={vortexRef}
        className="absolute inset-0 mx-auto w-[1300px] h-[1300px] rounded-full blur-3xl opacity-60"
        style={{
          background: `radial-gradient(circle, ${PRIMARY}33, ${SECONDARY}22, transparent 70%)`,
        }}
      />

      {/* Soft environmental glow */}
      <div
        className="absolute inset-0 blur-[140px] opacity-40"
        style={{ background: `radial-gradient(circle, ${SECONDARY}33, transparent 60%)` }}
      />

      {/* HEADER */}
      <div className="relative z-20 text-center max-w-3xl mx-auto px-6">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight"
        >
          Precision Reimagined
          <span className="block" style={{ color: PRIMARY }}>
            Neuro-Vortex Medical Engine
          </span>
        </h1>

        {/* Minimal green underline */}
        <div
          className="w-20 h-2 mx-auto mt-4 rounded-full"
          style={{ backgroundColor: SECONDARY }}
        />

        <p className="mt-6 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          A cinematic demonstration of next-gen AI medical systems built for
          accuracy, performance, and intelligent diagnostics.
        </p>
      </div>

      {/* DEVICE + FLOATING ICON NODES */}
      <div className="relative mt-32 flex justify-center">
        <div className="relative w-[360px] sm:w-[460px] lg:w-[520px] h-[360px] sm:h-[460px] lg:h-[520px]">

          {/* Purple / Green ambient glow */}
          <div
            className="absolute inset-0 blur-3xl z-10"
            style={{
              background: `radial-gradient(circle, ${PRIMARY}26, ${SECONDARY}26)`,
            }}
          />

          {/* DEVICE IMAGE */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-[70%]">
              <Image
                src="/images/girl-img.png"
                alt="Medical Device"
                fill
                className="object-contain z-20"
                style={{
                  filter: "drop-shadow(0 40px 60px rgba(122,50,131,0.25))",
                }}
              />
            </div>
          </div>

          {/* FLOATING PURPLE ICONS */}
          {nodeItems.map((node, i) => (
            <Node
              key={node.label}
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

/* ----------------------------------------
   NODE COMPONENT — PURPLE ONLY + NO BORDER
----------------------------------------- */
interface NodeProps {
  innerRef: (el: HTMLDivElement | null) => void;
  icon: React.ReactNode;
  label: string;
  x: string;
  y: string;
}

function Node({ innerRef, icon, label, x, y }: NodeProps) {
  return (
    <div
      ref={innerRef}
      className="absolute flex flex-col items-center text-center z-30"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      {/* PURE PURPLE FLOATING ICON (NO BORDER) */}
      <div
        className="
          w-14 h-14 rounded-2xl 
          bg-white/90 backdrop-blur-xl 
          flex items-center justify-center text-xl
        "
        style={{
          color: PRIMARY,
          boxShadow: `0 0 22px ${PRIMARY}55`, // soft purple glow
        }}
      >
        {icon}
      </div>

      {/* PURPLE LABEL */}
      <p
        className="text-[10px] uppercase tracking-widest mt-3 font-extrabold"
        style={{ color: PRIMARY }}
      >
        {label}
      </p>
    </div>
  );
}
