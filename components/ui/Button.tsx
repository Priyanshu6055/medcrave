"use client";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

export default function Button({
  children,
  href,
  onClick,
  className = "",
  target,
  rel,
  ...props
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}) {
  const MotionElement: any = href ? motion(Link) : motion.button;

  return (
    <MotionElement
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className={`relative group overflow-hidden 
        px-4 py-1.5                       /* 40% smaller */
        rounded-lg                        /* smaller radius */
        font-medium text-sm               /* smaller font */
        shadow-md                         /* reduced shadow */
        border bg-transparent 
        text-[#00d2ef] border-[#00d2ef] 
        transition-all duration-300 hover:text-white
        ${className}
      `}
      {...props}
    >
      {/* Rising Water Fill (Smaller) */}
      <span className="absolute inset-0 bg-[#00d2ef] -z-10 translate-y-full group-hover:translate-y-0 transition-all duration-[900ms] ease-out"></span>

      {/* Curved Waves (40% smaller height) */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-[70%] -z-10 translate-y-full group-hover:translate-y-0 transition-all duration-[900ms] ease-out"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(255,255,255,0.6)"
          d="
            M0,224L40,229.3C80,235,160,245,240,240C320,235,400,213,480,186.7C560,160,640,128,720,144C800,160,880,224,960,229.3C1040,235,1120,181,1200,176C1280,171,1360,213,1400,234.7L1440,256L1440,320L0,320Z
          "
        >
          <animate
            attributeName="d"
            dur="4s"
            repeatCount="indefinite"
            values="
              M0,224L40,229.3C80,235,160,245,240,240C320,235,400,213,480,186.7C560,160,640,128,720,144C800,160,880,224,960,229.3C1040,235,1120,181,1200,176C1280,171,1360,213,1400,234.7L1440,256L1440,320L0,320Z;
              M0,200L40,190C80,180,160,160,240,165C320,170,400,200,480,218C560,236,640,244,720,230C800,216,880,180,960,175C1040,170,1120,196,1200,210C1280,224,1360,228,1400,235L1440,240L1440,320L0,320Z;
              M0,224L40,229.3C80,235,160,245,240,240C320,235,400,213,480,186.7C560,160,640,128,720,144C800,160,880,224,960,229.3C1040,235,1120,181,1200,176C1280,171,1360,213,1400,234.7L1440,256L1440,320L0,320Z
            "
          />
        </path>
      </svg>

      {children}
    </MotionElement>
  );
}
