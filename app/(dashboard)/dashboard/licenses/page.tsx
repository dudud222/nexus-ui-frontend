"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Plus, Key, Search, Filter, ShieldAlert, Trash2, Copy, AlertCircle, Hash, Clock, Check } from "lucide-react";
// Firebase backend logic replaced with mock data
import { motion, AnimatePresence } from "framer-motion";

export default function LicensesPage() {
    const [apps, setApps] = useState<any[]>([]);
    const [selectedAppId, setSelectedAppId] = useState<string>("");
    const [licenses, setLicenses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch Apps
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setApps([
                { id: "app_1", name: "Nexus Auth Pro" },
                { id: "app_2", name: "Internal Tooling" }
            ]);
            setSelectedAppId("app_1");
        }, 500);
    }, []);

    // Fetch Licenses for Selected App
    useEffect(() => {
        if (!selectedAppId) return;
        setLoading(true);
        setTimeout(() => {
            setLicenses([
                { id: "lic_1", appId: selectedAppId, key: "NEXUS-A1B2-C3D4-E5F6", level: 1, status: "active", usedBy: "admin_user", createdAt: { toMillis: () => Date.now() - 86400000 } },
                { id: "lic_2", appId: selectedAppId, key: "NEXUS-9Z8Y-7X6W-5V4U", level: 2, status: "unused", usedBy: null, createdAt: { toMillis: () => Date.now() - 172800000 } },
                { id: "lic_3", appId: selectedAppId, key: "NEXUS-1234-5678-90AB", level: 1, status: "banned", usedBy: "guest_77", createdAt: { toMillis: () => Date.now() - 259200000 } }
            ]);
            setLoading(false);
        }, 500);
    }, [selectedAppId]);

    const handleGenerate = async () => {
        if (!selectedAppId) return;
        setIsGenerating(true);
        setTimeout(() => {
            const newLicense = {
                id: `lic_${Math.random().toString(36).substr(2, 9)}`,
                appId: selectedAppId,
                key: `NEXUS-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
                level: 1,
                status: "unused",
                usedBy: null,
                createdAt: { toMillis: () => Date.now() }
            };
            setLicenses((prev) => [newLicense, ...prev]);
            setIsGenerating(false);
        }, 800);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this key?")) {
            setLicenses((prev) => prev.filter(lic => lic.id !== id));
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could use a toast here ideally
    };

    const filteredLicenses = licenses.filter(license =>
        license.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (license.usedBy && license.usedBy.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-8 min-h-[calc(100vh-100px)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white drop-shadow-md">
                        License <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Keys</span>
                    </h1>
                    <p className="text-slate-400 mt-2 font-light tracking-wide">Generate and manage access keys for your applications.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    {/* App Selector */}
                    <div className="relative z-20 group">
                        <select
                            value={selectedAppId}
                            onChange={(e) => setSelectedAppId(e.target.value)}
                            className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 appearance-none min-w-[240px] transition-all hover:bg-white/5 cursor-pointer"
                        >
                            {apps.map(app => (
                                <option key={app.id} value={app.id} className="bg-slate-900 text-white py-2">{app.name}</option>
                            ))}
                            {apps.length === 0 && <option className="bg-slate-900 text-slate-400">No Apps Found</option>}
                        </select>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-violet-400 group-hover:text-violet-300 transition-colors">
                            <Hash className="w-4 h-4" />
                        </div>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs font-bold">▼</div>
                    </div>

                    <PremiumButton onClick={handleGenerate} disabled={isGenerating || !selectedAppId || apps.length === 0}>
                        <Plus className="w-4 h-4 mr-2" />
                        {isGenerating ? "Generating..." : "Generate Key"}
                    </PremiumButton>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedAppId || 'empty'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Filters & Search */}
                    <GlassCard className="flex flex-col sm:flex-row items-center gap-4 p-4 mb-6 sticky top-4 z-10 backdrop-blur-2xl bg-black/40 border-white/10">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-violet-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by key or user..."
                                className="w-full bg-transparent border-none pl-10 text-sm focus:ring-0 placeholder:text-slate-600 text-slate-200"
                            />
                        </div>
                        <div className="h-px w-full sm:h-6 sm:w-px bg-white/10" />
                        <div className="flex items-center gap-4 w-full sm:w-auto text-xs text-slate-500 font-mono">
                            <span>{filteredLicenses.length} Keys Found</span>
                        </div>
                    </GlassCard>

                    {/* Licenses Table */}
                    <GlassCard className="overflow-hidden p-0 border-white/5 bg-black/20">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/5 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Key</th>
                                        <th className="px-6 py-4">Level</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Used By</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-slate-500 animate-pulse">
                                                Loading licenses...
                                            </td>
                                        </tr>
                                    ) : filteredLicenses.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                                        <Key className="w-6 h-6 text-slate-600" />
                                                    </div>
                                                    <p className="text-slate-500">No licenses found.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredLicenses.map((license, idx) => (
                                            <motion.tr
                                                key={license.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="hover:bg-white/[0.02] transition-colors group"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1.5 rounded bg-violet-500/10 text-violet-400">
                                                            <Key className="w-3.5 h-3.5" />
                                                        </div>
                                                        <code className="font-mono text-xs text-slate-300 tracking-wide select-all">{license.key}</code>
                                                        <button
                                                            onClick={() => copyToClipboard(license.key)}
                                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white p-1"
                                                            title="Copy Key"
                                                        >
                                                            <Copy className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 rounded text-xs bg-white/5 text-slate-400 border border-white/5 font-mono">
                                                        Level {license.level}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase border ${license.status === 'banned'
                                                        ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                                        : license.status === 'active'
                                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                                                            : 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                                                        }`}>
                                                        {license.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-400 text-xs font-mono">
                                                    {license.usedBy ? (
                                                        <span className="text-violet-300">{license.usedBy}</span>
                                                    ) : (
                                                        <span className="text-slate-600">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDelete(license.id)}
                                                        className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                                                        title="Delete License"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </GlassCard>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
