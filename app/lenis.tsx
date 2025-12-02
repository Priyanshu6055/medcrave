"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export let lenis: any = null;

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        lenis = new Lenis({
            lerp: 0.08,
            wheelMultiplier: 1.1,
            touchMultiplier: 1.2,
            gestureOrientation: "vertical",
            normalizeWheel: true,
        } as any);


        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
