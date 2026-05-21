"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Input } from "@/components/ui/Input";
import { User, Mail, Lock, Bell, Globe, Shield, Camera, ChevronRight, LogOut, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Mock user — replace with real auth in your private fork
const MOCK_USER = {
    displayName: "Demo User",
    email: "demo@nexus.com",
    photoURL: null as string | null,
};

export default function SettingsPage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("profile");

    const handleUpdatePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match" });
            return;
        }
        setLoading(true);
        setMessage({ type: "", text: "" });
        // Mock delay — replace with real password update in your private fork
        await new Promise(r => setTimeout(r, 1000));
        setMessage({ type: "success", text: "Password updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setLoading(false);
    };

    const handleSignOut = () => {
        // Mock sign out — replace with real auth in your private fork
        router.push("/");
    };

    const menuItems = [
        { id: "profile", icon: User, label: "Profile Settings", description: "Manage your personal information" },
        { id: "security", icon: Shield, label: "Security & Privacy", description: "Password and authentication" },
        { id: "notifications", icon: Bell, label: "Notifications", description: "Configure your alerts" },
        { id: "billing", icon: Globe, label: "Language & Region", description: "Localization preferences" },
    ];

    return (
        <div className="space-y-8 min-h-[calc(100vh-100px)]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white drop-shadow-md">
                        Account <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Settings</span>
                    </h1>
                    <p className="text-slate-400 mt-2 font-light tracking-wide">Manage your account preferences and security.</p>
                </div>
                <PremiumButton variant="danger" onClick={handleSignOut} className="w-full md:w-auto">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                </PremiumButton>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="space-y-6 lg:col-span-1">
                    <GlassCard className="text-center p-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent pointer-events-none" />
                        <div className="relative inline-block">
                            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 p-[3px] shadow-[0_0_20px_rgba(139,92,246,0.3)] mx-auto mb-4">
                                <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center overflow-hidden relative group-hover:scale-[0.98] transition-transform duration-500">
                                    {MOCK_USER.photoURL ? (
                                        <img src={MOCK_USER.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-12 h-12 text-white/50" />
                                    )}
                                </div>
                            </div>
                            <button className="absolute bottom-4 right-0 p-2 rounded-full bg-violet-600 text-white hover:bg-violet-500 shadow-lg transition-all hover:scale-110">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <h2 className="text-2xl font-bold text-white truncate px-2 mt-2">{MOCK_USER.displayName}</h2>
                        <p className="text-sm text-slate-400 mb-6 truncate px-2 font-mono">{MOCK_USER.email}</p>
                        <div className="flex justify-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">Active</span>
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">Pro Plan</span>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-2 space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-300 group ${activeTab === item.id
                                    ? "bg-violet-600/10 text-white border border-violet-500/20"
                                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${activeTab === item.id ? "bg-violet-500/20 text-violet-300" : "bg-white/5 text-slate-500 group-hover:text-white"}`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h4 className={`text-sm font-semibold ${activeTab === item.id ? "text-violet-300" : ""}`}>{item.label}</h4>
                                    <p className="text-[10px] text-slate-500 leading-tight">{item.description}</p>
                                </div>
                                {activeTab === item.id && <ChevronRight className="w-4 h-4 text-violet-400 animate-pulse" />}
                            </button>
                        ))}
                    </GlassCard>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === "profile" && (
                                <GlassCard className="space-y-8 p-8">
                                    <div className="border-b border-white/5 pb-6">
                                        <h3 className="text-xl font-bold text-white">Profile Information</h3>
                                        <p className="text-slate-400 text-sm mt-1">Update your account&apos;s public profile and email.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Display Name</label>
                                            <Input icon={<User className="w-4 h-4 text-violet-400" />} value={MOCK_USER.displayName} readOnly className="bg-black/20" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Email Address</label>
                                            <Input icon={<Mail className="w-4 h-4 text-violet-400" />} value={MOCK_USER.email} readOnly type="email" className="bg-black/20" />
                                        </div>
                                    </div>
                                    <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex gap-4 items-start">
                                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 mt-1">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-blue-300">Managed Account</h4>
                                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">Your account details are managed by your identity provider. To change them, contact support or update through your provider.</p>
                                        </div>
                                    </div>
                                </GlassCard>
                            )}

                            {activeTab === "security" && (
                                <GlassCard className="space-y-8 p-8">
                                    <div className="border-b border-white/5 pb-6">
                                        <h3 className="text-xl font-bold text-white">Security Settings</h3>
                                        <p className="text-slate-400 text-sm mt-1">Ensure your account stays safe by updating your password.</p>
                                    </div>
                                    {message.text && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`p-4 rounded-xl text-sm flex items-center gap-3 ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}
                                        >
                                            <Shield className="w-5 h-5" />
                                            {message.text}
                                        </motion.div>
                                    )}
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Current Password</label>
                                            <Input icon={<Lock className="w-4 h-4 text-violet-400" />} type="password" placeholder="Enter current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">New Password</label>
                                                <Input icon={<Lock className="w-4 h-4 text-violet-400" />} type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Confirm Password</label>
                                                <Input icon={<Lock className="w-4 h-4 text-violet-400" />} type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-white/5">
                                        <PremiumButton variant="secondary" onClick={handleUpdatePassword} disabled={loading || !currentPassword || !newPassword} className="min-w-[150px]" glow>
                                            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating...</> : "Update Password"}
                                        </PremiumButton>
                                    </div>
                                </GlassCard>
                            )}

                            {(activeTab === "notifications" || activeTab === "billing") && (
                                <GlassCard className="p-12 text-center text-slate-500 border-dashed border-2 border-white/5">
                                    <div className="w-20 h-20 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-6 animate-pulse">
                                        <Shield className="w-10 h-10 opacity-50" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
                                    <p className="max-w-md mx-auto text-sm leading-relaxed">We are currently working on this feature to bring you the best experience possible. Check back later for updates!</p>
                                </GlassCard>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
