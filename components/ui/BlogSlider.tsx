"use client";

import { useEffect } from "react";
import Swiper from "swiper";
import { Pagination, Mousewheel, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./blog-slider.css";
import Button from "@/components/ui/Button";

export default function BlogSlider() {
  useEffect(() => {
    new Swiper(".blog-slider", {
      modules: [Pagination, Mousewheel, EffectFade, Autoplay],
      spaceBetween: 30,
      effect: "fade",
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      mousewheel: { invert: false },
      pagination: {
        el: ".blog-slider__pagination",
        clickable: true,
      },
    });
  }, []);

  return (
    <>
      <div className="">
        <div className="blog-slider">
          <div className="blog-slider__wrp swiper-wrapper">
            {/* 1️⃣ Radiant Infant Warmer */}
            <div className="blog-slider__item swiper-slide">
              <div className="blog-slider__img">
                <img
                  src="/images/products/radiant-warmer.png"
                  alt="Radiant Infant Warmer"
                />
              </div>
              <div className="blog-slider__content">
                <div className="blog-slider__title">Radiant Infant Warmer</div>
                <div className="blog-slider__text">
                  Provides controlled warmth for newborns, especially premature
                  or low-birth-weight babies requiring thermal regulation.
                </div>
                <a href="/about">
                  <Button className="rounded-xl">Explore More</Button>
                </a>
              </div>
            </div>

            {/* 2️⃣ Phototherapy Unit */}
            <div className="blog-slider__item swiper-slide">
              <div className="blog-slider__img">
                <img
                  src="/images/products/phototherapy-unit.png"
                  alt="Phototherapy Unit"
                />
              </div>
              <div className="blog-slider__content">
                <div className="blog-slider__title">Phototherapy Unit</div>
                <div className="blog-slider__text">
                  Designed for the treatment of neonatal jaundice by using
                  high-intensity blue light to safely reduce bilirubin levels.
                </div>
                <a href="/about">
                  <Button className="rounded-xl">Explore More</Button>
                </a>
              </div>
            </div>

            {/* 3️⃣ Neonatal Ventilator */}
            <div className="blog-slider__item swiper-slide">
              <div className="blog-slider__img">
                <img
                  src="/images/products/neonatal-ventilator.webp"
                  alt="Neonatal Ventilator"
                />
              </div>
              <div className="blog-slider__content">
                <div className="blog-slider__title">Neonatal Ventilator</div>
                <div className="blog-slider__text">
                  Provides advanced respiratory support for newborns with
                  breathing difficulties, apnea, or respiratory distress.
                </div>
                <a href="/about">
                  <Button className="rounded-xl">Explore More</Button>
                </a>
              </div>
            </div>
          </div>

          <div className="blog-slider__pagination"></div>
        </div>
      </div>
    </>
  );
}
