"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Search, Filter, ShieldOff, RefreshCw, UserPlus, X, Check, ShieldCheck, Calendar, Hash } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { motion, AnimatePresence } from "framer-motion";

export default function UsersPage() {
    const [apps, setApps] = useState<any[]>([]);
    const [selectedAppId, setSelectedAppId] = useState<string>("");
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Create User Modal State
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [newUserUser, setNewUserUser] = useState("");
    const [newUserPass, setNewUserPass] = useState("");
    const [isCreating, setIsCreating] = useState(false);

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

    // Fetch Users for Selected App
    useEffect(() => {
        if (!selectedAppId) return;
        setLoading(true);
        setTimeout(() => {
            setUsers([
                { id: "user_001", appId: selectedAppId, username: "admin_user", hwid: "A1B2-C3D4-E5F6-7890", licenseKey: "MANUAL_ENTRY", level: 1, status: "active", lastLogin: { seconds: Date.now() / 1000 - 86400 } },
                { id: "user_002", appId: selectedAppId, username: "guest_77", hwid: null, licenseKey: "MANUAL_ENTRY", level: 1, status: "banned", lastLogin: null }
            ]);
            setLoading(false);
        }, 500);
    }, [selectedAppId]);

    const handleCreateUser = async () => {
        if (!selectedAppId || !newUserUser || !newUserPass) return;
        setIsCreating(true);
        setTimeout(() => {
            const newUser = {
                id: `user_${Math.random().toString(36).substr(2, 9)}`,
                appId: selectedAppId,
                username: newUserUser,
                password: newUserPass,
                hwid: null,
                licenseKey: "MANUAL_ENTRY",
                level: 1,
                status: "active",
                lastLogin: null,
                createdAt: { toMillis: () => Date.now() }
            };
            setUsers((prev) => [newUser, ...prev]);
            setCreateModalOpen(false);
            setNewUserUser("");
            setNewUserPass("");
            setIsCreating(false);
        }, 800);
    };

    const handleResetHWID = async (id: string) => {
        if (!confirm("Reset HWID for this user?")) return;
        setUsers((prev) => prev.map(u => u.id === id ? { ...u, hwid: null } : u));
    };

    const handleBan = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "banned" ? "active" : "banned";
        if (!confirm(`Are you sure you want to ${newStatus === 'banned' ? 'BAN' : 'UNBAN'} this user?`)) return;
        setUsers((prev) => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.hwid && user.hwid.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-8 relative min-h-[calc(100vh-100px)]">
            {/* Create User Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                    >
                        <GlassCard className="w-full max-w-md p-8 border-violet-500/20 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500" />
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Create User</h2>
                                    <p className="text-slate-400 text-sm">Add a new user manually</p>
                                </div>
                                <button onClick={() => setCreateModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>
                            <div className="space-y-5">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Username</label>
                                    <Input
                                        placeholder="Enter username"
                                        value={newUserUser}
                                        onChange={(e) => setNewUserUser(e.target.value)}
                                        className="bg-black/40 border-white/10 focus:border-violet-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Password</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter password"
                                        value={newUserPass}
                                        onChange={(e) => setNewUserPass(e.target.value)}
                                        className="bg-black/40 border-white/10 focus:border-violet-500"
                                    />
                                </div>
                                <PremiumButton
                                    onClick={handleCreateUser}
                                    disabled={isCreating || !newUserUser || !newUserPass}
                                    className="w-full mt-4"
                                >
                                    {isCreating ? "Creating..." : "Create User"}
                                </PremiumButton>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white drop-shadow-md">
                        User <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Management</span>
                    </h1>
                    <p className="text-slate-400 mt-2 font-light tracking-wide">Monitor and manage access for your application.</p>
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

                    <PremiumButton onClick={() => setCreateModalOpen(true)} disabled={!selectedAppId || apps.length === 0}>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add User
                    </PremiumButton>
                </div>
            </div>

            {/* Main Content Area */}
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
                                placeholder="Search by username or HWID..."
                                className="w-full bg-transparent border-none pl-10 text-sm focus:ring-0 placeholder:text-slate-600 text-slate-200"
                            />
                        </div>
                        <div className="h-px w-full sm:h-6 sm:w-px bg-white/10" />
                        <div className="flex items-center gap-4 w-full sm:w-auto text-xs text-slate-500 font-mono">
                            <span>{filteredUsers.length} Users Found</span>
                        </div>
                    </GlassCard>

                    {/* Users Table */}
                    <GlassCard className="overflow-hidden p-0 border-white/5 bg-black/20">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/5 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">HWID Status</th>
                                        <th className="px-6 py-4">Last Login</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-slate-500 animate-pulse">
                                                Loading user data...
                                            </td>
                                        </tr>
                                    ) : filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                                        <Search className="w-6 h-6 text-slate-600" />
                                                    </div>
                                                    <p className="text-slate-500">No users found matching your criteria.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user, idx) => (
                                            <motion.tr
                                                key={user.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="hover:bg-white/[0.02] transition-colors group"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-lg ${user.status === 'banned' ? 'bg-gradient-to-br from-red-500 to-rose-600' : 'bg-gradient-to-br from-violet-500 to-indigo-600'
                                                            }`}>
                                                            {user.username.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-slate-200">{user.username}</span>
                                                            <span className="text-[10px] text-slate-500 font-mono">ID: {user.id.substring(0, 8)}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.hwid ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                            <span className="font-mono text-xs text-slate-400" title={user.hwid}>
                                                                {user.hwid.substring(0, 16)}...
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                                            <span className="text-xs text-slate-600 italic">Not Bound</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-slate-400 text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-3.5 h-3.5 text-slate-600" />
                                                        {user.lastLogin ? new Date(user.lastLogin.seconds * 1000).toLocaleDateString() : 'Never'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase border ${user.status === 'banned'
                                                        ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
                                                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                                                        }`}>
                                                        {user.status === 'banned' && <ShieldOff className="w-3 h-3 mr-1.5" />}
                                                        {user.status !== 'banned' && <ShieldCheck className="w-3 h-3 mr-1.5" />}
                                                        {user.status || 'Active'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                                        <button
                                                            onClick={() => handleResetHWID(user.id)}
                                                            className="p-2 hover:bg-orange-500/10 rounded-lg text-slate-500 hover:text-orange-400 transition-colors"
                                                            title="Reset HWID"
                                                        >
                                                            <RefreshCw className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleBan(user.id, user.status)}
                                                            className={`p-2 rounded-lg transition-colors ${user.status === 'banned'
                                                                ? 'hover:bg-emerald-500/10 text-emerald-500/50 hover:text-emerald-400'
                                                                : 'hover:bg-red-500/10 text-slate-500 hover:text-red-400'
                                                                }`}
                                                            title={user.status === 'banned' ? 'Unban User' : 'Ban User'}
                                                        >
                                                            {user.status === 'banned' ? <Check className="w-4 h-4" /> : <ShieldOff className="w-4 h-4" />}
                                                        </button>
                                                    </div>
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
