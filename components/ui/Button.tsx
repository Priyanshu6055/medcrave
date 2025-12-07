"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SlowMo, Elastic } from "gsap/all";

gsap.registerPlugin(SlowMo, Elastic);

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, onClick, className = "" }: ButtonProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const circlesTopLeft = container.querySelectorAll<HTMLElement>(".circle.top-left");
    const circlesBottomRight =
      container.querySelectorAll<HTMLElement>(".circle.bottom-right");
    const effectButton = container.querySelector<HTMLElement>(".button.effect-button");
    const triggerButton = container.querySelector<HTMLElement>(".button--bubble");

    if (
      circlesTopLeft.length !== 3 ||
      circlesBottomRight.length !== 3 ||
      !effectButton ||
      !triggerButton
    ) {
      return;
    }

    const tl = gsap.timeline();
    const tl2 = gsap.timeline();
    const tlBt1 = gsap.timeline();
    const tlBt2 = gsap.timeline();
    const btTl = gsap.timeline({ paused: true });

    // === ORIGINAL TOP-LEFT TIMELINE ===
    tl.to(circlesTopLeft, {
      duration: 1.2,
      x: -25,
      y: -25,
      scaleY: 2,
      ease: SlowMo.ease.config(0.1, 0.7, false),
    });
    tl.to(circlesTopLeft[0], {
      duration: 0.1,
      scale: 0.2,
      x: "+=6",
      y: "-=2",
    });
    tl.to(
      circlesTopLeft[1],
      {
        duration: 0.1,
        scaleX: 1,
        scaleY: 0.8,
        x: "-=10",
        y: "-=7",
      },
      "-=0.1",
    );
    tl.to(
      circlesTopLeft[2],
      {
        duration: 0.1,
        scale: 0.2,
        x: "-=15",
        y: "+=6",
      },
      "-=0.1",
    );
    tl.to(circlesTopLeft[0], {
      duration: 1,
      scale: 0,
      x: "-=5",
      y: "-=15",
      opacity: 0,
    });
    tl.to(
      circlesTopLeft[1],
      {
        duration: 1,
        scaleX: 0.4,
        scaleY: 0.4,
        x: "-=10",
        y: "-=10",
        opacity: 0,
      },
      "-=1",
    );
    tl.to(
      circlesTopLeft[2],
      {
        duration: 1,
        scale: 0,
        x: "-=15",
        y: "+=5",
        opacity: 0,
      },
      "-=1",
    );

    tlBt1.set(circlesTopLeft, { x: 0, y: 0, rotation: -45 });
    tlBt1.add(tl);

    // === ORIGINAL BOTTOM-RIGHT TIMELINE ===
    tl2.set(circlesBottomRight, { x: 0, y: 0 });
    tl2.to(circlesBottomRight, {
      duration: 1.1,
      x: 30,
      y: 30,
      ease: SlowMo.ease.config(0.1, 0.7, false),
    });
    tl2.to(circlesBottomRight[0], {
      duration: 0.1,
      scale: 0.2,
      x: "-=6",
      y: "+=3",
    });
    tl2.to(
      circlesBottomRight[1],
      {
        duration: 0.1,
        scale: 0.8,
        x: "+=7",
        y: "+=3",
      },
      "-=0.1",
    );
    tl2.to(
      circlesBottomRight[2],
      {
        duration: 0.1,
        scale: 0.2,
        x: "+=15",
        y: "-=6",
      },
      "-=0.2",
    );
    tl2.to(circlesBottomRight[0], {
      duration: 1,
      scale: 0,
      x: "+=5",
      y: "+=15",
      opacity: 0,
    });
    tl2.to(
      circlesBottomRight[1],
      {
        duration: 1,
        scale: 0.4,
        x: "+=7",
        y: "+=7",
        opacity: 0,
      },
      "-=1",
    );
    tl2.to(
      circlesBottomRight[2],
      {
        duration: 1,
        scale: 0,
        x: "+=15",
        y: "-=5",
        opacity: 0,
      },
      "-=1",
    );

    tlBt2.set(circlesBottomRight, { x: 0, y: 0, rotation: 45 });
    tlBt2.add(tl2);

    // === MAIN BUTTON TIMELINE (EXACT) ===
    btTl.add(tlBt1);
    btTl.to(
      effectButton,
      {
        duration: 0.8,
        scaleY: 1.1,
      },
      0.1,
    );
    btTl.add(tlBt2, 0.2);
    btTl.to(
      effectButton,
      {
        duration: 1.8,
        scale: 1,
        ease: Elastic.easeOut.config(1.2, 0.4),
      },
      1.2,
    );

    btTl.timeScale(2.6);

    const handler = () => {
      btTl.restart();
    };

    triggerButton.addEventListener("mouseover", handler);

    return () => {
      triggerButton.removeEventListener("mouseover", handler);
      btTl.kill();
      tl.kill();
      tl2.kill();
      tlBt1.kill();
      tlBt2.kill();
    };
  }, []);

  return (
    <span className="button--bubble__container" ref={containerRef}>
      {/* Goo filter */}
      <svg xmlns="http://www.w3.org/2000/svg" className="goo">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Visible label button */}
      <button
        type="button"
        onClick={onClick}
        className={`button button--bubble ${className}`}
      >
        {children}
      </button>

      {/* Effect container with circles and goo button */}
      <span className="button--bubble__effect-container">
        <span className="circle top-left" />
        <span className="circle top-left" />
        <span className="circle top-left" />

        <span className="button effect-button" />

        <span className="circle bottom-right" />
        <span className="circle bottom-right" />
        <span className="circle bottom-right" />
      </span>

      <style jsx>{`
        :root {
          --dark-blue: #222;
          --green: #1f3bb3;
          --action-color: var(--green);
        }

        .button--bubble__container {
          position: relative;
          display: inline-block;
        }

        .button {
          -webkit-font-smoothing: antialiased;
          background-color: var(--dark-blue);
          border: none;
          color: white;
          display: inline-block;
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          font-weight: 100;
          text-decoration: none;
          user-select: none;
          letter-spacing: 1px;
          padding: 20px 40px;
          text-transform: uppercase;
          transition: all 0.1s ease-out;
          cursor: pointer;
        }

        .button:hover {
          background-color: var(--action-color);
          color: #ffffffff;
          font-weight: 600;
        }

        .button:active {
          transform: scale(0.80);
        }

        .button--bubble {
          position: relative;
          z-index: 2;
          color: white;
          background: #1f5db3ff;
          font-weight: 600;
        }

        .button--bubble:hover {
          background: none;
        }

        .button--bubble:hover + .button--bubble__effect-container .circle {
          background: #1f3bb3;
        }

        .button--bubble:hover + .button--bubble__effect-container .button {
          background: #1f3bb3;
        }

        .button--bubble:active + .button--bubble__effect-container {
          transform: scale(0.95);
        }

        .button--bubble__effect-container {
          position: absolute;
          display: block;
          width: 200%;
          height: 400%;
          top: -150%;
          left: -50%;
          filter: url("#goo");
          transition: all 0.1s ease-out;
          pointer-events: none;
        }

        .button--bubble__effect-container .circle {
          position: absolute;
          width: 25px;
          height: 25px;
          border-radius: 15px;
          background: var(--dark-blue);
          transition: background 0.1s ease-out;
        }

        .circle.top-left {
          top: 40%;
          left: 27%;
        }

        .circle.bottom-right {
          bottom: 40%;
          right: 27%;
        }

        .effect-button {
          position: absolute;
          width: 50%;
          height: 25%;
          top: 50%;
          left: 25%;
          z-index: 1;
          transform: translateY(-50%);
          background: var(--dark-blue);
          transition: background 0.1s ease-out;
        }

        .goo {
          position: absolute;
          visibility: hidden;
          width: 1px;
          height: 1px;
        }
      `}</style>
    </span>
  );
}
