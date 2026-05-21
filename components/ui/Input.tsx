import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon, ...props }, ref) => {
        return (
            <div className="relative group">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-neon-blue transition-colors duration-300">
                        {icon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={cn(
                        "w-full bg-[#020617]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30",
                        "shadow-[inset_2px_2px_10px_rgba(0,0,0,0.5)] focus:shadow-[inset_2px_2px_10px_rgba(0,0,0,0.5),0_0_20px_rgba(139,92,246,0.3)]",
                        "focus:outline-none focus:border-violet-500/50 transition-all duration-300",
                        icon && "pl-12",
                        className
                    )}
                    {...props}
                />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500 group-focus-within:w-full transition-all duration-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
