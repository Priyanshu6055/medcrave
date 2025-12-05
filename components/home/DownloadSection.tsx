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

gsap.registerPlugin(ScrollTrigger);

interface NodeItem {
  icon: JSX.Element;
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

      /* 🌬 Float effect on icons */
      nodesRef.current.forEach((node) => {
        gsap.to(node, {
          x: gsap.utils.random(-10, 10),
          y: gsap.utils.random(-10, 10),
          duration: gsap.utils.random(2, 4),
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
    <section className="relative py-40 bg-white text-[#0A1A44] overflow-hidden">

      {/* VORTEX BACKGROUND */}
      <div
        ref={vortexRef}
        className="absolute inset-0 mx-auto w-[1300px] h-[1300px] rounded-full 
        bg-[radial-gradient(circle,rgba(0,102,255,0.35),transparent_70%)] 
        blur-3xl opacity-60"
      />

      {/* NEBULA OVERLAY */}
      <div className="absolute inset-0 bg-[conic-gradient(from_180deg,rgba(0,75,255,0.08),transparent_60%)]
      blur-3xl" />

      {/* HEADER */}
      <div className="relative z-20 text-center max-w-3xl mx-auto px-6">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl font-extrabold leading-tight"
        >
          Precision Reimagined
          <span className="text-blue-600 block">Neuro-Vortex Medical Engine</span>
        </h1>

        <p className="mt-6 text-lg text-blue-900/70 max-w-xl mx-auto">
          A cinematic demonstration of next-gen AI medical systems built for accuracy,
          performance, and intelligent diagnostics.
        </p>
      </div>

      {/* DEVICE + ICONS */}
      <div className="relative mt-24 flex justify-center">
        <div
          className="relative w-[360px] sm:w-[460px] lg:w-[520px]
          h-[360px] sm:h-[460px] lg:h-[520px]"
        >
          {/* AURORA GLOW */}
          <div className="absolute inset-0 bg-blue-400/20 blur-3xl z-10" />

          {/* DEVICE IMAGE */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-[70%]">
              <Image
                src="/images/girl-img.png"
                alt="Medical Device"
                fill
                className="object-contain z-20 drop-shadow-[0_30px_55px_rgba(0,0,0,0.25)]"
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
        <a
          href="#"
          className="px-14 py-4 text-lg font-bold rounded-xl bg-blue-600 text-white 
          shadow-xl shadow-blue-400/40 hover:bg-blue-700 transition"
        >
          Explore the Neuro-Vortex →
        </a>
      </div>
    </section>
  );
}

/* NODE COMPONENT (TYPE-SAFE) */
function Node({
  innerRef,
  icon,
  label,
  x,
  y,
}: {
  innerRef: (el: HTMLDivElement | null) => void;
  icon: JSX.Element;
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
      <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-xl border border-blue-200 
      shadow-lg flex items-center justify-center text-blue-700 text-xl">
        {icon}
      </div>
      <p className="text-xs mt-2 font-semibold">{label}</p>
    </div>
  );
}
