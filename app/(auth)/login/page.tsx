"use client";

import { ThreeDCard } from "@/components/ui/ThreeDCard";
import { Input } from "@/components/ui/Input";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Mail, Lock, ArrowRight, AlertCircle, Chrome } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Mock Login
        setTimeout(() => {
            setIsLoading(false);
            router.push("/dashboard");
        }, 1500);
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        // Mock Google Login
        setTimeout(() => {
            router.push("/dashboard");
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
            {/* Dynamic 3D Background */}
            <div className="fixed inset-0 z-[-1] pointer-events-none">
                <div
                    className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [transform:perspective(1000px)_rotateX(60deg)] origin-top opacity-30"
                    style={{ height: '200%' }}
                />
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-950/20 to-transparent blur-3xl opacity-50" />
            </div>

            <ThreeDCard className="w-full max-w-md">
                <div className="text-center space-y-4 mb-8">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 relative">
                            <img src="/logo.png" alt="Nexus Logo" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-slate-400 tracking-wide font-light">Enter your credentials to access the system</p>
                </div>

                {error && (
                    <div className="p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/10 flex items-center gap-2 text-sm text-red-400 shadow-[inset_0_0_10px_rgba(239,68,68,0.1)]">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email Address"
                            icon={<Mail className="w-5 h-5 text-violet-400" />}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-black/20 border-white/5 focus:border-violet-500/50"
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            icon={<Lock className="w-5 h-5 text-violet-400" />}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-black/20 border-white/5 focus:border-violet-500/50"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-xs text-slate-400 hover:text-white transition-colors tracking-wide hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <PremiumButton type="submit" className="w-full text-base py-6 font-bold tracking-wide shadow-[0_0_20px_rgba(139,92,246,0.2)]" isLoading={isLoading}>
                        Sign In
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </PremiumButton>
                </form>

                <div className="relative py-8">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/5" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                        <span className="bg-[#020617] px-3 text-slate-500 rounded-full border border-white/5">Or continue with</span>
                    </div>
                </div>

                <PremiumButton variant="secondary" className="w-full border-white/5 bg-white/5 hover:bg-white/10 text-white/90 py-5" onClick={handleGoogleLogin} isLoading={isLoading}>
                    <Chrome className="w-5 h-5 mr-2" />
                    Google Account
                </PremiumButton>

                <div className="text-center text-sm text-slate-400 font-light mt-8">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-violet-400 hover:text-white transition-colors font-bold ml-1 hover:underline decoration-violet-500 underline-offset-4">
                        Register
                    </Link>
                </div>
            </ThreeDCard>
        </div>
    );
}

