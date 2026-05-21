"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Activity, Users, Layers, ShieldCheck, Zap, Server } from "lucide-react";

// Mock data — replace with real API calls in your private fork
const MOCK_STATS = {
    totalApps: 4,
    totalUsers: 147,
    totalLicenses: 312,
    totalLogs: 5820,
};

export default function AdminDashboard() {
    const [stats] = useState(MOCK_STATS);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">Admin Console</h1>
                <p className="text-slate-400 mt-1">Global system-wide oversight and analytics.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard className="p-5 flex items-center gap-4 border-violet-500/10">
                    <div className="p-3 rounded-xl bg-violet-600/10 text-violet-400">
                        <Layers className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs font-medium text-slate-500 uppercase">Global Apps</div>
                        <div className="text-2xl font-bold text-white">{stats.totalApps}</div>
                    </div>
                </GlassCard>

                <GlassCard className="p-5 flex items-center gap-4 border-indigo-500/10">
                    <div className="p-3 rounded-xl bg-indigo-600/10 text-indigo-400">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs font-medium text-slate-500 uppercase">Global Users</div>
                        <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
                    </div>
                </GlassCard>

                <GlassCard className="p-5 flex items-center gap-4 border-pink-500/10">
                    <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs font-medium text-slate-500 uppercase">Global Licenses</div>
                        <div className="text-2xl font-bold text-white">{stats.totalLicenses}</div>
                    </div>
                </GlassCard>

                <GlassCard className="p-5 flex items-center gap-4 border-blue-500/10">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs font-medium text-slate-500 uppercase">Total Events</div>
                        <div className="text-2xl font-bold text-white">{stats.totalLogs}</div>
                    </div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Server className="w-5 h-5 text-emerald-400" />
                        Infrastructure Status
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-slate-400">Database Cluster</span>
                            <span className="text-emerald-400 text-sm font-medium">Operational</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-slate-400">Auth Service</span>
                            <span className="text-emerald-400 text-sm font-medium">Active</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-slate-400">API Gateway</span>
                            <span className="text-emerald-400 text-sm font-medium">Healthy</span>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-violet-400" />
                        Security Overview
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                            <div className="text-sm font-medium text-emerald-400 mb-1">Protection Enabled</div>
                            <div className="text-xs text-slate-500">Anti-tamper and HWID lock modules are fully functional across all versions.</div>
                        </div>
                        <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                            <div className="text-sm font-medium text-indigo-400 mb-1">Encrypted Traffic</div>
                            <div className="text-xs text-slate-500">All SDK to Server communication is secured using RSA-2048 and AES-256.</div>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
