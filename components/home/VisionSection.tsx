"use client";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function VisionSection() {
  return (
    <section className="py-40 bg-[#030b0e] relative overflow-hidden text-white">

      {/* Neon background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00d2ef]/10 via-transparent to-[#00d2ef]/5 pointer-events-none" />

      {/* Shapes */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 border border-[#00d2ef]/40 backdrop-blur-xl rounded-xl"
        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-28 h-28 border border-[#00d2ef]/30 backdrop-blur-xl rounded-full"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-global grid md:grid-cols-2 gap-28 items-center relative z-10">

        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          {/* Glow */}
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute w-[420px] h-[420px] bg-[#00d2ef]/20 blur-[100px] rounded-full"
          />

          {/* Image container */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="rounded-3xl p-1 backdrop-blur-xl bg-white/5 border border-[#00d2ef]/20 shadow-[0_0_35px_rgba(0,210,239,0.2)]"
          >
            <Image
              src="/images/02.webp"
              alt="Vision"
              width={550}
              height={330}
              className="rounded-3xl object-cover w-[550px] h-[330px]"
            />
          </motion.div>
        </motion.div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-left"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[#00d2ef] leading-tight"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            Our Vision
          </motion.h2>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-xl">
            At CVRU-ITBI, We Envision a Thriving Ecosystem where creativity and entrepreneurship flourish. We aim to be the catalyst that bridges the gap between innovative concepts and viable businesses, empowering innovators to make a significant impact on society.
          </p>

          {/* Animated underline */}
          <motion.div
            className="mt-6 h-[3px] bg-[#00d2ef] rounded-full"
            initial={{ width: "70px" }}
            animate={{ width: ["70px", "160px", "90px"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-10"
          >
            <a href="/contact">
              <Button>Contact Us</Button>
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
