"use client";

import Link from "next/link";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { ThreeDCard } from "@/components/ui/ThreeDCard"; // [NEW] Use 3D Card
import { ArrowRight, ShieldCheck, Zap, Layers, ChevronRight, Play } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-violet-500/30 font-sans" ref={targetRef}>

      {/* Dynamic 3D Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        {/* Deep Space Grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [transform:perspective(1000px)_rotateX(60deg)] origin-top opacity-30"
          style={{ height: '200%' }}
        />
        {/* Ambient Fog */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-950/20 to-transparent blur-3xl opacity-50" />
      </div>

      {/* Navbar with Glass Island Design */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex items-center justify-between px-6 py-3 rounded-2xl bg-slate-950/40 backdrop-blur-xl border border-white/5 shadow-2xl w-full max-w-5xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative">
              <img src="/logo.png" alt="Nexus" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">NEXUS</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/docs" className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group">
              Docs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all group-hover:w-full" />
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all group-hover:w-full" />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/register">
              <PremiumButton className="px-5 py-2 text-sm h-10 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                Get Started
              </PremiumButton>
            </Link>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-40 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center">

        {/* Floating 3D Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg mb-8 group cursor-default hover:bg-white/10 transition-colors"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
          <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">V2.0 Is Live</span>
          <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-1 transition-transform" />
        </motion.div>

        {/* Hero Content */}
        <motion.div style={{ opacity, y, scale }} className="text-center space-y-8 z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 leading-[1.1] drop-shadow-2xl">
            AUTH <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-500 drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">EVOLVED</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The next dimension of secure authentication.
            <br className="hidden md:block" />
            <span className="text-slate-500">Bank-grade security meets 3D interactive design.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/register">
              <PremiumButton className="px-10 py-6 text-lg font-bold shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_60px_rgba(139,92,246,0.6)]">
                Start Building
                <ArrowRight className="w-5 h-5 ml-2" />
              </PremiumButton>
            </Link>
            <Link href="#features">
              <PremiumButton variant="secondary" className="px-10 py-6 text-lg font-bold bg-white/5 border-white/10 hover:bg-white/10">
                <Play className="w-5 h-5 mr-2 fill-current" />
                Live Demo
              </PremiumButton>
            </Link>
          </div>
        </motion.div>

        {/* Floating 3D Elements (Decorative) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl pointer-events-none -z-10">
          {/* Left Floating Box */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-10 w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(139,92,246,0.2)]"
          />
          {/* Right Floating Box */}
          <motion.div
            animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/3 right-10 w-32 h-32 rounded-full bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          />
        </div>

        {/* Features Scroll Section */}
        <div id="features" className="mt-40 w-full relative z-20">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-violet-400 tracking-widest uppercase mb-3">Why Nexus?</h2>
            <h3 className="text-4xl font-bold text-white">Advanced Features</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Fortress Security",
                desc: "AES-256 encryption & real-time threat analysis protect your users 24/7.",
                color: "text-emerald-400",
                bg: "bg-emerald-500/10"
              },
              {
                icon: Zap,
                title: "Hypersonic Speed",
                desc: "Global edge network ensures <50ms latency from anywhere on Earth.",
                color: "text-amber-400",
                bg: "bg-amber-500/10"
              },
              {
                icon: Layers,
                title: "Universal SDK",
                desc: "Drop-in libraries for C#, Python, Node.js, and C++. One line of code.",
                color: "text-blue-400",
                bg: "bg-blue-500/10"
              }
            ].map((feature, i) => (
              <ThreeDCard key={i} className="h-full">
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-light">
                  {feature.desc}
                </p>
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between group/link cursor-pointer">
                  <span className="text-sm font-bold text-white/50 group-hover/link:text-white transition-colors">Learn more</span>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover/link:text-white group-hover/link:translate-x-1 transition-all" />
                </div>
              </ThreeDCard>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
