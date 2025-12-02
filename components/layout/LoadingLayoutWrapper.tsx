"use client";

import { useEffect, useState } from "react";
import PageLoader from "@/components/ui/PageLoader";

export default function LoadingLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  // Run only ONCE when website loads
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []); // <-- empty dependency = runs ONCE ONLY

  return (
    <>
      <PageLoader loading={loading} />

      <div className={`${loading ? "opacity-80" : "opacity-100 transition-opacity duration-500"}`}>
        {children}
      </div>
    </>
  );
}
