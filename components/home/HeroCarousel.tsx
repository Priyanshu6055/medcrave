"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

// --------------------------------------------
// TYPE-SAFE SLIDE MODEL
// --------------------------------------------
interface SlideItem {
  image: string;
  titleWords: string[];
  subtitle: string;
}

export default function HeroSlider() {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const slideRef = useRef<HTMLDivElement | null>(null);

  const slides: SlideItem[] = [
    {
      image: "/slide/slide1.png",
      titleWords: [
        "Medcrave.",
        "Advancing Medical Intelligence.",
        "Transforming Healthcare Technology.",
      ],
      subtitle: "Explore our next-gen diagnostic ecosystem →",
    },
    {
      image: "/slide/slide2.png",
      titleWords: ["Precision Engineering.", "Clinical-grade Innovation."],
      subtitle: "Discover advanced surgical equipment →",
    },
    {
      image: "/slide/slide3.png",
      titleWords: [
        "Real-Time Monitoring.",
        "Intelligent Patient Care.",
        "AI-Powered Healthcare.",
      ],
      subtitle: "See Medcrave monitoring solutions →",
    },
  ];

  // ------------------------------------------------------
  // GSAP FUTURISTIC ANIMATIONS
  // ------------------------------------------------------
  useEffect(() => {
    if (!slideRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 },
    });

    // Futuristic glow + grid animation
    tl.fromTo(
      ".grid-overlay",
      { opacity: 0, scale: 1.2 },
      { opacity: 0.22, scale: 1, duration: 2 }
    );

    // Text animation
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0 },
      "-=1.4"
    );

    // Subtitle button
    tl.fromTo(
      ".subtitle-btn",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0 },
      "-=1.2"
    );
  }, [activeSlideIndex]);

  return (
    <div
      ref={slideRef}
      className="
        relative w-full h-[75vh] min-h-[350px] overflow-hidden group
      "
    >
      {/* Futuristic animated grid */}
      <div
        className="
          grid-overlay absolute inset-0 z-[2] pointer-events-none
          bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px)]
          bg-[size:80px_80px]
        "
      />

      {/* Cyan glow orb */}
      <div
        className="
          absolute inset-0 z-[1] pointer-events-none 
          bg-[radial-gradient(circle_at_center,rgba(0,204,255,0.18),transparent_65%)]
          animate-pulse
        "
      />

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
        loop
        speed={1200}
        onSlideChangeTransitionStart={(s: SwiperType) =>
          setActiveSlideIndex(s.realIndex)
        }
        className="h-full w-full z-[3]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">

              {/* Background Image (kept exact) */}
              <motion.img
                src={slide.image}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.15, opacity: 0.75 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                alt="Medcrave slide"
              />

              {/* Deep gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#001129]/70 via-[#00387b]/40 to-[#000814]/85 z-[4]" />

              {/* Text container */}
              <div className="absolute bottom-12 left-8 sm:left-14 z-[10] max-w-[80%] sm:max-w-[60%]">

                {/* Animated futuristic title */}
                <h1
                  ref={titleRef}
                  className="text-white font-extrabold text-2xl sm:text-4xl md:text-5xl leading-tight"
                >
                  {index === activeSlideIndex ? (
                    <Typewriter
                      words={slide.titleWords}
                      loop={1}
                      cursor
                      cursorStyle="_"
                      typeSpeed={55}
                      deleteSpeed={30}
                      delaySpeed={900}
                    />
                  ) : (
                    slide.titleWords.join(" ")
                  )}
                </h1>

                {/* Subtitle Button */}
                <button
                  className="
                    subtitle-btn mt-6 px-6 py-2 
                    bg-[#00c2f4] text-white rounded-md font-semibold
                    shadow-lg hover:bg-[#2bd6ff] hover:scale-[1.04]
                    transition-all duration-300
                  "
                >
                  {slide.subtitle}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-4 z-[20] pointer-events-none">
          <div className="
            prev-btn pointer-events-auto bg-white/15 text-white p-3 rounded-full 
            shadow-xl opacity-0 group-hover:opacity-100 hover:bg-white/30 
            transition backdrop-blur-md
          ">
            ❮
          </div>

          <div className="
            next-btn pointer-events-auto bg-white/15 text-white p-3 rounded-full 
            shadow-xl opacity-0 group-hover:opacity-100 hover:bg-white/30 
            transition backdrop-blur-md
          ">
            ❯
          </div>
        </div>
      </Swiper>
    </div>
  );
}

// Motion from Framer (type safe)
import { motion } from "framer-motion";
