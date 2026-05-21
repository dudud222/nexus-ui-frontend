"use client";

import { useState, useEffect } from "react";
import { ThreeDCard } from "@/components/ui/ThreeDCard";
import { GlassCard } from "@/components/ui/GlassCard"; // Keep for modals
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Plus, Server, Trash2, Code, X, Check, AlertCircle, Copy, Terminal, Bell, Zap, Loader2, Search } from "lucide-react";
import { AppData } from "@/components/dashboard/IntegrationModal";
import { IntegrationModal } from "@/components/dashboard/IntegrationModal";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";

// -- Webhook Settings Modal --
const WebhookSettingsModal = ({ isOpen, onClose, app }: { isOpen: boolean; onClose: () => void; app: AppData }) => {
    const [url, setUrl] = useState(app.webhookUrl || "");
    const [isSaving, setIsSaving] = useState(false);
    const [isTesting, setIsTesting] = useState(false);
    const [testResult, setTestResult] = useState<{ success: boolean; msg: string } | null>(null);

    if (!isOpen) return null;

    const handleSave = async () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            onClose();
        }, 600);
    };

    const handleTest = async () => {
        setIsTesting(true);
        setTestResult(null);
        setTimeout(() => {
            setIsTesting(false);
            setTestResult({
                success: true,
                msg: "Test message sent! Check Discord."
            });
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/60 backdrop-blur-md">
            <GlassCard className="w-full max-w-md p-8 border-violet-500/20 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                        <Bell className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Discord Webhook</h2>
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Real-time Notifications</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400 font-bold uppercase tracking-wider ml-1">Webhook URL</label>
                        <Input
                            placeholder="https://discord.com/api/webhooks/..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    {testResult && (
                        <div className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${testResult.success ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            {testResult.success ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            {testResult.msg}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <PremiumButton
                            onClick={handleTest}
                            variant="secondary"
                            className="flex-1 bg-white/5 border-white/10"
                            disabled={!url || isTesting}
                        >
                            {isTesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
                            Test
                        </PremiumButton>
                        <PremiumButton
                            onClick={handleSave}
                            className="flex-1"
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </PremiumButton>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
};

// -- Create App Modal --
const CreateAppModal = ({ isOpen, onClose, onCreate }: { isOpen: boolean; onClose: () => void; onCreate: (name: string, webhook: string) => void }) => {
    const [name, setName] = useState("");
    const [webhook, setWebhook] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <GlassCard className="w-full max-w-md p-6 border-violet-500/20">
                <h2 className="text-xl font-bold mb-4">Create Application</h2>
                <Input
                    placeholder="Application Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4"
                />
                <Input
                    placeholder="Discord Webhook URL (Optional)"
                    value={webhook}
                    onChange={(e) => setWebhook(e.target.value)}
                    className="mb-6"
                />
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">Cancel</button>
                    <PremiumButton onClick={() => { onCreate(name, webhook); setName(""); setWebhook(""); onClose(); }}>Create</PremiumButton>
                </div>
            </GlassCard>
        </div>
    );
};

export default function ApplicationsPage() {
    const [apps, setApps] = useState<AppData[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Modal States
    const [isIntegrationOpen, setIsIntegrationOpen] = useState(false);
    const [isWebhookOpen, setIsWebhookOpen] = useState(false);
    const [selectedApp, setSelectedApp] = useState<AppData | null>(null);

    // Fetch Apps
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setApps([
                { id: "app_1", name: "Nexus Pro", secret: "secret_abcd1234", ownerId: "demo", status: "active", version: "1.0", webhookUrl: "", createdAt: { toMillis: () => Date.now() } },
                { id: "app_2", name: "Alpha Tool", secret: "secret_xyz9876", ownerId: "demo", status: "disabled", version: "2.1", webhookUrl: "https://discord.com/api/webhooks/...", createdAt: { toMillis: () => Date.now() - 86400000 } }
            ]);
            setLoading(false);
        }, 600);
    }, []);

    const handleCreate = async (name: string, webhook: string) => {
        if (!name) return;
        setTimeout(() => {
            const newApp: AppData = {
                id: `app_${Math.random().toString(36).substr(2, 9)}`,
                name,
                webhookUrl: webhook,
                secret: `secret_${Math.random().toString(36).substr(2, 9)}`,
                ownerId: "demo_user",
                status: "active",
                version: "1.0",
                createdAt: { toMillis: () => Date.now() }
            };
            setApps(prev => [newApp, ...prev]);
        }, 500);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this app?")) {
            setApps(prev => prev.filter(a => a.id !== id));
        }
    };

    const openIntegration = (app: AppData) => {
        setSelectedApp(app);
        setIsIntegrationOpen(true);
    };

    const openWebhook = (app: AppData) => {
        setSelectedApp(app);
        setIsWebhookOpen(true);
    };

    const copyToClipboard = (text: string | undefined, label: string) => {
        if (text) {
            navigator.clipboard.writeText(text);
            alert(`${label} copied to clipboard!`);
        }
    };

    const filteredApps = apps.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.id && app.id.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white drop-shadow-md">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Applications</span>
                    </h1>
                    <p className="text-slate-400 mt-2 font-light tracking-wide">Manage and monitor your software services.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search apps..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/5 border border-white/10 text-white text-sm rounded-xl block w-full pl-10 p-2.5 focus:ring-violet-500 focus:border-violet-500 placeholder-slate-500 transition-all hover:bg-white/10 focus:bg-white/10 outline-none ring-1 ring-transparent"
                        />
                    </div>
                    {apps.length > 0 && (
                        <PremiumButton onClick={() => setIsCreateOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Create App
                        </PremiumButton>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApps.map((app, index) => (
                    <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="h-full"
                    >
                        <ThreeDCard className="cursor-pointer group flex flex-col h-full" onClick={() => copyToClipboard(app.id, "App ID")}>
                            {/* Status Badge & Actions Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-colors duration-300 shadow-lg ring-1 ring-white/5">
                                    <Terminal className="w-8 h-8" />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); openWebhook(app); }}
                                        className={`p-2 rounded-lg border transition-all ${app.webhookUrl
                                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            : 'bg-white/5 text-slate-500 border-white/5 hover:text-slate-300'
                                            }`}
                                        title="Discord Webhook Settings"
                                    >
                                        <Bell className="w-4 h-4" />
                                    </button>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center tracking-wide ${app.status === 'active'
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                                        }`}>
                                        {app.status.toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            {/* Title & Info */}
                            <div className="mb-6 space-y-1">
                                <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">{app.name}</h3>
                                <p className="text-xs text-slate-500 font-mono">ID: {app.id}</p>
                            </div>

                            {/* Secrets Grid */}
                            <div className="space-y-3 mb-6 bg-black/40 rounded-xl p-4 border border-white/5 shadow-inner">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-slate-500">
                                        <span>App Secret</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <code className="flex-1 text-[11px] text-slate-300 bg-black/40 px-3 py-2 rounded-lg font-mono truncate border border-white/5 relative overflow-hidden group/code">
                                            <span className="relative z-10 blur-[4px] group-hover/code:blur-none transition-all duration-300">{app.secret}</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-hover/code:animate-shimmer" />
                                        </code>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                copyToClipboard(app.secret, "Secret");
                                            }}
                                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                            title="Copy Secret"
                                        >
                                            <Copy className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Actions Footer */}
                            <div className="mt-auto pt-4 border-t border-white/5 flex gap-3">
                                <PremiumButton
                                    onClick={(e) => { e.stopPropagation(); openIntegration(app); }}
                                    variant="secondary"
                                    className="flex-1 text-xs h-9 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 border-violet-500/20"
                                >
                                    <Code className="w-3.5 h-3.5 mr-2" />
                                    Integration
                                </PremiumButton>
                                <button
                                    onClick={(e) => { e.stopPropagation(); app.id && handleDelete(app.id); }}
                                    className="h-9 w-9 flex items-center justify-center rounded-lg bg-red-500/5 text-red-400 hover:bg-red-500/10 border border-red-500/10 transition-colors"
                                    title="Delete Application"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </ThreeDCard>
                    </motion.div>
                ))
                }

                {
                    loading ? (
                        <div className="col-span-full py-20 flex flex-col items-center gap-4">
                            <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
                            <p className="text-sm text-slate-500 font-medium">Loading applications...</p>
                        </div>
                    ) : apps.length === 0 ? (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center text-center gap-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-violet-500 blur-3xl opacity-20 animate-pulse" />
                                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center relative border border-white/10">
                                    <Server className="w-10 h-10 text-slate-500" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">No Applications Found</h3>
                                <p className="text-slate-400 max-w-sm mx-auto">
                                    Get started by creating your first application to manage users and licenses.
                                </p>
                            </div>
                            <PremiumButton onClick={() => setIsCreateOpen(true)} className="mt-2">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Application
                            </PremiumButton>
                        </div>
                    ) : null
                }
            </div >

            <CreateAppModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onCreate={handleCreate}
            />

            {
                selectedApp && (
                    <IntegrationModal
                        isOpen={isIntegrationOpen}
                        onClose={() => setIsIntegrationOpen(false)}
                        app={selectedApp}
                    />
                )
            }

            {
                selectedApp && (
                    <WebhookSettingsModal
                        isOpen={isWebhookOpen}
                        onClose={() => setIsWebhookOpen(false)}
                        app={selectedApp}
                    />
                )
            }
        </div >
    );
}
