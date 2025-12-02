"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#eef2f3]"
    >
      {children}
    </motion.div>
  );
}
