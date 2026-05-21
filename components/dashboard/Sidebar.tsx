"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Key, Settings, LogOut, Users, ShieldCheck, Box, CreditCard, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Box, label: "Applications", href: "/dashboard/applications" },
    { icon: Users, label: "Users", href: "/dashboard/users" },
    { icon: Key, label: "Licenses", href: "/dashboard/licenses" },
    { icon: CreditCard, label: "Purchase", href: "/dashboard/purchase" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    // Mock: set to true to show the Super Admin link in the UI
    const isOwner = false;

    const handleLogout = () => {
        // Mock logout — replace with real auth in your private fork
        router.push("/login");
    };

    return (
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-6 bottom-6 left-6 w-64 z-40 flex flex-col"
        >
            <div className="h-full w-full rounded-2xl bg-[#020617]/60 backdrop-blur-xl border border-white/5 shadow-2xl flex flex-col relative overflow-hidden">

                {/* Internal Glow */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-violet-500/10 to-transparent pointer-events-none" />

                {/* Logo Area */}
                <div className="p-8 flex items-center gap-3 z-10">
                    <div className="w-10 h-10 relative group cursor-pointer">
                        <div className="absolute inset-0 bg-violet-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img src="/logo.png" alt="Nexus" className="w-full h-full object-contain relative z-10" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white">NEXUS</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Panel</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 py-4 overflow-y-auto no-scrollbar z-10">
                    <div className="px-4 mb-2">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Menu</p>
                    </div>
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                    isActive
                                        ? "text-white shadow-[0_0_20px_rgba(139,92,246,0.15)] bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/20"
                                        : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-violet-500/5"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <item.icon className={cn("w-5 h-5 relative z-10 transition-colors", isActive ? "text-violet-400" : "group-hover:text-white")} />
                                <span className="text-sm font-medium relative z-10">{item.label}</span>
                                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-violet-500 rounded-r-full shadow-[0_0_10px_#8b5cf6]" />}
                            </Link>
                        );
                    })}


                </nav>

                {/* User / Logout */}
                <div className="p-4 border-t border-white/5 z-10">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-white truncate">User</p>
                                <p className="text-xs text-emerald-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Online
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-wider border border-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
