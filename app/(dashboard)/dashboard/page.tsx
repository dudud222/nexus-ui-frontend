"use client";

import { useEffect, useState } from "react";
import { ThreeDCard } from "@/components/ui/ThreeDCard";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Download, ShieldCheck, Clock, Activity, Zap, Users, AlertCircle, Server, Database } from "lucide-react";

import { motion } from "framer-motion";

const RecentActivityList = () => {
    const [logs, setLogs] = useState<any[]>([
        { id: '1', type: 'LOGIN', message: 'User Login', appId: 'app_123', timestamp: { toDate: () => new Date() } },
        { id: '2', type: 'LICENSE', message: 'License Activated', appId: 'app_123', timestamp: { toDate: () => new Date(Date.now() - 3600000) } },
        { id: '3', type: 'LOGIN', message: 'User Login', appId: 'app_456', timestamp: { toDate: () => new Date(Date.now() - 7200000) } },
    ]);

    useEffect(() => {
        // Mock real-time updates
    }, []);

    if (logs.length === 0) return <div className="text-slate-500 text-sm italic py-4">No recent activity found.</div>;

    return (
        <div className="space-y-3">
            {logs.map((log, i) => (
                <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
                >
                    <div className={`mt-1 p-2 rounded-lg ${log.type === 'LOGIN' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'} shadow-[0_0_10px_rgba(0,0,0,0.2)]`}>
                        {log.type === 'LOGIN' ? <ShieldCheck className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                            {log.message}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-medium">
                            App ID: <span className="text-slate-400">{log.appId}</span> • {log.timestamp?.toDate().toLocaleString()}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default function DashboardPage() {
    const [stats, setStats] = useState({
        apps: 0,
        users: 0,
        licenses: 0,
        successRate: "100%"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data loading
        setTimeout(() => {
            setStats({
                apps: 5,
                users: 128,
                licenses: 450,
                successRate: "99.9%"
            });
            setLoading(false);
        }, 1000);
    }, []);

    const statItems = [
        { label: "Total Apps", value: stats.apps, icon: Server, color: "text-violet-400", bg: "bg-violet-500/10" },
        { label: "Total Users", value: stats.users, icon: Users, color: "text-indigo-400", bg: "bg-indigo-500/10" },
        { label: "Active Keys", value: stats.licenses, icon: Zap, color: "text-pink-400", bg: "bg-pink-500/10" },
        { label: "Uptime", value: "99.9%", icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter drop-shadow-lg">
                        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Overview</span>
                    </h1>
                    <p className="text-slate-400 mt-2 font-light tracking-wide">Real-time monitoring and analytics.</p>
                </div>

                <div className="flex gap-3">
                    <div className="px-4 py-2 rounded-full bg-emerald-500/5 text-emerald-400 text-xs font-bold border border-emerald-500/10 flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        SYSTEM ONLINE
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statItems.map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="h-full"
                    >
                        <ThreeDCard className="h-full">
                            <div className="flex flex-col h-full justify-between gap-4">
                                <div className="flex items-center justify-between">
                                    <div className={`p-3 rounded-2xl ${item.bg} ${item.color} ring-1 ring-white/5 shadow-inner`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <Activity className="w-4 h-4 text-slate-700" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</div>
                                    <div className="text-3xl font-black text-white drop-shadow-md">
                                        {loading ? <span className="animate-pulse">...</span> : item.value}
                                    </div>
                                </div>
                            </div>
                        </ThreeDCard>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Recent Alerts/Activity */}
                <div className="lg:col-span-2">
                    <ThreeDCard className="h-full">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                                    <Database className="w-5 h-5" />
                                </div>
                                Live Activity Feed
                            </h2>
                            <button className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">View All</button>
                        </div>
                        <RecentActivityList />
                    </ThreeDCard>
                </div>

                {/* Right Column - System Status */}
                <div className="space-y-6">
                    <ThreeDCard>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                <Server className="w-5 h-5" />
                            </div>
                            Server Status
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider mb-2">
                                    <span className="text-slate-500">API Latency</span>
                                    <span className="text-emerald-400">12ms</span>
                                </div>
                                <div className="w-full bg-slate-800/50 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full w-[12%] shadow-[0_0_10px_#10b981]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider mb-2">
                                    <span className="text-slate-500">Database Load</span>
                                    <span className="text-blue-400">34%</span>
                                </div>
                                <div className="w-full bg-slate-800/50 h-2 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full w-[34%] shadow-[0_0_10px_#3b82f6]" />
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                <div className="flex items-center gap-3 text-xs text-slate-400">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    All Systems Operational
                                </div>
                            </div>
                        </div>
                    </ThreeDCard>
                </div>
            </div>
        </div>
    );
}
