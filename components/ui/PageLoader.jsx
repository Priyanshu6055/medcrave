"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PageLoader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          <Image
            src="/images/preloader.gif"
            alt="Loading..."
            fill
            priority
            className="object-cover w-full h-full pointer-events-none select-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
