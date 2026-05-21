"use client";

import { useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Copy, Check, ChevronRight, Terminal, Code, Book } from "lucide-react";

const sections = [
    { id: "intro", title: "Introduction" },
    { id: "init", title: "Initialize" },
    { id: "license", title: "License" },
    { id: "login", title: "Login" },
];

const CodeBlock = ({ lang, code }: { lang: string; code: string }) => {
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/10 my-4">
            <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
                <span className="text-xs font-mono text-white/40">{lang}</span>
                <button onClick={onCopy} className="text-white/40 hover:text-white transition-colors">
                    {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-white/80 leading-relaxed">
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default function DocsPage() {
    const [activeSection, setActiveSection] = useState("intro");

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-violet-500/30">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center max-w-7xl mx-auto backdrop-blur-md bg-[#020617]/80">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 relative">
                        <img src="/logo.png" alt="Nexus" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">NEXUS API</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <PremiumButton className="px-5 py-2 text-sm h-9">
                            Back to Home
                        </PremiumButton>
                    </Link>
                </div>
            </nav>

            <div className="pt-24 pb-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Sidebar */}
                <aside className="hidden lg:block lg:col-span-1 sticky top-32 h-[calc(100vh-8rem)]">
                    <div className="space-y-1">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => {
                                    setActiveSection(section.id);
                                    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${activeSection === section.id
                                    ? "bg-violet-600/10 text-violet-300 border border-violet-600/20"
                                    : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                    }`}
                            >
                                {section.title}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Content */}
                <main className="lg:col-span-3 space-y-16">
                    {/* Introduction */}
                    <section id="intro" className="space-y-6 scroll-mt-32">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-violet-600/10 text-violet-400">
                                <Book className="w-5 h-5" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">Introduction</h2>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            Welcome to the Nexus Auth API v1. This API allows you to integrate secure license verification and user authentication directly into your C++, Python, or C# applications.
                        </p>
                        <GlassCard className="border-l-4 border-l-violet-500">
                            <h3 className="text-sm font-bold text-white mb-1">Base URL</h3>
                            <code className="text-violet-300">https://your-domain.com/api/v1</code>
                        </GlassCard>
                    </section>

                    {/* Init */}
                    <section id="init" className="space-y-6 scroll-mt-32">
                        <div className="border-b border-white/5 pb-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-mono">POST</span>
                                /init
                            </h2>
                            <p className="text-slate-400 mt-2">Initialize connection and validate application integrity.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-white">Parameters</h3>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li className="flex gap-2"><code className="text-violet-400">ownerid</code> String (Required)</li>
                                    <li className="flex gap-2"><code className="text-violet-400">name</code> String (Required)</li>
                                    <li className="flex gap-2"><code className="text-violet-400">secret</code> String (Required)</li>
                                    <li className="flex gap-2"><code className="text-violet-400">version</code> String (Optional)</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-semibold text-white">Example Request</h3>
                                <CodeBlock lang="python" code={`import requests

data = {
    "name": "Nexus App",
    "ownerid": "your_owner_id",
    "secret": "app_secret_key",
    "version": "1.0"
}

resp = requests.post("https://api.nexus.com/api/v1/init", json=data)
print(resp.json())`} />
                            </div>
                        </div>
                    </section>

                    {/* License */}
                    <section id="license" className="space-y-6 scroll-mt-32">
                        <div className="border-b border-white/5 pb-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-mono">POST</span>
                                /license
                            </h2>
                            <p className="text-slate-400 mt-2">Redeem or validate a license key. Automatically locks HWID on first use.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-white">Parameters</h3>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li className="flex gap-2"><code className="text-violet-400">key</code> String (Required)</li>
                                    <li className="flex gap-2"><code className="text-violet-400">hwid</code> String (Required)</li>
                                    <li className="flex gap-2"><span className="text-xs opacity-50">+ all init params</span></li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-semibold text-white">Example Request</h3>
                                <CodeBlock lang="python" code={`data = {
    "key": "XXXX-XXXX-XXXX-XXXX",
    "hwid": "user_hwid_string",
    "name": "Nexus App",
    "ownerid": "...",
    "secret": "..."
}

resp = requests.post("https://api.nexus.com/api/v1/license", json=data)

if resp.json()["success"]:
    print("Welcome Back!")
else:
    print("Invalid Key")`} />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
