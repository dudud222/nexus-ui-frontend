"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Input } from "@/components/ui/Input";
import { Key } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RedeemPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
    };

    return (
        <GlassCard className="flex flex-col gap-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                    Redeem License
                </h1>
                <p className="text-sm text-slate-400">Enter your license key to activate access</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="text"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    icon={<Key className="w-5 h-5 text-violet-400" />}
                    className="font-mono text-center tracking-widest uppercase border-violet-500/20 focus:border-violet-500/50"
                    required
                />

                <PremiumButton type="submit" className="w-full" isLoading={isLoading}>
                    Activate License
                    <ArrowRight className="w-4 h-4 ml-2" />
                </PremiumButton>
            </form>

            <div className="text-center text-sm text-slate-500">
                <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
                    Back to Login
                </Link>
            </div>
        </GlassCard>
    );
}
