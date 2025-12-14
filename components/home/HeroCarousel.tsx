"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

// -----------------------------------
// THEME COLORS (Type Safe)
// -----------------------------------
const PRIMARY = "#7A3283";
const SECONDARY = "#85CD7C";
const DARK_BG = "#000814";

interface SlideItem {
  image: string;
  titleWords: string[];
  subtitle: string;
}

export default function HeroSlider() {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const slides: SlideItem[] = [
    {
      image: "/slide/purple-slide1.png",
      titleWords: ["Medcrave."],
      subtitle: "Explore our next-gen diagnostic ecosystem →",
    },
    {
      image: "/slide/purple-slide2.png",
      titleWords: ["Precision Engineering."],
      subtitle: "Discover advanced surgical equipment →",
    },
    {
      image: "/slide/purple-slide3.png",
      titleWords: ["Real-Time Monitoring."],
      subtitle: "See Medcrave monitoring solutions →",
    },
  ];

  // -----------------------------------
  // GSAP SLIDE ANIMATION
  // -----------------------------------
  useEffect(() => {
    if (!slideRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1.2 },
    });

    tl.fromTo(
      ".grid-overlay",
      { opacity: 0, scale: 1.2 },
      { opacity: 0.15, scale: 1, duration: 2 }
    );

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0 },
      "-=1.4"
    );

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
      className="relative w-full h-[75vh] min-h-[350px] overflow-hidden group"
      style={{ backgroundColor: DARK_BG }}
    >
      {/* ⭐ PURPLE GRID OVERLAY (THEMED) */}
      <div
        className="
          grid-overlay absolute inset-0 z-[2] pointer-events-none
          bg-[linear-gradient(rgba(122,50,131,0.10)_1px,transparent_1px),
              linear-gradient(to_right,rgba(122,50,131,0.10)_1px,transparent_1px)]
          bg-[size:80px_80px]
        "
      />

      {/* ⭐ PURPLE GLOW ORB (THEMED) */}
      <div
        className="
          absolute inset-0 z-[1] pointer-events-none 
          bg-[radial-gradient(circle_at_center,rgba(122,50,131,0.18),transparent_65%)]
          animate-pulse
        "
      />

      {/* -----------------------------------
          SWIPER
      ----------------------------------- */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
        loop
        speed={1200}
        onSlideChangeTransitionStart={(swiper: SwiperType) =>
          setActiveSlideIndex(swiper.realIndex)
        }
        className="h-full w-full z-[3]"
      >
        {slides.map((slide: SlideItem, index: number) => (
          <SwiperSlide key={slide.image}>
            <div className="relative w-full h-full">
              {/* Image */}
              <motion.img
                src={slide.image}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.15, opacity: 0.75 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                alt={slide.titleWords[0]}
              />

              {/* ⭐ PURPLE OVERLAY */}
              <div
                className="absolute inset-0 z-[4]"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(122,50,131,0.25), rgba(0,0,0,0.85))",
                }}
              />

              {/* TEXT */}
              <div className="absolute bottom-12 left-8 sm:left-14 z-[10] max-w-[80%] sm:max-w-[60%]">
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
                      cursorColor={PRIMARY}
                      typeSpeed={55}
                      deleteSpeed={30}
                      delaySpeed={900}
                    />
                  ) : (
                    slide.titleWords.join(" ")
                  )}
                </h1>

                {/* ⭐ PURPLE BUTTON */}
                <button
                  className="
                    subtitle-btn mt-6 px-8 py-3 
                    text-white rounded-xl font-bold
                    hover:scale-[1.04] transition-all duration-300
                    shadow-[0_10px_20px_rgba(122,50,131,0.30)]
                  "
                  style={{
                    backgroundColor: PRIMARY,
                  }}
                >
                  {slide.subtitle}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* -----------------------------------
            NAV BUTTONS (Purple hover)
        ----------------------------------- */}
        <div className="absolute inset-0 flex items-center justify-between px-4 z-[20] pointer-events-none">
          <div
            className="
              prev-btn pointer-events-auto bg-white/10 text-white p-3 rounded-full 
              shadow-xl opacity-0 group-hover:opacity-100 
              transition backdrop-blur-md border border-white/20
            "
            style={{ transition: "0.3s", }}
            onMouseEnter={(e) =>
              ((e.currentTarget.style.backgroundColor = PRIMARY))
            }
            onMouseLeave={(e) =>
              ((e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"))
            }
          >
            ❮
          </div>

          <div
            className="
              next-btn pointer-events-auto bg-white/10 text-white p-3 rounded-full 
              shadow-xl opacity-0 group-hover:opacity-100 
              transition backdrop-blur-md border border-white/20
            "
            style={{ transition: "0.3s" }}
            onMouseEnter={(e) =>
              ((e.currentTarget.style.backgroundColor = PRIMARY))
            }
            onMouseLeave={(e) =>
              ((e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"))
            }
          >
            ❯
          </div>
        </div>
      </Swiper>
    </div>
  );
}
