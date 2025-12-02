"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface UltraStatProps {
    label: string;
    value: number;
    progress?: number;
    icon?: React.ReactNode;
    accent?: string;
    size?: "sm" | "md" | "lg";
    description?: string;
    showCTA?: boolean;
    onCTA?: () => void;
    glow?: boolean;
    pulse?: boolean;
    floatingParticles?: boolean;
}

function useCountUp(target: number, duration = 1200) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = performance.now();
        const tick = (now: number) => {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [target, duration]);
    return count;
}

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);
    return reduced;
}

interface InfoPopupProps {
    label: string;
    value: number;
    description?: string;
    progress: number;
    onClose: () => void;
    accent: string;
}

const InfoPopup: React.FC<InfoPopupProps> = ({
    label,
    description,
    onClose,
    accent,
}) => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="relative w-full max-w-sm rounded-xl p-6 bg-white/95 backdrop-blur-sm shadow-2xl border border-white/50"
                initial={{ y: -50, scale: 0.9 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: -50, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-3" style={{ borderBottomColor: accent + '60' }}>
                    {label} Details
                </h3>

                {description && (
                    <div>
                        <p className="text-gray-600 font-medium text-sm mb-1">Description:</p>
                        <p className="text-gray-700 text-sm italic bg-gray-100 p-2 rounded-md border border-gray-200">
                            {description}
                        </p>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default function UltraStat({
    label,
    value,
    progress = 80,
    icon,
    accent = "#EE9E26",
    size = "md",
    description,
    showCTA = false,
    onCTA,
    glow = true,
    pulse = true,
    floatingParticles = true,
}: UltraStatProps) {

    const reduced = usePrefersReducedMotion();
    const [showDetailsPopup, setShowDetailsPopup] = useState(false);

    const sizeMap = {
        sm: { root: 120, inner: 70, ring: 8 },
        md: { root: 240, inner: 155, ring: 12 },
        lg: { root: 320, inner: 210, ring: 16 },
    };

    const cfg = sizeMap[size];
    const radius = cfg.inner / 2 - 8;
    const circumference = 2 * Math.PI * radius;
    const progressNormalized = Math.max(0, Math.min(100, progress));
    const [offset, setOffset] = useState(circumference);

    useEffect(() => {
        if (reduced) {
            setOffset(circumference - (progressNormalized / 100) * circumference);
            return;
        }
        const start = performance.now();
        const duration = 1200;
        const targetOffset = circumference - (progressNormalized / 100) * circumference;
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setOffset(circumference - eased * (progressNormalized / 100) * circumference);
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [circumference, progressNormalized, reduced]);

    const mvX = useMotionValue(0);
    const mvY = useMotionValue(0);
    const rotateX = useTransform(mvY, [-50, 50], [10, -10]);
    const rotateY = useTransform(mvX, [-50, 50], [-12, 12]);
    const rootRef = useRef<HTMLDivElement | null>(null);

    const handleMove = useCallback((e: React.PointerEvent) => {
        if (!rootRef.current) return;
        const rect = rootRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mvX.set((x - 0.5) * 80);
        mvY.set((y - 0.5) * 80);
    }, []);

    const handleLeave = useCallback(() => {
        mvX.set(0);
        mvY.set(0);
    }, []);

    const accentGrad = `grad-${accent.replace("#", "")}-${cfg.root}`;

    function shade(hex: string, percent: number) {
        try {
            const f = hex.slice(1);
            const R = parseInt(f.substring(0, 2), 16);
            const G = parseInt(f.substring(2, 4), 16);
            const B = parseInt(f.substring(4, 6), 16);
            const t = percent < 0 ? 0 : 255;
            const p = Math.abs(percent) / 100;
            return `rgb(${Math.round((t - R) * p + R)},${Math.round(
                (t - G) * p + G
            )},${Math.round((t - B) * p + B)})`;
        } catch {
            return hex;
        }
    }

    function defaultIcon() {
        return (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="white" />
                <path
                    d="M4 20c.3-2.7 3.6-4 8-4s7.7 1.3 8 4"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    /** ✅ FIXED HYDRATION-SAFE PARTICLES */
    function Particles() {
        const items = Array.from({ length: 18 });
        const [positions, setPositions] = useState<{ top: number; left: number }[]>([]);

        useEffect(() => {
            const generated = items.map(() => ({
                top: Math.random() * 90 + 5,
                left: Math.random() * 90 + 5,
            }));
            setPositions(generated);
        }, []);

        return (
            <div className="absolute inset-0 pointer-events-none">
                {positions.map((pos, i) => (
                    <motion.span
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                            background: accent,
                            top: `${pos.top}%`,
                            left: `${pos.left}%`,
                            filter: "blur(1px)",
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: [-6, 6, -6],
                            x: [-4, 4, -4],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.15,
                        }}
                    />
                ))}
            </div>
        );
    }

    return (
        <>
            <div
                ref={rootRef}
                onPointerMove={handleMove}
                onPointerLeave={handleLeave}
                tabIndex={0}
                className={`
                    relative select-none rounded-3xl outline-none transform-gpu
                    w-[${cfg.root}px] 
                    sm:w-[${cfg.root}px]
                    md:w-[31%]
                    lg:w-[31%]
                    xl:w-[31%]
                `}
                style={{
                    height: cfg.root,
                    perspective: 1600,
                }}
            >

                <motion.div
                    style={{ rotateX, rotateY }}
                    className="absolute inset-0 rounded-3xl overflow-hidden bg-white/10 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                />

                {glow && (
                    <motion.div
                        animate={{ opacity: [0.45, 0.7, 0.45], scale: [1, 1.05, 1] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute -inset-5 rounded-3xl mix-blend-screen pointer-events-none"
                        style={{
                            background: `radial-gradient(600px 300px at 50% 20%, ${accent}44, transparent 60%)`,
                            filter: "blur(40px)",
                        }}
                    />
                )}

                {pulse && (
                    <motion.div
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.25, 0.4] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        style={{
                            background: `radial-gradient(circle at 40% 60%, ${accent}22, transparent 70%)`,
                            filter: "blur(30px)",
                        }}
                    />
                )}

                {floatingParticles && <Particles />}

                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <svg
                        width={cfg.root}
                        height={cfg.root}
                        viewBox={`0 0 ${cfg.root} ${cfg.root}`}
                        className="rotate-[-90deg]"
                    >
                        <defs>
                            <linearGradient id={accentGrad} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={accent} />
                                <stop offset="70%" stopColor={shade(accent, -10)} />
                                <stop offset="100%" stopColor={shade(accent, -30)} />
                            </linearGradient>
                        </defs>

                        <circle
                            cx={cfg.root / 2}
                            cy={cfg.root / 2}
                            r={radius}
                            stroke="#e5e5e5"
                            strokeWidth={cfg.ring}
                            fill="transparent"
                            opacity={0.65}
                        />

                        <circle
                            cx={cfg.root / 2}
                            cy={cfg.root / 2}
                            r={radius}
                            stroke={`url(#${accentGrad})`}
                            strokeWidth={cfg.ring}
                            strokeLinecap="round"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            style={{
                                transition: reduced ? "none" : "stroke-dashoffset 1.2s cubic-bezier(0.22,0.8,0.13,1)",
                            }}
                        />

                        <circle
                            cx={cfg.root / 2}
                            cy={cfg.root / 2}
                            r={radius}
                            stroke={shade(accent, -10)}
                            strokeWidth={cfg.ring / 2}
                            strokeDasharray={`${circumference * 0.03} ${circumference}`}
                            transform={`rotate(${(progressNormalized / 100) * 360 - 12}, ${cfg.root / 2}, ${cfg.root / 2})`}
                            opacity={0.9}
                        />
                    </svg>
                </div>

                <div
                    className="absolute z-20 flex flex-col items-center justify-center rounded-full bg-white shadow-[0_15px_45px_rgba(0,0,0,0.22),inset_0_-8px_18px_rgba(0,0,0,0.06)]"
                    style={{
                        width: cfg.inner,
                        height: cfg.inner,
                        top: `calc(50% - ${cfg.inner / 2}px)`,
                        left: `calc(50% - ${cfg.inner / 2}px)`,
                    }}
                >
                    <motion.div
                        className="absolute -top-3 -left-3 w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
                        initial={{ scale: 0.8, rotate: -10, y: -6 }}
                        animate={{ scale: 1, rotate: 0, y: -10 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        style={{
                            background: `linear-gradient(160deg, ${accent}, ${shade(accent, -20)})`,
                            border: "4px solid rgba(255,255,255,0.25)",
                        }}
                    >
                        <div className="text-white text-xl">{icon ?? defaultIcon()}</div>
                    </motion.div>

                    <div className="text-center px-3 mt-6">
                        <div className="text-sm font-bold text-gray-800 tracking-wider mb-1">{label}</div>
                        <div className="text-xs text-gray-500 max-w-[180px] leading-snug">
                            {description || "Live Updated"}
                        </div>
                    </div>
                </div>

                <motion.button
                    className="absolute right-3 top-3 z-30 rounded-full w-8 h-8 flex items-center justify-center bg-white/70 border border-white/40 shadow hover:scale-105 transition"
                    onClick={() => setShowDetailsPopup(true)}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="#333" strokeWidth="1.4" opacity="0.4" fill="none" />
                        <circle cx="12" cy="8" r="1" fill="#222" />
                        <path d="M12 11v5" stroke="#222" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                </motion.button>
            </div>

            {showDetailsPopup && (
                <InfoPopup
                    label={label}
                    value={value}
                    progress={progressNormalized}
                    description={description}
                    onClose={() => setShowDetailsPopup(false)}
                    accent={accent}
                />
            )}
        </>
    );
}
