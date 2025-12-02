"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Typewriter } from "react-simple-typewriter";
import { motion, Variants } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// --- ANIMATION CONFIG ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.6 },
  },
};

const imageVariants: Variants = {
  hidden: { scale: 1.05, opacity: 0.7 },
  visible: {
    scale: 1.0,
    opacity: 1,
    transition: { duration: 2.2, ease: "easeInOut" },
  },
};

export default function HeroSlider() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slides = [
    {
      image: "/images/05.webp",
      titleWords: ["Innovate.", "Create.", "Grow with CVRU i-TBI Foundation."],
      subtitle: "Join the Startup Ecosystem | Know More",
    },
    {
      image: "/images/02.webp",
      titleWords: ["Empowering", "Visionary", "Entrepreneurs."],
      subtitle: "Kickstart Your Journey Today",
    },
    {
      image: "/images/04.webp",
      titleWords: ["Transform", "Ideas", "Into Reality."],
      subtitle: "Connect | Collaborate | Build",
    },
  ];

  return (
    <div className="w-full h-[70vh] min-h-[320px] overflow-hidden relative group">

      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        speed={900}
        onSlideChangeTransitionStart={(s) => setActiveSlideIndex(s.realIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">

              {/* Background Image */}
              <motion.img
                key={`img-${index}-${activeSlideIndex}`}
                src={slide.image}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                className="w-full h-full object-cover absolute inset-0"
                alt={`Slide ${index}`}
              />

              {/* Dark gradient for better readability */}


              {/* BOTTOM TEXT CONTAINER */}
              <motion.div
                key={`txt-${index}-${activeSlideIndex}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="
                  absolute inset-0 flex flex-col justify-end
                  px-4 sm:px-10 pb-10 sm:pb-16
                  max-w-[90%] sm:max-w-[70%] z-20
                "
              >
                {/* ⭐ 50% SMALLER TITLE */}
                <motion.h1
                  variants={textItemVariants}
                  className="
                    text-xl xs:text-2xl sm:text-3xl md:text-4xl
                    font-extrabold text-white leading-tight drop-shadow-2xl
                  "
                >
                  {index === activeSlideIndex ? (
                    <Typewriter
                      words={slide.titleWords}
                      loop={1}
                      cursor
                      cursorStyle="_"
                      typeSpeed={60}
                      deleteSpeed={35}
                      delaySpeed={900}
                    />
                  ) : (
                    slide.titleWords.join(" ")
                  )}
                </motion.h1>

                {/* ⭐ 50% SMALLER BUTTON */}
                <motion.div variants={textItemVariants} className="mt-3">
                  <button
                    className="
                      bg-[#00d2ef] text-white 
                      px-3 py-1.5 xs:px-4 xs:py-2 sm:px-5 sm:py-2
                      rounded-md font-medium text-[10px] xs:text-[12px] sm:text-sm
                      shadow-xl hover:bg-[#2aa8b6] hover:scale-[1.03]
                      transition duration-300
                    "
                  >
                    {slide.subtitle}
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
          <div className="prev-btn pointer-events-auto bg-white/20 text-white p-2 sm:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 hover:bg-white/40 transition">
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>

          <div className="next-btn pointer-events-auto bg-white/20 text-white p-2 sm:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 hover:bg-white/40 transition">
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

      </Swiper>
    </div>
  );
}
