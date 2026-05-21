import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface PremiumButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "danger" | "ghost";
    isLoading?: boolean;
    children?: ReactNode;
    glow?: boolean;
}

const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
    ({ className, variant = "primary", isLoading, children, glow, ...props }, ref) => {
        const variants = {
            primary: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)] hover:brightness-110",
            secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20",
            danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
            ghost: "bg-transparent text-white/60 hover:text-white hover:bg-white/5 border-transparent",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95, y: 1 }}
                className={cn(
                    "relative px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden shadow-lg",
                    variants[variant],
                    isLoading && "opacity-70 cursor-not-allowed",
                    // 3D Depth Shadows
                    variant === 'primary' && "shadow-[0_4px_0_0_rgb(76,29,149)] active:shadow-none active:translate-y-[4px]",
                    variant !== 'primary' && "active:translate-y-[1px]",
                    glow && "shadow-[0_0_20px_rgba(139,92,246,0.5)] border-violet-500/50",
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                )}
                <span className="relative z-10 flex items-center gap-2">{children}</span>

                {/* Shimmer effect */}
                {(variant === "primary" || glow) && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:animate-shimmer" />
                )}
            </motion.button>
        );
    }
);
PremiumButton.displayName = "PremiumButton";

export { PremiumButton };
