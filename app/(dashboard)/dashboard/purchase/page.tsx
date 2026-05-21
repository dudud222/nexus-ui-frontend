"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Check, Zap, Crown, Shield, Star, Sparkles } from "lucide-react";
import { ThreeDCard } from "@/components/ui/ThreeDCard";
import { motion } from "framer-motion";

const plans = [
    {
        name: "Starter",
        price: "$19",
        period: "/month",
        icon: Zap,
        color: "blue",
        features: ["1 Device Limit", "Basic Support", "Standard Bypass", "24/7 Uptime"],
    },
    {
        name: "Premium",
        price: "$49",
        period: "/month",
        icon: Crown,
        color: "purple",
        popular: true,
        features: ["3 Device Limit", "Priority Support", "Advanced Bypass", "Instant Updates", "Private Discord"],
    },
    {
        name: "Lifetime",
        price: "$199",
        period: " one-time",
        icon: Shield,
        color: "pink",
        features: ["Unlimited Devices", "VIP Support", "Developer Access", "Early Features", "Custom Build"],
    },
];

export default function PurchasePage() {
    return (
        <div className="space-y-12 min-h-[calc(100vh-100px)] flex flex-col justify-center">
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white drop-shadow-2xl">
                        Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Power</span>
                    </h1>
                    <p className="text-slate-400 text-lg mt-2 font-light tracking-wide max-w-2xl mx-auto">
                        Unlock premium features and elevate your experience with our tailored plans.
                    </p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, idx) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="relative"
                    >
                        {plan.popular && (
                            <div className="absolute -top-6 left-0 right-0 flex justify-center z-20 pointer-events-none">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                                    className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)] flex items-center gap-2 border border-violet-400/30"
                                >
                                    <Sparkles className="w-3 h-3 text-yellow-300" />
                                    MOST POPULAR
                                </motion.div>
                            </div>
                        )}
                        <ThreeDCard
                            className={`h-full flex flex-col p-1 ${plan.popular
                                    ? "shadow-[0_0_50px_-12px_rgba(124,58,237,0.25)]"
                                    : ""
                                }`}
                        >
                            <GlassCard
                                variant={plan.popular ? "hoverable" : "default"}
                                className={`h-full flex flex-col p-8 backdrop-blur-3xl border-opacity-50 ${plan.popular
                                        ? "bg-violet-900/10 border-violet-500/30"
                                        : "bg-black/40 border-white/5"
                                    }`}
                            >
                                <div className="mb-8 text-center">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg ${plan.color === 'purple' ? 'bg-gradient-to-tr from-violet-500/20 to-indigo-500/20 text-violet-400 shadow-violet-500/10' :
                                            plan.color === 'pink' ? 'bg-gradient-to-tr from-pink-500/20 to-rose-500/20 text-pink-400 shadow-pink-500/10' :
                                                'bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 text-blue-400 shadow-blue-500/10'
                                        }`}>
                                        <plan.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-4xl font-black text-white tracking-tight">{plan.price}</span>
                                        <span className="text-sm text-slate-500 font-medium">{plan.period}</span>
                                    </div>
                                </div>

                                <div className="space-y-4 flex-1 mb-8">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-3 text-sm text-slate-300 group">
                                            <div className={`p-1 rounded-full ${plan.color === 'purple' ? 'bg-violet-500/10 text-violet-400' :
                                                    plan.color === 'pink' ? 'bg-pink-500/10 text-pink-400' :
                                                        'bg-blue-500/10 text-blue-400'
                                                }`}>
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className="group-hover:text-white transition-colors">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <PremiumButton
                                    className="w-full"
                                    variant={plan.popular ? "primary" : "secondary"}
                                    glow
                                >
                                    Purchase Now
                                </PremiumButton>
                            </GlassCard>
                        </ThreeDCard>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
