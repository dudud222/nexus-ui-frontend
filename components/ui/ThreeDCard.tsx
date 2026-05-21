"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent } from "react";

interface ThreeDCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export function ThreeDCard({ children, className, onClick }: ThreeDCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the tilt
    const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

    // Lighting effect
    const lightX = useSpring(0, { stiffness: 150, damping: 20 });
    const lightY = useSpring(0, { stiffness: 150, damping: 20 });

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        // Calculate mouse position relative to card center
        const x = clientX - left - width / 2;
        const y = clientY - top - height / 2;

        // Map position to rotation degrees (max 20deg tilt)
        rotateX.set((y / height) * -20);
        rotateY.set((x / width) * 20);

        // Map position to lighting gradient
        lightX.set(clientX - left);
        lightY.set(clientY - top);

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    function onMouseLeave() {
        rotateX.set(0);
        rotateY.set(0);
        lightX.set(0);
        lightY.set(0);
    }

    return (
        <motion.div
            style={{
                perspective: 1000,
            }}
            className={cn("relative h-full", className)}
            onClick={onClick}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="relative h-full w-full rounded-2xl border border-white/10 bg-slate-950/50 p-8 shadow-2xl backdrop-blur-md transition-shadow group"
            >
                {/* Neon Glow Gradient */}
                <motion.div
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                400px circle at ${lightX}px ${lightY}px,
                                rgba(139, 92, 246, 0.15),
                                transparent 80%
                            )
                        `,
                    }}
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                />

                {/* Content with z-index for depth */}
                <div style={{ transform: "translateZ(50px)" }} className="relative h-full flex flex-col">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
}
